const BaseCommand = require('../../helpers/BaseCommand');

class SetChannel extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const chatChannel = message.mentions.channels.first() || client.channels.cache.get(args[0]);

        if (!chatChannel) return message.channel.send(embedBuilder(true, false, false, false, false, `**That's not a valid channel!**`, false, false, false, false));

        sql.query('SELECT * FROM guild_Chat_Channels WHERE guild_id = ?;', [message.guild.id], (error, results) => {
            if (error) throw error;
            if (results.length === 0) {
                sql.query('INSERT INTO guild_Chat_Channels (guild_id, channel_id) VALUES (?, ?);', [message.guild.id, chatChannel.id], (error) => {
                    if (error) throw error;
                });
                message.channel.send(embedBuilder(true, true, false, false, false, `**Set ${chatChannel.toString()} as the global chat channel!**`, false, false, true, true)); 
            } else {
                sql.query('UPDATE guild_Chat_Channels SET channel_id = ? WHERE guild_id = ?;', [chatChannel.id, message.guild.id], (error) => {
                    if (error) throw error;
                });
                message.channel.send(embedBuilder(true, true, false, false, false, `**Updated the global chat channel to ${chatChannel.toString()}!**`, false, false, true, true)); 
            }

            client.guild_Chat_Channels.set(message.guild.id, chatChannel.id);
        });
    }
}

module.exports = {
    name: 'SetChannel',
    usage: ['#channel or id'],
    aliases: ['sc'],
    requiredArgs: true,
    permissions: ['MANAGE_GUILD'],
    description: 'Set the global chat channel!',
    cooldown: 5000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new SetChannel(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};