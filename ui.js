module.exports = {
    checkUUID(uuid) {
        if (uuid === "12345678-1234-1234-1234-123456789012") {
            return true;
        } else {
            return false;
        }
    },
    checkAddress(address) {
        // Check If First Char Byte Is Between: (48=>57/65=>90/97=>122)
        if (address.length >= 1 && (/^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})/.test(address) === true)) {
            return true;
        } else {
            return false;
        }
    },
    decrypt(ciphertext, uuid) {
        let plaintext = "";
        var encryptionKey = uuid;
        for (let i = 0; i < ciphertext.length; i++) {
          const charCode = ciphertext.charCodeAt(i);
          const keyCharCode = encryptionKey.charCodeAt(i % encryptionKey.length);
          const decryptedCharCode = charCode ^ keyCharCode;
          plaintext += String.fromCharCode(decryptedCharCode);
        }
        return plaintext;
    }
}
