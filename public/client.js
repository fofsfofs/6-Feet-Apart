const webSocket = new WebSocket("ws://192.168.0.22:3000");
var vid = document.getElementById("vid");
var videoID;
clientData = [];

window.onload = function () {
  chatform = document.querySelector("#chatform");

  if (chatform) {
    chatform.addEventListener("submit", (event) => {
      event.preventDefault();
      let message = ["from", "content"];
      message[0] = clientData[0];
      message[1] = document.querySelector("#m").value;
      addToChat(message[1], clientData[0]);
      message[1] = document.querySelector("#m").value + "MSG";
      webSocket.send(this.JSON.stringify(message));
      //   console.log(message);
      document.querySelector("#m").value = "";
    });
  }
};

function addToChat(message, from) {
  var node = document.createElement("LI");
  node.style.borderBottom = "solid 1px";
  node.innerText = from + ": " + message;
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

  let message = ["from", "content"];
  message[0] = "Chat";
  message[1] = clientData[0] + " has joinedMSG";
  webSocket.send(this.JSON.stringify(message));

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
  } else if (
    JSON.parse(event.data)[1].includes("MSG") &&
    JSON.parse(event.data)[0] != clientData[0]
  ) {
    let message = JSON.parse(event.data)[1].substring(
      0,
      JSON.parse(event.data)[1].lastIndexOf("MSG")
    );
    let from = JSON.parse(event.data)[0];
    addToChat(message, from);
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
