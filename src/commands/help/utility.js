const BaseCommand = require('../../helpers/BaseCommand');

class Utility extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        message.channel.send(embedBuilder(true, true, `List of utility commands!`, false, false, false, [
            { name: '`Avatar`', value: '\`\`\`Get an user\'s avatar!\`\`\`', inline: true },
            { name: '`Weather`', value: '\`\`\`Get the weather info about a city or country!\`\`\`', inline: true },
            { name: '`Answer`', value: '\`\`\`The bot answers your question!\`\`\`', inline: true }
        ], false, true, true));
    }
}

module.exports = {
    name: 'Utility',
    usage: [],
    aliases: ['utils'],
    requiredArgs: false,
    permissions: [],
    description: 'List of all the utility commands!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Utility(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};