const dotenv = require('dotenv').config();
const mysql = require('mysql');
const sql = mysql.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE });

module.exports = commandChecker = async (client, message, PREFIX) => {    
    if (message.content.startsWith(PREFIX)) {
        const commandName = message.content.substring(message.content.indexOf(PREFIX) + 1).split(new RegExp(/\s+/)).shift().toUpperCase();
        const args = message.content.substring(message.content.indexOf(' ') + 1).split(' ');
        const parsedArgs = message.content.substring(message.content.indexOf(' ') + 1);

        if (client.commands.get(commandName)) {
            let commandToExecute = client.commands.get(commandName);
            commandToExecute.execute(client, message, commandToExecute.permissions, args, parsedArgs, commandToExecute.requiredArgs, commandToExecute.cooldown, commandToExecute.usage, commandToExecute.name, sql);
        } else if (client.aliases.get(commandName)) {
            let commandToExecute = client.aliases.get(commandName);
            commandToExecute.execute(client, message, commandToExecute.permissions, args, parsedArgs, commandToExecute.requiredArgs, commandToExecute.cooldown, commandToExecute.usage, commandToExecute.name, sql);
        }
    }
};