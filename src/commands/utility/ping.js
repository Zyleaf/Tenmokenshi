const BaseCommand = require('../../helpers/BaseCommand');

class Ping extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, cooldown, usage) {
        super(client, message, permissions, args, parsedArgs, cooldown, usage);
    }

    run = async () => {
        const { message, client, permissions, args, parsedArgs, embedBuilder } = this;

        message.channel.send(embedBuilder(false, true, "Hello World!", false, false, "Test test!", 
        [
            { name: "Test", value: "123", inline: true },
            { name: "Test", value: "123", inline: true },
        ], false, true, true));
    }
}

module.exports = {
    name: 'Ping',
    usage: ['name', 'date'],
    args: false,
    aliases: ['Hmm'],
    permissions: ['MANAGE_CHANNELS', 'ADMINISTRATOR'],
    description: 'Sends back pong!',
    cooldown: 5000,
    execute: (client, message, permissions, args, parsedArgs, cooldown, usage) => {
        let command = new Ping(client, message, permissions, args, parsedArgs, cooldown, usage);
        command.checkPerms();
    }
};