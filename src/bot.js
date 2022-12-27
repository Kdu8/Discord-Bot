const { Client, Events, GatewayIntentBits } = require("discord.js");
const Notification = require("./lib/allow-notify");
const db = require("./lib/db");
NotificationQueue = [];
DMQueue = [];
const socketClient = require("./lib/socket");
const { token, server_id, channel_id } = require("../config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
    ],
});

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

    const guild = client.guilds.cache.get(server_id);
    const channel = guild.channels.cache.get(channel_id);

    Notification.createCollector(channel);
    channel.send(Notification.message);

    setInterval(() => {
        NotificationQueue.forEach((embed) => {
            channel.send({ embeds: [embed] });
            NotificationQueue.shift();
        });
        DMQueue.forEach((data) => {
            db.getUserIdByName(data.discord, (userResult) => {
                if (userResult !== undefined) {
                    const userId = userResult.user_id;
                    db.getAllowNotifyByUserId(userId, (notifyResult) => {
                        if (notifyResult !== undefined && notifyResult.accept_notify) {
                            const user = guild.members.cache.get(userId);
                            user.send({ embeds: [data.embed] });
                        }
                    });
                }
            });
            DMQueue.shift();
        });
    }, 100);
});

client.on(Events.GuildMemberAdd, async (member) => {
    db.insertUser(member.user.id, member.user.tag);
});

client.on(Events.GuildMemberRemove, async (member) => {
    db.deleteUser(member.user.id);
});

client.login(token);
