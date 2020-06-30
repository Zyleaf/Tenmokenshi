const BaseCommand = require('../../helpers/BaseCommand');

class Gen extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        // const emoji = await client.emojis.cache.get('727246634177527859');
        const block = args[0];
        let playerX = 0;
        let playerY = 0;
        let msg = '';

        const sentMessage = await message.channel.send(embedBuilder(true, false, false, false, false, `${msg}`, false, false, false, false));

        let columns = args[1];
        let rows = args[2];
        let gameBoard = [];
        let row = [];

        // Covert gameboard to string
        const renderGame = () => {
            for (let i = 0; i < gameBoard.length; i++) {
                msg += `${gameBoard[i].join(``)}\n`;
            }
        };

        // Generate a row
        for (let k = 0; k < parseInt(rows); k++) {
            row.push(block);
        }

        // Push row into gameboard
        for (let i = 0; i < parseInt(columns); i++) {
            setTimeout(() => {
                msg = '';
                gameBoard.push(row);
                renderGame();
                sentMessage.edit(embedBuilder(true, false, false, false, false, `${msg}`, false, false, false, false));
            }, 500);
        }


        for (let g = 0; g < gameBoard.length; g++) {
            for (let h = 0; h < gameBoard[g].length; h++) {
                gameBoard[g][h] = block;
            }
        }

        // sentMessage.edit(embedBuilder(true, false, false, false, false, `${msg}`, false, false, false, false));*/
    }
}

module.exports = {
    name: 'Gen',
    usage: ['emoji', 'columns', 'rows'],
    aliases: [],
    requiredArgs: true,
    permissions: [],
    description: 'Gen command!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Gen(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};