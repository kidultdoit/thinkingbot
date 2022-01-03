const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: "music",
    description: "Complete music system",
    permision: "ADMINISTRATOR",
    options: [
        {
            name: "play",
            description: "노래를 재생해요",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "제목이나 URL을 입력해서 노래 틀 수 있어요", type: "STRING", required: true }]
        },
        {
            name: "volume",
            description: "📶 볼륨을 조절해요",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "1 ~ 100의 숫자로 볼륨을 조절해요", type: "NUMBER", required: true }]
        },
        // n번째 노래로 이동. n-1번째 노래는 스킵
        // {
        //     name: "jump",
        //     description: "원하는 곡 스킵하기",
        //     type: "SUB_COMMAND",
        //     options: [{ name: "jump", description: "원하는 곡을 스킵해요", type: "NUMBER", required: true }]
        // },
        {
            name: "settings",
            description: "다양한 옵션이 있어요",
            type: "SUB_COMMAND",
            options: [{
                name: "options", description: "원하는 옵션을 골라요", type: "STRING", required: true,
                choices: [
                    { name: "🔢 대기열을 보고싶어요", value: "queue" },
                    { name: "⏭ 건너뛰고 싶어요", value: "skip" },
                    { name: "⏸ 일시정지 하고 싶어요", value: "pause" },
                    { name: "⏯ 다시 들을래요", value: "resume" },
                    { name: "⏹ 그만 들을래요", value: "stop" },
                    { name: "🔀 순서를 섞고싶어요", value: "shuffle" },
                    { name: "🈁 연관 노래를 추가하고 싶어요", value: "RelatedSong" },
                    { name: "🔄 자동 재생 모드를 바꾸고 싶어요(자동 재생 ON/OFF)", value: "AutoPlay" },
                    { name: "🔁 반복 모드를 바꾸고 싶어요(플레이리스트 or 노래 반복)", value: "RepeatMode" },
                ]
            }]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel)
            return interaction.reply({ content: "음성 채널에 먼저 접속해야해요", ephemeral: true });
        
        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
            return interaction.reply({ content: `이미 음성 채널에 접속해있어요 <#${guild.me.voice.channelId}>`, ephemeral: true });
        
        try {
            switch (options.getSubcommand()) {
                // case "jump": {
                //     const jump = options.getNumber("jump");
                //     client.distube.jump(VoiceChannel, jump);
                //     return interaction.reply({ content: `${jump}번째 노래를 삭제했어요` });
                // }
                case "play": {
                    client.distube.playVoiceChannel(VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                    // return interaction.reply({ content: "" }); 
                    return interaction.reply({ content: "성공적으로 입력했어요" });
                }
                case "volume": {
                    const Volume = options.getNumber("percent");
                    if (Volume > 100 || Volume < 1)
                        return interaction.reply({ content: "볼륨 조절 값은 1 ~ 100 사이여야 해요" })
                    
                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({content: `🔊 볼륨 \`${Volume}%\`로 바꿨어요`})
                }
                case "settings": {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if (!queue)
                        return interaction.reply({ content: "⛔ 노래가 텅텅 비었어요" });
                    
                    switch (options.getString("options")) {
                        case "skip": {
                            await queue.skip(VoiceChannel);
                            return interaction.reply({ content: "⏩ 노래를 건너뛰었어요" })
                        };
                        case "stop": {
                            await queue.stop(VoiceChannel);
                            return interaction.reply({ content: "⏹ 음악 재생을 멈췄어요" })
                        };
                        case "pause": {
                            await queue.pause(VoiceChannel);
                            return interaction.reply({ content: "⏸ 노래를 일시정지했어요" })
                        };
                        case "resume": {
                            await queue.resume(VoiceChannel);
                            return interaction.reply({ content: "⏯ 노래를 다시 시작 했어요" })
                        };
                        case "shuffle": {
                            await queue.shuffle(VoiceChannel);
                            return interaction.reply({ content: "🔀 노래 순서를 섞었어요" })
                        };
                        case "AutoPlay": {
                            let Mode = await queue.toggleAutoplay(VoiceChannel);
                            return interaction.reply({ content: `🔄 자동 재생 모드가 ${Mode ? "켜졌어요" : "꺼졌어요"}` })
                        };
                        case "RelatedSong": {
                            await queue.addRelatedSong(VoiceChannel);
                            return interaction.reply({ content: "🈁 연관된 노래를 추가했어요" })
                        };
                        case "RepeatMode": {
                            let Mode2 = await client.distube.setRepeatMode(queue);
                            return interaction.reply({ content: `🔁 ${Mode2 = Mode2 ? Mode2 == 2 ? "현재 플레이 리스트를 반복해요" : "현재 노래를 반복해요" : "반복 모드가 꺼졌어요"}` })
                        };    
                        case "queue": {
                            return interaction.reply({
                                embeds: [new MessageEmbed()
                                    .setColor("PURPLE")
                                    // .setDescription(`${queue.songs.map(
                                    //     (song, id) => `\n**${id + 1}**) ${song.name} - \`${song.formattedDuration}\``)}`
                                    // )]

                                    // 길이 4096 오류 방지
                                    .setDescription(`${queue.songs.slice(0, 10).map(
                                        (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)]
                            });
                        }
                    }
                    return;
                }
            }
        } catch (e) {
            const errorEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`⛔ 경고: ${e}`)
            return interaction.reply({ embeds: [errorEmbed] });

        }
    }
}