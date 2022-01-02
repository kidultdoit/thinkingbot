// const { CommandInteraction, MessageEmbed } = require('discord.js')

// module.exports = {
//     name: "clear",
//     description: "채널이나 특정 사용자의 메시지를 삭제해요",
//     permission: "MANAGE_MESSAGES",
//     options: [
//         {
//             name: "amount",
//             description: "삭제할 메시지 개수를 입력하세요",
//             type: "NUMBER",
//             required: true
//         },
//         {
//             name: "target",
//             description: "누구의 메시지를 삭제할까요?",
//             type: "USER",
//             required: false
//         }
//     ],
//     /**
//      * 
//      * @param {CommandInteraction} interaction 
//      */
//     async execute(interaction) {
//         const { channel, options } = interaction;
        
//         const Amount = options.getNumber("amount");
//         const Target = options.getMember("target");

//         const Messages = await channel.messages.fetch();

//         const Response = new MessageEmbed()
//             .setColor("LUMINOUS_VIVID_PINK");
        
//         if (Amount > 100 || Amount <= 0) {
//             Response.setDescription(`메시지 개수는 100을 넘거나 1보다 작을 수 없어요`)
//             return interaction.reply({ embeds: [Response] })
//         }
        
        
//         if (Target) {
//             let i = 0;
//             const filtered = [];
//             (await Messages).filter((m) => {
//                 if (m.author.id === Target.id && Amount > i) {
//                     filtered.push(m);
//                     i++;
//                 }
//             })

//             await channel.bulkDelete(filtered, true).then(messages => {
//                 Response.setDescription(`🧹 ${Target}의 메시지 ${messages.size}개를 삭제했어요 `);
//                 interaction.reply({ embeds: [Response] });

//             })
//         } else {
//             await channel.bulkDelete(Amount, true).then(messages => {
//                 Response.setDescription(`🧹 현재 채널의 메시지 ${messages.size}개를 삭제했어요 `);
//                 interaction.reply({ embeds: [Response] });
//             })
//         }
//     }

// }