const dotenv = require('dotenv').config();
const registerCommands = require('./registry/registerCommands');
const registerEvents = require('./registry/registerEvents');
const loadDatabase = require('./database/registry/loadDatabase');
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);
client.commands             = new Map();
client.aliases              = new Map();
client.cooldown             = new Map();
client.prefixes             = new Map();
client.user_Embed_Settings  = new Map();
client.connection_Manager   = new Map();
client.channel_Connected    = new Map();

(async () => {
    await registerCommands(client);
    await registerEvents(client);
    await loadDatabase(client);
})();