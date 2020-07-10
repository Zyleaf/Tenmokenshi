const BaseCommand = require('../../helpers/BaseCommand');

class Invite extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        message.channel.send(embedBuilder(true, false, false, false, false, `**[Invite Tenmokenshi!](https://discord.com/oauth2/authorize?client_id=704858947701571666&scope=bot&permissions=8)**`, false, false, false, false));
    }
}

module.exports = {
    name: 'Invite',
    usage: [],
    aliases: ['inv', 'i'],
    requiredArgs: false,
    permissions: [],
    description: 'Invite link for the bot!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Invite(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};