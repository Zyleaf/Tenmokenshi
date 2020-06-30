const BaseCommand = require('../../helpers/BaseCommand');
const axios = require('axios').default;

class Derivative extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const URL = `https://newton.now.sh/derive/${parsedArgs}`;
        
        const getAnswer = async () => {
            try {
                const response = await axios.get(URL);

                message.channel.send(embedBuilder(true, true, `${parsedArgs}`, false, false, `\`\`\`${response.data.result}\`\`\``, false,
                false, true, true));
            } catch (error) {
                message.channel.send(embedBuilder(true, true, `Something went wrong!`, false, false, `\`${error}\``, false, false, true, true));
            }
        }
        getAnswer();
    }
}

module.exports = {
    name: 'Derivative',
    usage: [],
    aliases: ['der', 'derive'],
    requiredArgs: false,
    permissions: [],
    description: 'Derive a mathematical expression!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Derivative(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};