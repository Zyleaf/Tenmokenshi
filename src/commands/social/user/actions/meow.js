const BaseCommand = require('../../../../helpers/BaseCommand');
const client = require('nekos.life');
const neko = new client();

class Meow extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;

        async function getGif() {
            const url = await neko.sfw.meow();
            message.channel.send(embedBuilder(true, false, `${message.author.username} meows like a cat!`, false, false, false, false, url.url, true, true));
        }
        getGif();
    }
}

module.exports = {
    name: 'Meow',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Meow like a cat!',
    cooldown: 3000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Meow(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};