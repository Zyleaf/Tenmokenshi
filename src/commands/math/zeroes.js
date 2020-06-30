const BaseCommand = require('../../helpers/BaseCommand');
const axios = require('axios').default;

class Zeroes extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const URL = `https://newton.now.sh/zeroes/${parsedArgs}`;
        
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
    name: 'Zeroes',
    usage: [],
    aliases: ['roots'],
    requiredArgs: false,
    permissions: [],
    description: 'Get the zeroes of a mathematical expression!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Zeroes(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};