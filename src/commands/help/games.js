const BaseCommand = require('../../helpers/BaseCommand');

class Games extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        message.channel.send(embedBuilder(true, true, `List of game commands!`, false, false, false, [
            { name: '`test`',  value: '\`\`\`A 2D single player sandbox!\`\`\`', inline: true },
            { name: '`mul`',  value: '\`\`\`A 2D multiplayer sandbox!\`\`\`', inline: true },
        ], false, true, true));
    }
}

module.exports = {
    name: 'Games',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Sends a list of all the game commands!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Games(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};