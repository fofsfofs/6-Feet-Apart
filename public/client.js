const socket = new WebSocket("ws://192.168.0.22:3000");

let ans = prompt("What is your name?");
var videoID;

socket.addEventListener("open", () => {
  socket.send(ans);
});

socket.addEventListener("message", (event) => {
  console.log(`Message from server: ${event.data}`);
  videoID = event.data;
  setTimeout(test, 3000);
});

function play() {
  var link = document.getElementById("link").value;
  socket.send(link);
  setTimeout(test, 3000);
}

function test() {
  document.getElementById("vid").src = videoID + ".mp4";
  document.getElementById("vid").load();
  document.getElementById("vid").style.visibility = "visible";
}
