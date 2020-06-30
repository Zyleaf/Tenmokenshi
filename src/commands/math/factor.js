const BaseCommand = require('../../helpers/BaseCommand');
const axios = require('axios').default;

class Factor extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const URL = `https://newton.now.sh/factor/${parsedArgs}`;

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
    name: 'Factor',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Factor a mathematical expression!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Factor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};