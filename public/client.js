const socket = new WebSocket("ws://192.168.0.22:3000");

let ans = prompt("What is your name?");
var vid = document.getElementById("vid");
var videoID;

socket.addEventListener("open", () => {
  socket.send(ans);
});

socket.addEventListener("message", (event) => {
  console.log(`Message from server: ${event.data}`);
  if (event.data == "playing" && vid.paused == true) {
    console.log("hi");
    var playPromise = vid.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Automatic playback started!
          // Show playing UI.
        })
        .catch((error) => {
          // Auto-play was prevented
          // Show paused UI.
        });
    }
  } else {
    vid = document.getElementById("vid");
    videoID = event.data;
    setTimeout(queue, 3000);
  }
});

function sendURL() {
  var link = document.getElementById("link").value;
  socket.send(link);
}

function queue() {
  vid.src = videoID + ".mp4";
  vid.load();
  vid.style.visibility = "visible";
}

function play() {
  //   console.log("pressed");
  socket.send("playing");
  setInterval(isPlaying, 100);
}

function isPlaying() {
  var vid = document.getElementById("vid");
  if (vid.paused) {
    socket.send("PAUSED");
  }
}
