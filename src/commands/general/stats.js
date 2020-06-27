const BaseCommand = require('../../helpers/BaseCommand');

class Stats extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        message.channel.send(embedBuilder(true, true, `Tenmokenshi\nA multi-purpose Discord bot!`, false, `https://i.ibb.co/3zd2qr8/Tenmokenshi-Logo.png`, false, [
            { name: '`Ping`', value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true },
            { name: '`Library`', value: '\`\`\`Discord.js\`\`\`', inline: true },
            { name: '`Node Version`', value: '\`\`\`v14.4.0\`\`\`', inline: true },
            { name: '`Servers`', value: `\`\`\`${client.guilds.cache.size}\`\`\``, inline: true },
            { name: '`Users`', value: `\`\`\`${client.users.cache.size}\`\`\``, inline: true },
            { name: '`Developer`', value: '\`\`\`Zyleaf#1018\`\`\`', inline: true },
        ], false, true, true));
    }
}

module.exports = {
    name: 'Stats',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Sends Tenmokenshi\'s stats!',
    cooldown: 3000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Stats(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};