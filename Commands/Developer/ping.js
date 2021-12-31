const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Ping",
    Permission: "ADMINISTRATOR",
    /**
     * @param {CommandInteraction} interaction
     */
    execute(interatcion) {
        interatcion.reply({content:"POING"})
    }
}