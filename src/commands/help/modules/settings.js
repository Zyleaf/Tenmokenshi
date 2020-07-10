const BaseCommand = require('../../../helpers/BaseCommand');

class Settings extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        message.channel.send(embedBuilder(true, true, `List of settings commands!`, false, false, false, [
            {name: '`Prefix`', value: '\`\`\`Change the server prefix!\`\`\`', inline: true},
            {name: '`Color`', value: '\`\`\`Change your embed response color!\`\`\`', inline: true},
        ], false, true, true));
    }
}

module.exports = {
    name: 'Settings',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'List of all the settings commands!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Settings(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};