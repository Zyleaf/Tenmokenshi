const BaseCommand = require('../../helpers/BaseCommand');

class Prefix extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, cooldown, usage, name) {
        super(client, message, permissions, args, parsedArgs, cooldown, usage, name);
    }

    run = async () => {
        const { message, client, permissions, args, parsedArgs, embedBuilder } = this;
        message.channel.send(this.args);
    }
}

module.exports = {
    name: 'Prefix',
    usage: ['prefix'],
    aliases: [],
    permissions: ['MANAGE_GUILD'],
    description: 'Set a custom prefix!',
    cooldown: 5000,
    execute: (client, message, permissions, args, parsedArgs, cooldown, usage, name) => {
        let command = new Prefix(client, message, permissions, args, parsedArgs, cooldown, usage, name);
        command.checkPerms();
    }
};