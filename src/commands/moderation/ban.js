const BaseCommand = require('../../helpers/BaseCommand');

class Ban extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send(embedBuilder(true, true, false, false, false, `**That's not a valid member!**`, false, false, true, false));

        if (!member.bannable) return message.channel.send(embedBuilder(true, true, false, false, false, `**I can't ban \`${member.user.tag}\`!**`, false, false, true, false));

        let reason = args.slice(1, args.length);
        let reasonString;

        if (reason.length === 0) {
            reasonString = 'No reason was provided';
        } else {
            reasonString = reason.join(' ');
        }

        await member.ban(reasonString)
            .catch((error) => {
                return message.channel.send(error);
            });

        message.channel.send(embedBuilder(true, false, false, false, false, `**\`${message.author.tag}\` banned \`${member.user.tag}\` from this server!\nReason: \`${reasonString}\`**`, false, false, true, false));
    }
}

module.exports = {
    name: 'Ban',
    usage: ['@user or id'],
    aliases: ['b'],
    requiredArgs: false,
    permissions: ['BAN_MEMBERS'],
    description: 'Ban a member!',
    cooldown: 0,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Ban(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};