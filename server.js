var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var users = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  socket.on('join', name => {
    users[socket.id] = name;
    io.emit("update", name + " has joined the server.")
    io.emit("update-people", users);
  });
  

  socket.on('chat message', (msg) => {
    io.emit('chat message', users[socket.id] + ': ' + msg);
  });

});

http.listen(3000, () => {
  console.log('listening on *:3000');
});