const SockJs = require("sockjs-client");
const Stomp = require("stompjs");
const { createNotifyDMEmbed, createNotificationEmbed } = require("./board-notification");

const socket = new SockJs("http://localhost:8080/stomp");
const stompClient = Stomp.over(socket);

stompClient.connect({}, () => {
    stompClient.subscribe("/queue/applicant", (message) => {
        const json = JSON.parse(message.body);
        const embed = createNotifyDMEmbed(json.Board, json.isApply);
        DMQueue.push({
            embed: embed,
            discord: json.discord,
        });
    });

    stompClient.subscribe("/queue/board", (message) => {
        const json = JSON.parse(message.body);
        const embed = createNotificationEmbed(json);
        NotificationQueue.push(embed);
    });
});

module.exports = stompClient;
