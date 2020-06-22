const BaseCommand = require('../../helpers/BaseCommand');

class Ping extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs) {
        super(client, message, permissions, args, parsedArgs);
    }
    
    run = async () => {
        this.message.channel.send(`Pong!`);
    }
}

module.exports = {
    name: 'Ping',
    usage: '',
    args: false,
    aliases: ['Hmm'],
    permissions: [],
    description: 'Sends back pong!',
    cooldDown: 1000,
    execute: (client, message, permissions, args, parsedArgs) => { 
        let command = new Ping(client, message, permissions, args, parsedArgs);
        command.checkAndRun();
    }
};