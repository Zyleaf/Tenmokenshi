const dotenv = require('dotenv').config();
const commandChecker = require('../../snippets/messageEvent/commandChecker');
let PREFIX;

module.exports = async (client, message) => {
    PREFIX = client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id) : '-';
    commandChecker(client, message, PREFIX);
};