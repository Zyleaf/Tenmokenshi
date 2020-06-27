const BaseCommand = require('../../helpers/BaseCommand');

class Moderation extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        message.channel.send(embedBuilder(true, true, `List of moderation commands!`, false, false, false, [
            { name: '`Kick`',  value: '\`\`\`Kick a member!\`\`\`', inline: true },
            { name: '`Ban`',  value: '\`\`\`Ban a member!\`\`\`', inline: true },
            { name: '`Clear`',  value: '\`\`\`Bulk delete messages!\`\`\`', inline: true }
        ], false, true, true));
    }
}

module.exports = {
    name: 'Moderation',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'List of all the moderation commands!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Moderation(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};