const BaseCommand = require('../../helpers/BaseCommand');
const startGame = require('../../snippets/game/startGame');

class Mul extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        if (client.game_Manager.has(message.channel.id) === false && client.game_Connected.has(message.channel.id) === false) {
            if (client.game_Manager.size === 0) {
                const info = {
                    guild: {
                        guildID: message.guild.id,
                        guildName: message.guild.name,
                    },
                    channel: {
                        channelID: message.channel.id,
                        channelName: message.channel.name
                    },
                    user: {
                        userID: message.author.id,
                        userTag: message.author.tag
                    }
                };

                message.channel.send(embedBuilder(true, false, false, false, false, `Looking for a connection!`, false, false, true, false));
                client.game_Manager.set(message.channel.id, info);
                client.game_Connected.set(message.channel.id, false);
            } else {
                let guildInfo;

                for (let entry of client.game_Manager) {
                    guildInfo = {
                        guild: {
                            guildID: entry[1].guild.guildID,
                            guildName: entry[1].guild.guildName
                        },
                        channel: {
                            channelID: entry[1].channel.channelID,
                            channelName: entry[1].channel.channelName,
                        },
                        user: {
                            userID: entry[1].user.userID,
                            userTag: entry[1].user.userTag
                        }
                    };
                }

                const otherChannel = message.client.guilds.cache.get(guildInfo.guild.guildID).channels.cache.get(guildInfo.channel.channelID);

                if (guildInfo.user.userID === message.author.id) {
                    return message.channel.send(embedBuilder(true, false, false, false, false, `You can't play against yourself!`, false, false, false, false));
                } 

                message.channel.send(embedBuilder(true, false, false, false, false, `Connection established with \`${guildInfo.guild.guildName}\`!`, false, false, true, false));
                otherChannel.send(embedBuilder(true, false, false, false, false, `Connection established with \`${message.guild.name}\`!`, false, false, true, false));

                client.game_Manager.delete(guildInfo.channel.channelID);
                client.game_Connected.set(guildInfo.channel.channelID, true);
                client.game_Connected.set(message.channel.id, true);

                startGame(client, message, guildInfo);
            }
        } else {
            message.channel.send(embedBuilder(true, false, false, false, false, `This channel is already looking for connection or already connected!`, false, false, false, false));
        }
    }
}

module.exports = {
    name: 'Mul',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Mul command!',
    cooldown: 0,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Mul(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};