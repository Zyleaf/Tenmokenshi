const dotenv = require('dotenv').config();
const commandChecker = require('../../snippets/messageEvent/commandChecker');
const globalChat = require('../../snippets/messageEvent/globalChat');
let PREFIX;

module.exports = async (client, message) => {
    if (message.author.bot) return;
    
    PREFIX = client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id) : '-';
    commandChecker(client, message, PREFIX);
    globalChat(client, message);
};