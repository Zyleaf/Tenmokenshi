const BaseCommand = require('../../helpers/BaseCommand');

class Clear extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        let messageToDelete = parseInt(args[0]);

        if (messageToDelete < 1 || messageToDelete > 99) {
            return message.channel.send(embedBuilder(true, false, false, false, false, `**Please enter a number between \`1\` and \`99\`!**`));
        } else {
            let FetchedMessages = await message.channel.messages.fetch({ limit: messageToDelete + 1 });
            message.channel.bulkDelete(FetchedMessages)
                .catch((error) => {
                    message.channel.send(error);
                });
            let SuccesEmbed = embedBuilder(true, true, false, false, false, `Deleted \`${messageToDelete} message(s)!\``, false, false, true, false);

            return message.channel.send(SuccesEmbed)
                .then(message => {
                    message.delete({ timeout: 2000 });
                });
        }

    }
}

module.exports = {
    name: 'Clear',
    usage: ['# of message'],
    aliases: ['delete', 'purge'],
    requiredArgs: true,
    permissions: ['MANAGE_MESSAGES'],
    description: 'Purge messages!',
    cooldown: 0,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Clear(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};