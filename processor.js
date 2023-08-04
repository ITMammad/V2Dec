const ui = require("./ui")

module.exports = (data) => {
    // 0th Byte
    const version = data[0];
    // 1st Byte
    var uuidBytesarray = [];
    for (let i = 1; i < 17; i++) {
        const element = data[i];
        uuidBytesarray.push(Buffer.from([element]).toString("hex"))
    }
    var uuidWithoutDelimiter = uuidBytesarray.join("");
    var uuid1 = uuidWithoutDelimiter.substr(0, 8);
    var uuid2 = uuidWithoutDelimiter.substr(8, 4);
    var uuid3 = uuidWithoutDelimiter.substr(12, 4);
    var uuid4 = uuidWithoutDelimiter.substr(16, 4);
    var uuid6 = uuidWithoutDelimiter.substr(20, 12);
    const uuid = [uuid1, uuid2, uuid3, uuid4, uuid6].join("-");
    // 17th Byte
    var AIPL /* Additional Information ProtoBuf Length */ = data[17];
    var AIP = [];
    for (let i = 17; i <= AIPL; i++) {
        const element = data[i];
        AIP.push(element)
    }
    // (18 + AIPL)th
    var index = 18 + AIPL;
    var instruction = data[index];
    // (19 + AIPL)th
    var index = 19 + AIPL;
    var port = [data[index], data[index + 1]].join("");
    // (21 + AIPL)th
    var index = 21 + AIPL;
    var addressType = data[index];
    // (22 + AIPL)th
    var index = 22 + AIPL;
    var addressLength = data[index];
    // (23 + AIPL)th
    var index = 23 + AIPL;
    var addressBytesArray = [];
    for (let i = index; i < index + addressLength; i++) {
        const element = data[i];
        addressBytesArray.push(element)
    }
    var address = Buffer.from(addressBytesArray).toString("ascii");
    // (24 + AIPL + AddressLength)th
    var index = 24 + AIPL + addressLength;
    var requestDataBytesArray = [];
    for (let i = index; i < data.length; i++) {
        const element = data[i];
        requestDataBytesArray.push(element);
    }

    // Processing Request
    var responseData = "";
    if (ui.checkUUID(uuid) === true && ui.checkAddress(address) === true) {
        responseData = "";
        console.log(`
        1. Protocol Version: ${version}
        2. UUID: ${uuid}
        3. Address: ${address}
        4. Data: ${Buffer.from(requestDataBytesArray).toString("ascii")}`);
    } else {
        responseData = requestDataBytesArray;
    }

    // Prepairing Response
    var response = [Buffer.from([version]), Buffer.from([AIPL])];

    if (AIPL !== 0) {
        response.push(Buffer.from([AIP]))
    }

    response.push(Buffer.from(responseData));

    return Buffer.concat(response);
}
