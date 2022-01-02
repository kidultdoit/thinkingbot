const { Client } = require("discord.js");

/**
 * @param {Client} client
 */
module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client
     */
    execute(client) {
        console.log("thinkingBot is now ready!");
        client.user.setActivity("음악 봇", {type:"PLAYING"})
    }
}