const BaseCommand = require('../../helpers/BaseCommand');

class General extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        message.channel.send(embedBuilder(true, true, `List of general commands!`, false, false, false, [
            {name: '`Info`', value: '\`\`\`Shows user settings!\`\`\`', inline: true},
            {name: '`Ping`', value: '\`\`\`Sends back pong!\`\`\`', inline: true},
            {name: '`Stats`', value: '\`\`\`Sends Tenmokenshi\'s stats!\`\`\`', inline: true},
        ], false, true, true));
    }
}

module.exports = {
    name: 'General',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'List of all the general commands!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new General(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};