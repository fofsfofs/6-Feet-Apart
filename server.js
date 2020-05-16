var express = require("express");
var ws = require("ws");
var app = express();
const server = new ws.Server({ server: app.listen(3000) });

app.use(express.static("public"));

server.on("connection", function connection(ws, req) {
  console.log(req.socket.remoteAddress);
});
