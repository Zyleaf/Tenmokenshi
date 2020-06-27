const dotenv = require('dotenv').config();
const Discord = require('discord.js');
const Tenor = require("tenorjs").client({
    "Key": process.env.TENOR_KEY,
    "Filter": process.env.TENOR_FILTER,
    "Locale": process.env.TENOR_LOCALE,
    "MediaFilter": process.env.TENOR_MEDIA_FILTER,
    "DateFormat": process.env.TENOR_DATE_FORMAT,
    "Ar_range": process.env.TENOR_AR_RANGE,
});

const endConnections = (thisChannelCollector, thatChannelCollector, guildInfo, message, otherChannel, client) => {
    message.channel.send(embedBuilder(true, false, false, false, false, `The connection with \`${otherChannel.guild.name}\` ended!`, false, false, true, false, client, message));
    otherChannel.send(embedBuilder(true, false, false, false, false, `The connection with \`${message.channel.guild.name}\` ended!`, false, false, true, false, client, message));
    thisChannelCollector.stop();
    thatChannelCollector.stop();
    client.channel_Connected.delete(guildInfo.channel.channelID);
    client.channel_Connected.delete(message.channel.id);
};

const embedBuilder = (color, author, title, url, thumbnail, description, fields, imageURL, timeStamp, footer, client, message) => {
    const builtEmbed = new Discord.MessageEmbed();

    let user_embed_color = client.user_Embed_Settings.get(message.author.id) ? client.user_Embed_Settings.get(message.author.id) : '#0bff9e';

    if (color) builtEmbed.setColor(user_embed_color);
    if (author) builtEmbed.setAuthor(message.author.username, message.author.avatarURL());
    if (title) builtEmbed.setTitle(title);
    if (url) builtEmbed.setURL(url);
    if (thumbnail) builtEmbed.setThumbnail(thumbnail);
    if (description) builtEmbed.setDescription(description);
    if (fields) {
        for (const field of fields) {
            builtEmbed.addFields(field);
        }
    }
    if (imageURL) builtEmbed.setImage(imageURL);
    if (timeStamp) builtEmbed.setTimestamp();
    if (footer) builtEmbed.setFooter(`Requested by ${message.author.username}`, message.guild.iconURL());

    return builtEmbed;
}


module.exports = collectors = async (client, message, guildInfo) => {
    const filter = m => true;
    const otherChannel = message.client.guilds.cache.get(guildInfo.guild.guildID).channels.cache.get(guildInfo.channel.channelID);
    const thisChannelCollector = message.channel.createMessageCollector(filter, { time: 15000000 });
    const thatChannelCollector = otherChannel.createMessageCollector(filter, { time: 15000000 });

    thisChannelCollector.on('collect', m => {
        if (m.author.bot) return;
        if (m.content.toLowerCase() === 'ec') {
            endConnections(thisChannelCollector, thatChannelCollector, guildInfo, message, otherChannel, client);
        } else if (m.content.includes('https://tenor.com') || m.content.includes('https://i.giphy.com')) {
            const matches = m.content.match(/\bhttps?:\/\/\S+/gi);
            const lastDash = matches[0].lastIndexOf('-');
            const id = matches[0].substring(lastDash + 1, matches[0].length);

            matches.forEach((match) => {
                Tenor.Search.Find([id]).then(results => {
                    otherChannel.send(embedBuilder(true, true, false, false, false, false, false, results[0].media[0].gif.url, false, false, client, m));
                }).catch(console.error);
            });
        } else if (m.attachments.size > 0) {
            m.attachments.forEach(attachment => {
                let url = attachment.url;
                otherChannel.send(embedBuilder(true, true, false, false, false, `${m.content}\n[Attachment URL](${url})`, false, url, false, false, client, m));
            });
        } else {
            otherChannel.send(embedBuilder(true, true, false, false, false, `${m.content}`, false, false, false, false, client, m));
        }
    });

    thatChannelCollector.on('collect', m => {
        if (m.author.bot) return;
        if (m.content.toLowerCase() === 'ec') {
            endConnections(thisChannelCollector, thatChannelCollector, guildInfo, message, otherChannel, client);
        } else if (m.content.includes('https://tenor.com') || m.content.includes('https://i.giphy.com')) {
            const matches = m.content.match(/\bhttps?:\/\/\S+/gi);
            const lastDash = matches[0].lastIndexOf('-');
            const id = matches[0].substring(lastDash + 1, matches[0].length);

            matches.forEach((match) => {
                Tenor.Search.Find([id]).then(results => {
                    message.channel.send(embedBuilder(true, true, false, false, false, false, false, results[0].media[0].gif.url, false, false, client, m));
                }).catch(console.error);
            });
        } else if (m.attachments.size > 0) {
            m.attachments.forEach(attachment => {
                let url = attachment.url;
                message.channel.send(embedBuilder(true, true, false, false, false, `${m.content}\n[Attachment URL](${url})`, false, url, false, false, client, m));
            });
        } else {
            message.channel.send(embedBuilder(true, true, false, false, false, `${m.content}`, false, false, false, false, client, m));

        }
    });

    setTimeout(() => {
        if (client.channel_Connected.has(guildInfo.channel.channelID) && client.channel_Connected.has(message.channel.id)) {
            client.channel_Connected.delete(guildInfo.channel.channelID);
            client.channel_Connected.delete(message.channel.id);
            message.channel.send(embedBuilder(true, false, false, false, false, `Time is up! The connection with \`${otherChannel.guild.name}\` ended!`, false, false, true, false, client, message));
            otherChannel.send(embedBuilder(true, false, false, false, false, `Time is up! The connection with \`${message.channel.guild.name}\` ended!`, false, false, true, false, client, message));
        }
    }, 90000);
};