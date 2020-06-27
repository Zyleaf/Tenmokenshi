const BaseCommand = require('../../helpers/BaseCommand');

class Prefix extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;

        if (args[0].length > 1) return embedBuilder(true, true, false, false, false, `\`The prefix can't be longer than 1 character!\``, false, false, true, true);
        sql.query('SELECT * FROM guild_Prefixes WHERE guild_id = ?;', [message.guild.id], (error, results) => {
            if (error) throw error;

            if (results.length === 0) {
                sql.query('INSERT INTO guild_Prefixes (guild_id, guild_prefix) VALUES (?, ?);', [message.guild.id, args[0]], (error) => {
                    if (error) throw error;
                });
                client.prefixes.set(message.guild.id, args[0]);
                message.channel.send(embedBuilder(true, true, false, false, false, `**Set the prefix to \`${args[0]}\`**`, false, false, true, true));
            } else {
                sql.query('UPDATE guild_Prefixes SET guild_prefix = ? WHERE guild_id = ?;', [args[0], message.guild.id], (error) => {
                    if (error) throw error;
                });
                client.prefixes.set(message.guild.id, args[0]);
                message.channel.send(embedBuilder(true, true, false, false, false, `**Set the prefix to \`${args[0]}\`**`, false, false, true, true));
            }
        });
    }
}

module.exports = {
    name: 'Prefix',
    usage: ['prefix'],
    aliases: ['setPrefix'],
    requiredArgs: true,
    permissions: ['MANAGE_GUILD'],
    description: 'Change the server prefix!',
    cooldown: 5000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Prefix(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};