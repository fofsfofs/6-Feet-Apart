const express = require('express');
const ws = require('ws');
const http = require('http');

var app = express();

app.use(express.static('public'));
console.log("Server is running");
const wss = new ws.Server({
  server: app.listen(3000)
})

wss.on('connection', socket => {
  socket.on('message', message => {
    wss.clients.forEach(client => {
      if (client !== socket && client.readyState === ws.OPEN) {

        client.send(message);
      }
    })
  });
});