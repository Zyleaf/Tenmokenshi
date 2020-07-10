const BaseCommand = require('../../helpers/BaseCommand');

class Help extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const prefix = client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id) : '-';
        message.channel.send(embedBuilder(true, true, false, false, false, `\`\`\`Do ${prefix}module-name to get a list of commands!\`\`\``, [
            { name: '`General`', value: '\`\`\`List of all the general commands!\`\`\`', inline: true },
            { name: '`Moderation`', value: '\`\`\`List of all the moderation commands!\`\`\`', inline: true },
            { name: '`Social`', value: '\`\`\`List of all the social commands!\`\`\`', inline: true },
            { name: '`Games`', value: '\`\`\`List of all the game commands!\`\`\`', inline: true },
            { name: '`Math`', value: '\`\`\`List of all the math commands!\`\`\`', inline: true },
            { name: '`Utility`', value: '\`\`\`List of all the utility commands!\`\`\`', inline: true },
            { name: '`Settings`', value: '\`\`\`List of all the settings commands!\`\`\`', inline: true },
            { name: '`Website`', value: '**[Visit](https://tenmokenshi.tk)**', inline: false },
            { name: '`GitHub`', value: '**[Repository](https://github.com/Zyleaf/Tenmokenshi)**', inline: false },
            { name: '`GitHub`', value: '**[Repository](https://github.com/Zyleaf/Tenmokenshi)**', inline: false },
        ], false, true, true));
    }
}

module.exports = {
    name: 'Help',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Sends a list of all the commands!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Help(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};