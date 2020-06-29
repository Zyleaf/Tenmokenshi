const BaseCommand = require('../../../../helpers/BaseCommand');
const client = require('nekos.life');
const neko = new client();

class Woof extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;

        async function getGif() {
            const url = await neko.sfw.woof();
            message.channel.send(embedBuilder(true, false, `${message.author.username} woofs like a dog!`, false, false, false, false, url.url, true, true));
        }
        getGif();
    }
}

module.exports = {
    name: 'Woof',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Woof like a dog!',
    cooldown: 3000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Woof(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};