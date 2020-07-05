const Discord = require('discord.js');

const embedBuilder = (color, author, title, url, thumbnail, description, fields, imageURL, timeStamp, footer, client, message) => {
    const builtEmbed = new Discord.MessageEmbed();

    let user_embed_color = client.user_Embed_Settings.get(message.author.id) ? client.user_Embed_Settings.get(message.author.id) : '#0bff9e';

    if (color) builtEmbed.setColor(user_embed_color);
    if (author) builtEmbed.setAuthor(message.author.tag);
    if (title) builtEmbed.setTitle(title);
    if (url) builtEmbed.setURL(url);
    if (thumbnail) builtEmbed.setThumbnail(message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
    if (description) builtEmbed.setDescription(description);
    if (fields) {
        for (const field of fields) {
            builtEmbed.addFields(field);
        }
    }
    if (imageURL) builtEmbed.setImage(imageURL);
    if (timeStamp) builtEmbed.setTimestamp();
    if (footer) builtEmbed.setFooter(`From ${message.guild.name}・Send ec to end the connection!`, message.guild.iconURL());

    return builtEmbed;
}

module.exports = messageEdits = async (client, oldMessage, newMessage) => {
    if (client.userphone_message_Mapper.has(oldMessage.id)) {
        const info = client.userphone_message_Mapper.get(oldMessage.id);
        let guild = newMessage.client.guilds.cache.get(info.botMessage.guildID);
        let channel = newMessage.client.guilds.cache.get(guild.id).channels.cache.get(info.botMessage.channelID);

        let msgToEdit = await channel.messages.fetch(info.botMessage.messageID);
        msgToEdit.edit(embedBuilder(true, true, false, false, true, `${newMessage.content}`, false, false, false, true, client, newMessage));
    }
};