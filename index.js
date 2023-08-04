const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server;
const ws = new WebSocketServer({
    port: 4900
});
const processor = require("./processor");

ws.on("connection", (socket) => {
    socket.on("message", (message) => {
        socket.send(processor(message.toJSON().data));
    });
});
