var express = require("express");
var ws = require("ws");
var app = express();
const fs = require("fs");
const ytdl = require("ytdl-core");
const server = new ws.Server({ server: app.listen(8000) });

app.use(express.static("public"));

let queue = [];

server.on("connection", function connection(ws, req) {
  ws.on("message", function incoming(data) {
    if (data.includes("youtube")) {
      if (queue.length > 0) {
        fs.unlinkSync("./public/" + queue[queue.length - 1] + ".mp4");
      }

      videoID = data.substring(data.indexOf("=") + 1, data.length) + "_ID";
      queue.push(videoID);
      server.clients.forEach((client) => {
        client.send(videoID);
      });
      ytdl(data, { quality: "highest" }).pipe(
        fs.createWriteStream("./public/" + queue[queue.length - 1] + ".mp4")
      );
    } else if (data.includes("playing") || data.includes("PAUSED")) {
      server.clients.forEach((client) => {
        client.send(data);
      });
    } else if (JSON.parse(data)[1].includes("MSG")) {
      server.clients.forEach((client) => {
        client.send(data);
      });
    } else {
      console.log(
        JSON.parse(data)[0] + " has connected as " + JSON.parse(data)[1]
      );
    }
  });
  //   console.log(req.ip);
});
