const BaseCommand = require('../../helpers/BaseCommand');
const axios = require('axios').default;

class Answer extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const URL = `http://api.wolframalpha.com/v1/result?appid=${process.env.WOLFRAMALPHA_API_KEY}&i=${parsedArgs}`;

        const getAnswer = async () => {
            try {
                const response = await axios.get(URL);
                message.channel.send(embedBuilder(true, true, `Question: ${parsedArgs}`, false, false, `\`Answer: ${response.data}\``, false, false, true, true));
            } catch (error) {
                message.channel.send(embedBuilder(true, true, `I can't answer that question!`, false, false, `\`${error}\``, false, false, true, true));
            }
        }
        getAnswer();
    }
}

module.exports = {
    name: 'Answer',
    usage: [],
    aliases: ['ans'],
    requiredArgs: false,
    permissions: [],
    description: 'The bot answers your questions!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Answer(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};