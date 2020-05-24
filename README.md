# RUHacks2020

6 Feet Apart allows for users to watch YouTube videos together with ease. It allows for the ability to pause/play the video on the host and all its clients while being in sync.

This project was built by [Farhan](https://github.com/fofsfofs), [Sanjeev](https://github.com/sanjeev2001), [Wayne](https://github.com/wayne-sie), and [Ashanth](https://github.com/ashxnth) for RUHacks 2020

## How it works 

To build this project we used HTML, CSS, Javascript, Node.js as well as a number of technologies such as Express, Websocket, and ytdl-core. Node.js was used to run a localhost server and allowed us to install a variety of node modules. Express was used to make managing node modules easier. Websockets allow for a bi-directional interactive communication session between a server and multiple clients. ytdl-core was used to transfer video data from our server to our clients. Bootstrap was used for the front-end design.

## Demonstration

In this demo you can see 2 users entering a session where one user is a host and the other is a guest. The host has access to a field where they can enter a link to a video that will be used for the session. The guest does not have access to play/pause features unless both users act as a host. There is also a functioning chat box that will send and recieve messages in real time.

<p align="center">
  <img src="/demo.gif">
</p>
