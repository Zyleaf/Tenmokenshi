const BaseCommand = require('../../helpers/BaseCommand');

class Avatar extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const mention = await message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.author;

        message.channel.send(embedBuilder(true, true, false, false, false, false, false, mention.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }), true, true));
    }
}

module.exports = {
    name: 'Avatar',
    usage: [],
    aliases: ['pfp', 'av', 'icon'],
    requiredArgs: false,
    permissions: [],
    description: 'Sends back the avatar of an user!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Avatar(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};