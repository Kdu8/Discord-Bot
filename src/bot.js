const { Client, Events, GatewayIntentBits } = require("discord.js");
const Notification = require("./lib/notification");
const { token } = require("../config.json");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages],
});

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

    const guild = client.guilds.cache.get("1056072258449326151");
    const channel = guild.channels.cache.get("1056072258998775851");
    Notification.createCollector(channel);

    channel.send(Notification.message);
});
// Log in to Discord with your client's token
client.login(token);
