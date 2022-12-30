const { EmbedBuilder } = require("discord.js");

module.exports = {
    createNotificationEmbed: (json) => {
        const exDate = new Date(Date.parse(json.exDate));
        const date = getFullDate(exDate);
        const time = getFullTime(exDate);

        return new EmbedBuilder().setColor(0x0099ff).setTitle("새 게시글이 올라왔습니다!")
            .setDescription(`
            
            제목 :  **${json.title}**

            카테고리 :  \`${json.category}\`

            마감일 / 시간 :  \`${date}\` / \`${time}\`

            최대 인원 : \`${json.maxApp}\`

            `);
    },
    createNotifyDMEmbed: (board, isApply) => {
        const exDate = new Date(Date.parse(board.exDate));
        const date = getFullDate(exDate);
        const time = getFullTime(exDate);
        let title;
        if (isApply) title = "누군가가 게시물에 신청했습니다!";
        else title = "누군가가 게시물에 신청을 취소했습니다!";

        return new EmbedBuilder().setColor(0x0099ff).setTitle(title).setDescription(`
            
            제목 :  **${board.title}**

            카테고리 :  \`${board.category}\`

            마감일 / 시간 :  \`${date}\` / \`${time}\`

            인원 : \`${board.applicantCount} / ${board.maxApp}\`

            `);
    },
};

function getFullDate(date) {
    return `${date.getFullYear()}-${makeItStr(date.getMonth() + 1)}-${makeItStr(
        date.getDate()
    )}`;
}

function getFullTime(date) {
    return `${makeItStr(date.getHours())}:${makeItStr(date.getMinutes())}:${makeItStr(
        date.getSeconds()
    )}`;
}

function makeItStr(something) {
    return something.toString().padStart(2, "0");
}
