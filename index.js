const { Client, Collection, Intents } = require("discord.js");
const client = new Client({ intents: 32767 });

client.commands = new Collection()

const { Distube, default: DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});
module.exports = client;

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

client.login("OTI2MjI3NTE1MjEzNzQyMTUy.Yc4mmA.UkTGtvjQ_A5NwxewDSCVypNyKN0");