module.exports = commandChecker = async (client, message, PREFIX) => {
    if (message.author.bot) return;
    
    if (message.content.startsWith(PREFIX)) {
        const commandName = message.content.substring(message.content.indexOf(PREFIX) + 1).split(new RegExp(/\s+/)).shift().toUpperCase();
        const args = message.content.substring(message.content.indexOf(' ') + 1).split(' ');
        const parsedArgs = message.content.substring(message.content.indexOf(' ') + 1);

        if (client.commands.get(commandName)) {
            let commandToExecute = client.commands.get(commandName);
            const { permissions, cooldown, usage, name } = commandToExecute;
            commandToExecute.execute(client, message, permissions, args, parsedArgs, cooldown, usage, name);
        } else if (client.aliases.get(commandName)) {
            let commandToExecute = client.aliases.get(commandName);
            const { permissions, cooldown, usage, name } = commandToExecute;
            commandToExecute.execute(client, message, permissions, args, parsedArgs, cooldown, usage, name);
        }
    }
};