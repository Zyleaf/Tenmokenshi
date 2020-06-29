const BaseCommand = require('../../../helpers/BaseCommand');
const client = require('nekos.life');
const neko = new client();

class Waifu extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        
        async function getGif() {
            const url = await neko.sfw.waifu();
            message.channel.send(embedBuilder(true, false, `${message.author.username} here is a waifu!`, false, false, false, false, url.url, true, true));
        }
        getGif();
    }
}

module.exports = {
    name: 'Waifu',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Get a waifu picture!',
    cooldown: 3000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Waifu(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};