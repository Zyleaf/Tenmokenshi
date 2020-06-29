const BaseCommand = require('../../helpers/BaseCommand');

class Unban extends BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        super(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
    }

    run = async () => {
        const { client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql, embedBuilder } = this;
        const isNum = (/^\d+$/.test(args[0]));

        if (!isNum) return message.channel.send(embedBuilder(true, false, false, false, false, `**\`${args[0]}\` is not a valid user id!**`, false, false, false, false));

        const mention = await message.client.users.cache.get(args[0]);
        
        if (!mention) return message.channel.send(embedBuilder(true, false, false, false, false, `**Please mention a valid id!**`, false, false, false, false));

        let reason = args.slice(1, args.length);
        let reasonString;

        if (reason.length === 0) {
            reasonString = 'No reason was provided';
        } else {
            reasonString = reason.join(' ');
        }

        try {
            const banList = await message.guild.fetchBans();

            for (let bannedMember of banList) {
                if (bannedMember[0] === mention.id) {
                    message.guild.members.unban(mention, { reason: reasonString });
                    return message.channel.send(embedBuilder(true, true, 'Unban successful!', false, false, `**\`${message.author.tag}\` unbanned \`${mention.tag}\` from this server!\nReason: \`${reasonString}\`**`, false, false, true, false));
                } else {
                    continue;
                }
            }

            return message.channel.send(embedBuilder(true, true, false, false, false, `**\`${mention.tag}\` is not banned!**`, false, false, true, false));
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    name: 'Unban',
    usage: ['@user or id'],
    aliases: ['ub'],
    requiredArgs: false,
    permissions: ['BAN_MEMBERS'],
    description: 'Unban a member!',
    cooldown: 0,
    execute: (client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) => {
        let command = new Unban(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql);
        command.checkPerms();
    }
};