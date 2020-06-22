const BaseCommand = require('../../helpers/BaseCommand');

class Test extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs) {
        super(client, message, permissions, args, parsedArgs);
    }
    
    run = async () => {
        this.message.channel.send(`Hello World!`);
        console.log(this.permissions);
    }
}

module.exports = {
    name: 'Test',
    usage: '',
    args: false,
    aliases: ['Hmm'],
    permissions: ["ADMINISTRATOR", "MANAGE_CHANNELS", "BAN_MEMBERS"],
    description: '',
    cooldDown: 1000,
    execute: (client, message, permissions, args, parsedArgs) => { 
        let command = new Test(client, message, permissions, args, parsedArgs);
        command.checkAndRun();
    }
};