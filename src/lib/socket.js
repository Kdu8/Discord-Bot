const SockJs = require('sockjs-client');
const Stomp = require('stompjs');

const socket = new SockJs("localhost:8080/stomp");
const stompClient = Stomp.over(socket);

stompClient.connect({}, (frame) => {
    console.log(frame);
    console.log("connected!");

    stompClient.subscribe("/discord", (message) => {
        console.log(message);
    });

});

