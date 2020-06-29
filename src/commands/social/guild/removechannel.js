const BaseCommand = require('../../../helpers/BaseCommand');

class RemoveChannel extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const chatChannel = message.mentions.channels.first() || client.channels.cache.get(args[0]);

        if (!chatChannel) return message.channel.send(embedBuilder(true, false, false, false, false, `**That's not a valid channel!**`, false, false, false, false));

        sql.query('SELECT * FROM guild_Chat_Channels WHERE channel_id = ?;', [chatChannel.id], (error, results) => {
            if (error) throw error;
            if (results.length === 0) {
                message.channel.send(embedBuilder(true, false, false, false, false, `**${chatChannel.toString()} is not a global chat channel!**`, false, false, false, false));
            } else {
                client.guild_Chat_Channels.delete(message.guild.id);
                sql.query('DELETE FROM guild_Chat_Channels WHERE channel_id = ?;', [chatChannel.id], (error) => {
                    if (error) throw error;
                    message.channel.send(embedBuilder(true, false, false, false, false, `**Removed ${chatChannel.toString()} from the global chat!**`, false, false, true, true));
                });
            }
        });
    }
}

module.exports = {
    name: 'RemoveChannel',
    usage: ['#channel or id'],
    aliases: ['rc'],
    requiredArgs: true,
    permissions: ['MANAGE_GUILD'],
    description: 'Remove the global chat channel!',
    cooldown: 2000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new RemoveChannel(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};