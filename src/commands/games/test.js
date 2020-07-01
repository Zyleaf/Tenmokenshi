const BaseCommand = require('../../helpers/BaseCommand');
const { Collection } = require('discord.js');

class Test extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const emoji = await client.emojis.cache.get('727246634177527859');
        const playerEmoji = await client.emojis.cache.get('727247452146761778');
        const block = `<:${emoji.name}:${emoji.id}>`;
        const player = `<:${playerEmoji.name}:${playerEmoji.id}>`;
        let playerX = 0;
        let playerY = 0;
        let msg = '';
        let gameBoard =
            [
                [block, block, block, block, block, block, block, block, block, block],
                [block, block, block, block, block, block, block, block, block, block],
                [block, block, block, block, block, block, block, block, block, block],
                [block, block, block, block, block, block, block, block, block, block],
                [block, block, block, block, block, block, block, block, block, block],
                [block, block, block, block, block, block, block, block, block, block],
                [block, block, block, block, block, block, block, block, block, block],
            ];

        const renderGame = (x, y) => {
            for (let i = 0; i < gameBoard.length; i++) {
                for (let j = 0; j < gameBoard[i].length; j++) {
                    gameBoard[i][j] = block;
                }
                gameBoard[x][y] = player;
                msg += `${gameBoard[i].join(``)}\n`;
            }
        };

        const movePlayer = (x, y) => {
            msg = '';
            renderGame(x, y);
        };

        renderGame(playerX, playerY);

        const sentMessage = await message.channel.send(embedBuilder(true, false, `Position: (${playerY}, ${playerX})`, false, false, `${msg}`, false, false, false, false));

        sentMessage.react('⬆️');
        sentMessage.react('⬇️');
        sentMessage.react('⬅️');
        sentMessage.react('➡️');

        const filter = (reaction, user) => { return user.id === message.author.id };
        const collector = sentMessage.createReactionCollector(filter, { time: 900000 });

        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case '⬆️':
                    if (playerX > 0 && playerX <= 6) {
                        playerX -= 1;
                        movePlayer(playerX, playerY);
                        sentMessage.edit(embedBuilder(true, false, `Position: (${playerY}, ${playerX})`, false, false, `${msg}`, false, false, false, false));
                    } else {
                        message.channel.send(`Hit!`);
                    }
                case '⬇️':
                    if (playerX >= 0 && playerX < 6) {
                        playerX += 1;
                        movePlayer(playerX, playerY);
                        sentMessage.edit(embedBuilder(true, false, `Position: (${playerY}, ${playerX})`, false, false, `${msg}`, false, false, false, false));
                    } else {
                        message.channel.send(`Hit!`);
                    }
                case '⬅️':
                    if (playerY <= 9 && playerY > 0) {
                        playerY -= 1;
                        movePlayer(playerX, playerY);
                        sentMessage.edit(embedBuilder(true, false, `Position: (${playerY}, ${playerX})`, false, false, `${msg}`, false, false, false, false));
                    } else {
                        message.channel.send(`Hit!`);
                    }
                case '➡️':
                    if (playerY < 9 && playerY >= 0) {
                        playerY += 1;
                        movePlayer(playerX, playerY);
                        sentMessage.edit(embedBuilder(true, false, `Position: (${playerY}, ${playerX})`, false, false, `${msg}`, false, false, false, false));
                    } else {
                        message.channel.send(`Hit!`);
                    }
                default:
                    break;
            };
        });

        collector.on('end', (Collection) => {
            message.channel.send(`Game ended!`);
        });
    }
}

module.exports = {
    name: 'Test',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Test command!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Test(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};