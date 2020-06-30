const BaseCommand = require('../../helpers/BaseCommand');

class Math extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const prefix = client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id) : '-';
        message.channel.send(embedBuilder(true, true, `List of math commands!`, false, false, false, [
            { name: '`Abs`',  value: '\`\`\`Get the absolute value of an expression!\`\`\`', inline: true },
            { name: '`Derivative`',  value: '\`\`\`Derive a mathematical expression!\`\`\`', inline: true },
            { name: '`Integral`',  value: '\`\`\`Integrate a mathematical expression!\`\`\`', inline: true },
            { name: '`Factor`',  value: '\`\`\`Factor a mathematical expression!\`\`\`', inline: true },
            { name: '`Simplify`',  value: '\`\`\`Simplify a mathematical expression!\`\`\`', inline: true },
            { name: '`Zeroes`',  value: '\`\`\`Get the zeroes of a mathematical expression!\`\`\`', inline: true },
        ], false, true, true));
    }
}

module.exports = {
    name: 'Math',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Sends a list of all the math commands!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Math(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};