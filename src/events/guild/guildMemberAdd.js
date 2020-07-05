const Discord = require('discord.js');

const randomInt = (min, max) => {
    return Math.random() * (max - min) + min;
};

module.exports = async (client, member) => {
    if (member.guild.id === '693870033431953408') {
        const chatChannel = client.guilds.cache.get('693870033431953408').channels.cache.get('693897414255575060');
        const gifUrls = [
                        'https://cdn.discordapp.com/attachments/713853643891146872/727878599171899562/HopefulBrightDragonfly-max-1mb.gif', 
                        'https://i.ibb.co/DVbmhhm/3Q6b.gif'
                        ];

        const embed = new Discord.MessageEmbed()
            .setColor('#ffb7c5')
            .setTitle(`Welcome to ${member.guild.name}`)
            .setThumbnail(member.user.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setDescription(`**Make sure to read the <#693895682498625536>!\nGet some roles from <#693896090457473054>!\nHave fun and keep learning!**`)
            .setImage(gifUrls[0])
            .setFooter(`You're the ${member.guild.memberCount}th member!`, 'https://i.pinimg.com/originals/7d/09/a4/7d09a485cb23ebed6cb999e0f4302dd6.gif')
            .setTimestamp()

        chatChannel.send(embed);
    }
};