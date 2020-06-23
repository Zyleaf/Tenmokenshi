const BaseCommand = require('../../helpers/BaseCommand');

class Info extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, cooldown, usage) {
        super(client, message, permissions, args, parsedArgs, cooldown, usage);
    }

    run = async () => {
        const { message, client, permissions, args, parsedArgs, embedBuilder } = this;

        message.channel.send(`The info command!`);
    }
}

module.exports = {
    name: 'Info',
    usage: [],
    args: false,
    aliases: ['One'],
    permissions: [],
    description: 'Sends back info!',
    cooldown: 3000,
    execute: (client, message, permissions, args, parsedArgs, cooldown, usage) => {
        let command = new Info(client, message, permissions, args, parsedArgs, cooldown, usage);
        command.checkPerms();
    }
};