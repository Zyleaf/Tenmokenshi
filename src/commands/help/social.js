const BaseCommand = require('../../helpers/BaseCommand');

class Social extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        message.channel.send(embedBuilder(true, true, `List of social commands!`, false, false, false, [
            {name: '`Userphone`', value: '\`\`\`Chat with another server!\`\`\`', inline: true},
            {name: '`Setchannel`', value: '\`\`\`Set the global chat channel!\`\`\`', inline: true},
            {name: '`Removechannel`', value: '\`\`\`Remove the global chat channel!\`\`\`', inline: true},
        ], false, true, true));
    }
}

module.exports = {
    name: 'Social',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'List of all the social commands!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Social(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};