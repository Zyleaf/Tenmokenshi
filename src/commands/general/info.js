const BaseCommand = require('../../helpers/BaseCommand');

class Info extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        message.channel.send(embedBuilder(true, true, `Settings for ${message.author.username}`, false, message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }), false, [
            { name: '`Embed color`', value: `\`\`\`${client.user_Embed_Settings.get(message.author.id) ? client.user_Embed_Settings.get(message.author.id) : '#0bff9e'}\`\`\``, inline: true },
            { name: '`Language`', value: '\`\`\`English\`\`\`', inline: true }
        ], false, true, true));
    }
}

module.exports = {
    name: 'Info',
    usage: [],
    aliases: ['myInfo', 'settings'],
    requiredArgs: false,
    permissions: [],
    description: 'Shows user info!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Info(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};