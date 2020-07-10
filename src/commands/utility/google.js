const BaseCommand = require('../../helpers/BaseCommand');
const googleIt = require('google-it');

class Google extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        try {
            const results = await googleIt({ 'query': `${parsedArgs}` });
            if (results.length !== 0) {
                let counter = 1;
                let string = '';

                for (const result of results) {
                    string += `\`${counter}.\` [${result.title}](${result.link})\n\`\`\`${result.snippet}\`\`\`\n`;
                    counter++;
                }
                message.channel.send(embedBuilder(true, true, `Here are the Google search results!`, false, false, `${string}`, false, false, true, true));
            } else {
                message.channel.send(embedBuilder(true, false, false, false, false, `**Query must be greater than 0 characters!**`, false, false, false, false));
            }
        } catch (error) {
            message.channel.send(`\`${error}\``);
        }
    }
}

module.exports = {
    name: 'Google',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Sends back Google search results!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Google(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};