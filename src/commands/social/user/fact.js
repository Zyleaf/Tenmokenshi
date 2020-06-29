const BaseCommand = require('../../../helpers/BaseCommand');
const client = require('nekos.life');
const neko = new client();

class Fact extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        
        async function getFact() {
            const fact = await neko.sfw.fact();
            message.channel.send(embedBuilder(true, false, `${message.author.username} here is a fact!`, false, false, `**${fact.fact}**`, false, false, true, true));
        }
        getFact();
    }
}

module.exports = {
    name: 'Fact',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Get a fact!',
    cooldown: 3000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Fact(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};