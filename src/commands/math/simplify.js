const BaseCommand = require('../../helpers/BaseCommand');
const axios = require('axios').default;

class Simplify extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const URL = `https://newton.now.sh/simplify/${parsedArgs}`;
        
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
    name: 'Simplify',
    usage: [],
    aliases: ['simp', 'eval'],
    requiredArgs: false,
    permissions: [],
    description: 'Simplify a mathematical expression!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Simplify(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};