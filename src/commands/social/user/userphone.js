const BaseCommand = require('../../../helpers/BaseCommand');
const collectors = require('../../../snippets/userphoneCommand/collectors');

class Userphone extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        if (this.client.connection_Manager.has(this.message.channel.id) === false && this.client.channel_Connected.has(this.message.channel.id) === false) {
            if (this.client.connection_Manager.size === 0) {
                const info = {
                    guild: {
                        guildID: this.message.guild.id,
                        guildName: this.message.guild.name,
                    },
                    channel: {
                        channelID: this.message.channel.id,
                        channelName: this.message.channel.name
                    },
                    user: {
                        userID: this.message.author.id,
                        userTag: this.message.author.tag
                    }
                };

                this.message.channel.send(this.embedBuilder(true, false, false, false, false, `Looking for a connection!`, false, false, true, false));
                this.client.connection_Manager.set(this.message.channel.id, info);
                this.client.channel_Connected.set(this.message.channel.id, false);
            } else {
                let guildInfo;

                for (let entry of this.client.connection_Manager) {
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
                const otherChannel = this.message.client.guilds.cache.get(guildInfo.guild.guildID).channels.cache.get(guildInfo.channel.channelID);

                this.message.channel.send(this.embedBuilder(true, false, false, false, false, `Connection established with \`${guildInfo.guild.guildName}\`!`, false, false, true, false));
                otherChannel.send(this.embedBuilder(true, false, false, false, false, `Connection established with \`${this.message.guild.name}\`!`, false, false, true, false));

                this.client.connection_Manager.delete(guildInfo.channel.channelID);
                this.client.channel_Connected.set(guildInfo.channel.channelID, true);
                this.client.channel_Connected.set(this.message.channel.id, true);

                collectors(this.client, this.message, guildInfo);
            }
        } else {
            this.message.channel.send(this.embedBuilder(true, false, false, false, false, `This channel is already looking for connection or already connected!`, false, false, false, false));
        }
    }
}

module.exports = {
    name: 'Userphone',
    usage: [],
    aliases: [],
    requiredArgs: false,
    permissions: [],
    description: 'Chat with another server!',
    cooldown: 10000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Userphone(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};