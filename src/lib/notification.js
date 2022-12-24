const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    ComponentType,
} = require("discord.js");

const NotifyOption = {
    Allow: "allow",
    Deny: "deny",
};

const message = {
    embeds: [
        new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle("내 게시글에 대한 알림을 받아보세요!")
            .setDescription("아래 버튼을 눌러 알림 설정을 할 수 있습니다."),
    ],
    components: [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(NotifyOption.Allow)
                .setLabel("알림 받기")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(NotifyOption.Deny)
                .setLabel("알림 받지 않기")
                .setStyle(ButtonStyle.Secondary)
        ),
    ],
};

function createCollector(channel) {
    const collector = channel.createMessageComponentCollector({
        componentType: ComponentType.Button,
    });

    collector.on("collect", (collected) => {
        const user = collected.user;
        const option = collected.customId;

        if (option === NotifyOption.Allow) {
            user.send("you allowed");
        } 
        else if (option === NotifyOption.Deny) {
            user.send("you denied");
        }

        collected.deferUpdate();
    });
}

module.exports = {
    message,
    createCollector,
};
