const BaseCommand = require('../../helpers/BaseCommand');

class Utility extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        message.channel.send(embedBuilder(true, true, `List of general commands!`, false, false, false, [
            
        ], false, true, true));
    }
}

module.exports = {
    name: 'Utility',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'List of all the utility commands!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Utility(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};