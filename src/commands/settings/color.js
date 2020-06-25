const BaseCommand = require('../../helpers/BaseCommand');
const validHexColor = require('valid-hex-color');

class Color extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        if (validHexColor.check(args[0])) {
            sql.query('SELECT * FROM user_Embed_Settings', (error, results) => {
                if (error) throw error;
                if (results.length === 0) {
                    sql.query('INSERT INTO user_Embed_Settings (user_id, user_embed_color) VALUES (?, ?)', [message.author.id, args[0]], (error) => {
                        if (error) throw error;
                    });
                } else {
                    sql.query('UPDATE user_Embed_Settings SET user_embed_color = ? WHERE user_id = ?;', [args[0], message.author.id], (error, results) => {
                        if (error) throw error;
                    });
                }
            });
            client.user_Embed_Settings.set(message.author.id, args[0]);
            message.channel.send(embedBuilder(true, true, false, false, false, `**Set your embed color to \`${args[0]}\`\**`, false, false, true, false));
        } else {
            message.channel.send(embedBuilder(true, true, false, false, false, `**That's not a valid hex color!**`, false, false, true, false));
        }
    }
}

module.exports = {
    name: 'Color',
    usage: ['hex code'],
    aliases: ['setColor'],
    requiredArgs: true,
    permissions: [],
    description: 'Set your embed response color!',
    cooldown: 5000,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Color(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};