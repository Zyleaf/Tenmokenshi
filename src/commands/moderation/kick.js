const BaseCommand = require('../../helpers/BaseCommand');

class Kick extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send(embedBuilder(true, true, false, false, false, `**That's not a valid member!**`, false, false, true, false));

        if (!member.kickable) return message.channel.send(embedBuilder(true, true, false, false, false, `**I can't kick \`${member.user.tag}\`!**`, false, false, true, false));

        let reason = args.slice(1, args.length);
        let reasonString;

        if (reason.length === 0) {
            reasonString = 'No reason was provided';
        } else {
            reasonString = reason.join(' ');
        }

        await member.kick(reasonString)
            .catch((error) => {
                return message.channel.send(error);
            });

        message.channel.send(embedBuilder(true, false, false, false, false, `**\`${message.author.tag}\` kicked \`${member.user.tag}\` out of this server!\nReason: \`${reasonString}\`**`, false, false, true, false));
    }
}

module.exports = {
    name: 'Kick',
    usage: ['@user or id'],
    aliases: ['k'],
    requiredArgs: false,
    permissions: ['KICK_MEMBERS'],
    description: 'Kick a member!',
    cooldown: 0,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Kick(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};