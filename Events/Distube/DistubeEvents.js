const client = require("../../index");
const { MessageEmbed } = require("discord.js");

const status = queue => `볼륨 크기: \`${queue.volume}%\` | 반복 모드 : \`${queue.repeatMode ? (queue.repeatMode === 2 ? "플레이 리스트" : "현재 곡") : "Off"
    }\` | 자동 재생: \`${queue.autoplay ? "켜짐" : "꺼짐"}\``
    
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({
        embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription(
                `🎶 재생 중 🎶\n\n\`${song.name}\` - \`${song.formattedDuration}\`\n\n신청자 : ${song.user}\n${status(queue)}`)]
    }))

    .on("addSong", (queue, song) =>
        queue.textChannel.send({
            embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`🎶 곡 등록 🎶\n\n \`${song.name}\` - \`${song.formattedDuration}\`\n\n신청자 : ${song.user}`
                )]
        })
    )
    .on("addList", (queue, playlist) =>
        queue.textChannel.send({
            embeds: [new MessageEmbed()
                .setColor("BLUE")
                .setDescription(
                    `🎶 플레이 리스트 등록 🎶\n\n \`${playlist.name}\`\n 노래 개수 : (${playlist.songs.length}\n\n신청자 : ${song.user}`)]
        })
)
    
    .on("error", (channel, e) => {
        channel.send({
            embeds: [new MessageEmbed()
                .setColor("RED")
                .setDescription(`⛔ | 에러 : ${e}`)]
        })
    })
    .on("empty", queue => queue.textChannel.send({
        embeds: [new MessageEmbed()
            .setColor("RED")
            .setDescription("음성 채널에 아무도 없어서 나갈래요..")]
    }))
    .on("searchNoResult", (message, query) => message.channel.send({
        embeds: [new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ | 검색 결과가 없어요`)]
    }))
    .on("searchNoResult", message => message.channel.send({
        embeds: [new MessageEmbed()
            .setColor("RED")
            .setDescription(`⛔ | 검색 결과가 없어요`)]
    }))
    .on("finish", queue => queue.textChannel.send({
        embeds: [new MessageEmbed()
            .setColor("RED")
            .setDescription("노래 재생이 모두 끝났어요. 음성채널을 나갈게요.")]
    }))