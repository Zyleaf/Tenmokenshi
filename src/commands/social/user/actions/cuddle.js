const BaseCommand = require('../../../../helpers/BaseCommand');
const client = require('nekos.life');
const neko = new client();

class Cuddle extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const user = await message.mentions.users.first() || message.client.users.cache.get(args[0]);

        if (!user) return message.channel.send(embedBuilder(true, true, false, false, false, `**That's not a valid member!**`, false, false, true, false));

        async function getGif() {
            const url = await neko.sfw.cuddle();
            message.channel.send(embedBuilder(true, false, `${message.author.username} cuddles with ${user.username}!`, false, false, false, false, url.url, true, true));
        }
        getGif();
    }
}

module.exports = {
    name: 'Cuddle',
    usage: ['@user or id'],
    aliases: [],
    requiredArgs: true,
    permissions: [],
    description: 'Cuddle with someone!',
    cooldown: 3000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Cuddle(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};