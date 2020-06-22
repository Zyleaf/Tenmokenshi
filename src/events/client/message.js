const dotenv = require('dotenv').config();

module.exports = async (client, message) => {
    const commandName = message.content.substring(message.content.indexOf(process.env.DEFAULT_PREFIX) + 1).split(new RegExp(/\s+/)).shift().toUpperCase();
    const args = message.content.substring(message.content.indexOf(' ') + 1).split(' ');
    const parsedArgs = message.content.substring(message.content.indexOf(' ') + 1);
    console.log(commandName);
    if (client.commands.get(commandName)) { 
        let commandToExecute = client.commands.get(commandName);
        commandToExecute.execute(client, message, commandToExecute.permissions, args, parsedArgs);
        
    } else if (client.aliases.get(commandName)) {
        let commandToExecute = client.aliases.get(commandName);
        commandToExecute.execute(client, message, commandToExecute.permissions, args, parsedArgs);
    }
};