const webSocket = new WebSocket("ws://192.168.0.22:3000");
var vid = document.getElementById("vid");
var videoID;
clientData = [];

window.onload = function () {
  chatform = document.querySelector("#chatform");

  if (chatform) {
    chatform.addEventListener("submit", (event) => {
      event.preventDefault();
      let message = document.querySelector("#m").value;
      addToChat(message);
      webSocket.send(message + "MSG");
      //   console.log(message);
      document.querySelector("#m").value = "";
    });
  }
};

function addToChat(message) {
  var node = document.createElement("LI");
  node.innerText = clientData[0] + ": " + message;
  document.querySelector("#chatbox").appendChild(node);
}

function initialize() {
  form = document.getElementById("init");
  clientData.push(document.getElementById("user").value);

  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].checked) {
      clientData.push(form.elements[i].value);
    }
  }

  var node = document.createElement("LI");
  node.innerText = clientData[0] + " has joined";
  document.querySelector("#chatbox").appendChild(node);

  webSocket.send(JSON.stringify(clientData));
  form.style.visibility = "hidden";
  document.getElementById("user").style.visibility = "hidden";
  document.getElementById("submit").style.visibility = "hidden";

  if (clientData[1] == "host") {
    document.getElementById("link").style.visibility = "visible";
    document.getElementById("add").style.visibility = "visible";
  }
}

webSocket.addEventListener("open", () => {
  //   socket.send(ans);
});

webSocket.addEventListener("message", (event) => {
  console.log(`Message from server: ${event.data}`);
  if (event.data == "playing" && vid.paused == true) {
    var pausePromise = vid.play();

    if (pausePromise !== undefined) {
      pausePromise
        .then((_) => {
          //   console.log("working");
        })
        .catch((error) => {
          console.log("Could not play!");
        });
    }
  } else if (event.data == "PAUSED" && vid.paused == false) {
    var pausePromise = vid.pause();

    if (pausePromise !== undefined) {
      pausePromise
        .then((_) => {
          //   console.log("working");
        })
        .catch((error) => {
          console.log("Could not pause!");
        });
    }
  } else if (event.data.includes("_ID")) {
    // console.log(`Message from server: ${event.data}`);
    vid = document.getElementById("vid");
    videoID = event.data;
    setTimeout(queue, 3000);
    // setInterval(isPlaying, 100);
  } else if (event.data.includes("MSG")) {
  }
});

function sendURL() {
  var link = document.getElementById("link").value;
  webSocket.send(link);
}

function queue() {
  vid.src = videoID + ".mp4";
  vid.load();
  if (clientData[1] == "guest") {
    vid.controls = false;
  }
  vid.onplay = function () {
    webSocket.send("playing");
  };
  vid.onpause = function () {
    webSocket.send("PAUSED");
  };
  vid.style.visibility = "visible";
}

// class="video-js vjs-big-play-centered"
// data-setup='{"fluid": true}'
