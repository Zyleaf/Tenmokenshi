const BaseCommand = require('../../helpers/BaseCommand');

class Ping extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql } = this;
        message.channel.send('Pong!');
    }
}

module.exports = {
    name: 'Ping',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Sends back Pong!',
    cooldown: 5000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Ping(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};