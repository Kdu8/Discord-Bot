const {
    Client,
    Events,
    GatewayIntentBits,
    GatewayDispatchEvents,
} = require("discord.js");
const Notification = require("./lib/notification");
const db = require("./lib/db");
const { token } = require("../config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayDispatchEvents.GuildMemberAdd,
        GatewayDispatchEvents.GuildMemberRemove
    ],
});

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);

    const guild = client.guilds.cache.get("1056072258449326151");
    const channel = guild.channels.cache.get("1056072258998775851");
    Notification.createCollector(channel);

    channel.send(Notification.message);
});

client.on("guildMemberAdd", (member) => {
    console.log(member);
    console.log(member.nickname);
    console.log(member.displayName);
    // db.insertUser(member.id, member.nickname);
});

client.on("guildMemberRemove", (member) => {
    console.log(member);
    console.log(member.nickname);
    console.log(member.displayName);
});

client.login(token);
