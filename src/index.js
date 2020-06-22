const dotenv = require('dotenv').config();
const registerCommands = require('./registry/registerCommands');
const registerEvents = require('./registry/registerEvents');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);
client.commands = new Map();
client.aliases = new Map();

(async () => {
    await registerCommands(client);
    await registerEvents(client);
})();