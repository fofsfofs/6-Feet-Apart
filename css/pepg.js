const socket = new WebSocket("ws://192.168.0.22:3000");
var vid = document.getElementById("vid");
var videoID;
clientData = [];

function initialize() {
  form = document.getElementById("init");
  clientData.push(document.getElementById("user").value);

  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].checked) {
      clientData.push(form.elements[i].value);
    }
  }

  socket.send(JSON.stringify(clientData));
  form.style.visibility = "hidden";
  document.getElementById("user").style.visibility = "hidden";
  document.getElementById("submit").style.visibility = "hidden";

  if (clientData[1] == "host") {
    document.getElementById("link").style.visibility = "visible";
    document.getElementById("add").style.visibility = "visible";
  }
}

socket.addEventListener("open", () => {
  //   socket.send(ans);
});

socket.addEventListener("message", (event) => {
  console.log(`Message from server: ${event.data}`);
  if (event.data == "playing" && vid.paused == true) {
    var playPromise = vid.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          console.log("working");
        })
        .catch((error) => {
          console.log(playPromise);
        });
    }
  } else if (event.data == "PAUSED" && vid.paused == false) {
    var playPromise = vid.pause();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          console.log("working");
        })
        .catch((error) => {
          console.log(playPromise);
        });
    }
  } else if (event.data.includes("_ID")) {
    // console.log(`Message from server: ${event.data}`);
    vid = document.getElementById("vid");
    videoID = event.data;
    setTimeout(queue, 3000);
    // setInterval(isPlaying, 100);
  }
});

function sendURL() {
  var link = document.getElementById("link").value;
  socket.send(link);
}

function queue() {
  vid.src = videoID + ".mp4";
  vid.load();
  if (clientData[1] == "guest") {
    vid.controls = false;
  }
  vid.onplay = function () {
    socket.send("playing");
  };
  vid.onpause = function () {
    socket.send("PAUSED");
  };
  vid.style.visibility = "visible";
}