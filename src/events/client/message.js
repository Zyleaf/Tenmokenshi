const dotenv = require('dotenv').config();
const commandChecker = require('../../snippets/messageEvent/commandChecker');
const PREFIX = '-';

module.exports = async (client, message) => {
    commandChecker(client, message, PREFIX);
};