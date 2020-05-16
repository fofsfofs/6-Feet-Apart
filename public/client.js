const socket = new WebSocket("ws://192.168.0.22:3000");

socket.addEventListener("open", () => {
  console.log("CONNECTED!");
});

// socket.addEventListener("message", (event) => {
//   console.log(`Message from server: ${event.data}`);
// });

// socket.on("open", function open() {
//   console.log("Connected!");
// });

// console.log(socket.re);
