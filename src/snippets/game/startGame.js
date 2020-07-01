const Discord = require('discord.js');

const embedBuilder = (color, author, title, url, thumbnail, description, fields, imageURL, timeStamp, footer, client, message) => {
    const builtEmbed = new Discord.MessageEmbed();

    let user_embed_color = client.user_Embed_Settings.get(message.author.id) ? client.user_Embed_Settings.get(message.author.id) : '#0bff9e';

    if (color) builtEmbed.setColor(user_embed_color);
    if (author) builtEmbed.setAuthor(message.author.username, message.author.avatarURL());
    if (title) builtEmbed.setTitle(title);
    if (url) builtEmbed.setURL(url);
    if (thumbnail) builtEmbed.setThumbnail(thumbnail);
    if (description) builtEmbed.setDescription(description);
    if (fields) {
        for (const field of fields) {
            builtEmbed.addFields(field);
        }
    }
    if (imageURL) builtEmbed.setImage(imageURL);
    if (timeStamp) builtEmbed.setTimestamp();
    if (footer) builtEmbed.setFooter(`Requested by ${message.author.username}`, message.guild.iconURL());

    return builtEmbed;
}

module.exports = startGame = async (client, message, guildInfo) => {
    const otherChannel = message.client.guilds.cache.get(guildInfo.guild.guildID).channels.cache.get(guildInfo.channel.channelID);
    const emoji = await client.emojis.cache.get('727700307890405476');
    const playerEmoji1 = await client.emojis.cache.get('727247452146761778');
    const playerEmoji2 = await client.emojis.cache.get('727531584105873412');
    const block = `<:${emoji.name}:${emoji.id}>`;
    const player1 = `<:${playerEmoji1.name}:${playerEmoji1.id}>`;
    const player2 = `<:${playerEmoji2.name}:${playerEmoji2.id}>`;
    let currentTurn = message.author.tag;
    let playerX1 = 0;
    let playerY1 = 0;
    let playerX2 = 0;
    let playerY2 = 9;
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

    const renderGame = (x1, y1, x2, y2) => {
        for (let i = 0; i < gameBoard.length; i++) {
            for (let j = 0; j < gameBoard[i].length; j++) {
                gameBoard[i][j] = block;
            }
            gameBoard[x1][y1] = player1;
            gameBoard[x2][y2] = player2;
            msg += `${gameBoard[i].join(``)}\n`;
        }
    };

    const movePlayer = (x1, y1, x2, y2) => {
        msg = '';
        renderGame(x1, y1, x2, y2);
    };

    const updateEmbeds = (otherChanMessage, thisChanMessage) => {
        builtGame = embedBuilder(true, false, `2D SANDBOX`, false, false, msg, [
            { name: '`CURRENT TURN`', value: `\`\`\`${currentTurn}\`\`\``, inline: false },
            { name: `\`${message.author.tag}\``, value: `${player1}`, inline: true },
            { name: `\`${guildInfo.user.userTag}\``, value: `${player2}`, inline: true },
            { name: `\`${message.author.tag}'S POSITION\``, value: `\`\`\`(${playerY1}, ${playerX1})\`\`\``, inline: false },
            { name: `\`${guildInfo.user.userTag}'S POSITION\``, value: `\`\`\`(${playerY2}, ${playerX2})\`\`\``, inline: false },
        ], false, true, false, client, message);

        thisChanMessage.edit(builtGame);
        otherChanMessage.edit(builtGame);
    };

    renderGame(playerX1, playerY1, playerX2, playerY2);

    let builtGame = embedBuilder(true, false, `2D SANDBOX`, false, false, msg, [
        { name: '`CURRENT TURN`', value: `\`\`\`${currentTurn}\`\`\``, inline: false },
        { name: `\`${message.author.tag}\``, value: `${player1}`, inline: true },
        { name: `\`${guildInfo.user.userTag}\``, value: `${player2}`, inline: true },
        { name: `\`${message.author.tag}'S POSITION\``, value: `\`\`\`(${playerY1}, ${playerX1})\`\`\``, inline: false },
        { name: `\`${guildInfo.user.userTag}'S POSITION\``, value: `\`\`\`(${playerY2}, ${playerX2})\`\`\``, inline: false },
    ], false, true, false, client, message);

    const thisChanMessage = await message.channel.send(builtGame);
    const otherChanMessage = await otherChannel.send(builtGame);

    let reactions = ['⬆️', '⬇️', '⬅️', '➡️', '❌'];

    for (let q = 0; q < reactions.length; q++) {
        thisChanMessage.react(reactions[q]);
        otherChanMessage.react(reactions[q]);
    }
    
    const filter = (reaction, user) => { return user.id === message.author.id || user.id === guildInfo.user.userID };
    const thisChanCollector = thisChanMessage.createReactionCollector(filter, { time: 900000 });
    const otherChanCollector = otherChanMessage.createReactionCollector(filter, { time: 900000 });

    const endGame = (client, message, otherChannel, thisChanCollector, otherChanCollector) => {
        message.channel.send(embedBuilder(true, false, false, false, false, `The connection with \`${otherChannel.guild.name}\` ended!`, false, false, true, false, client, message));
        otherChannel.send(embedBuilder(true, false, false, false, false, `The connection with \`${message.channel.guild.name}\` ended!`, false, false, true, false, client, message));
        thisChanCollector.stop();
        otherChanCollector.stop();
        client.game_Connected.delete(guildInfo.channel.channelID);
        client.game_Connected.delete(message.channel.id);
    };

    thisChanCollector.on('collect', (reaction, user) => {
        if (currentTurn === message.author.tag) {
            currentTurn = guildInfo.user.userTag;
            switch (reaction.emoji.name) {
                case '⬆️':
                    if (playerX1 > 0 && playerX1 <= 6) {
                        playerX1--;
                        movePlayer(playerX1, playerY1, playerX2, playerY2);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    } else {
                        message.channel.send(`That's the boundary!`);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    }
                case '⬇️':
                    if (playerX1 >= 0 && playerX1 < 6) {
                        playerX1++;
                        movePlayer(playerX1, playerY1, playerX2, playerY2);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    } else {
                        message.channel.send(`That's the boundary!`);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    }
                case '⬅️':
                    if (playerY1 > 0 && playerY1 <= 9) {
                        playerY1--;
                        movePlayer(playerX1, playerY1, playerX2, playerY2);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    } else {
                        message.channel.send(`That's the boundary!`);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    }

                case '➡️':
                    if (playerY1 >= 0 && playerY1 < 9) {
                        playerY1++;
                        movePlayer(playerX1, playerY1, playerX2, playerY2);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    } else {
                        message.channel.send(`That's the boundary!`);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    }
                default:
                    break;
            };
        }

        if (reaction.emoji.name === '❌') {
            endGame(client, message, otherChannel, thisChanCollector, otherChanCollector);
        }
    });

    otherChanCollector.on('collect', (reaction, user) => {
        if (currentTurn === guildInfo.user.userTag) {
            currentTurn = message.author.tag;
            switch (reaction.emoji.name) {
                case '⬆️':
                    if (playerX2 > 0 && playerX2 <= 6) {
                        playerX2--;
                        movePlayer(playerX1, playerY1, playerX2, playerY2);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    } else {
                        otherChannel.send(`That's the boundary!`);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    }

                case '⬇️':
                    if (playerX2 >= 0 && playerX2 < 6) {
                        playerX2++;
                        movePlayer(playerX1, playerY1, playerX2, playerY2);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    } else {
                        otherChannel.send(`That's the boundary!`);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    }

                case '⬅️':
                    if (playerY2 > 0 && playerY2 <= 9) {
                        playerY2--;
                        movePlayer(playerX1, playerY1, playerX2, playerY2);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    } else {
                        otherChannel.send(`That's the boundary!`);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    }
                case '➡️':
                    if (playerY2 >= 0 && playerY2 < 9) {
                        playerY2++;
                        movePlayer(playerX1, playerY1, playerX2, playerY2);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    } else {
                        otherChannel.send(`That's the boundary!`);
                        updateEmbeds(otherChanMessage, thisChanMessage);
                        break;
                    }
                default:
                    break;
            };
        }

        if (reaction.emoji.name === '❌') {
            endGame(client, message, otherChannel, thisChanCollector, otherChanCollector);
        }
    });
    
};