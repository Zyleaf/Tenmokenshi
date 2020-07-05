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
    if (footer) builtEmbed.setFooter(`From ${message.guild.name}`, message.guild.iconURL());

    return builtEmbed;
}

module.exports = collectors = async (client, message, guildInfo) => {
    const filter = m => true;
    const otherChannel = message.client.guilds.cache.get(guildInfo.guild.guildID).channels.cache.get(guildInfo.channel.channelID);
    const thisChannelCollector = message.channel.createMessageCollector(filter, { time: 15000000 });
    const thatChannelCollector = otherChannel.createMessageCollector(filter, { time: 15000000 });

    thisChannelCollector.on('collect', async m => {
        if (m.author.bot) return;
        let msg;

        if (m.content.toLowerCase() === 'ec') {
            endConnections(thisChannelCollector, thatChannelCollector, guildInfo, message, otherChannel, client);
        } else if (m.content.includes('https://tenor.com') || m.content.includes('https://i.giphy.com')) {
            const matches = m.content.match(/\bhttps?:\/\/\S+/gi);
            const lastDash = matches[0].lastIndexOf('-');
            const id = matches[0].substring(lastDash + 1, matches[0].length);

            matches.forEach((match) => {
                Tenor.Search.Find([id]).then(results => {
                    otherChannel.send(embedBuilder(true, true, false, false, true, false, false, results[0].media[0].gif.url, false, true, client, m));
                }).catch(console.error);
            });
        } else if (m.attachments.size > 0) {
            m.attachments.forEach(async attachment => {
                let url = attachment.url;
                otherChannel.send(embedBuilder(true, true, false, false, true, `${m.content}\n[Attachment URL](${url})`, false, url, false, true, client, m));
            });
        } else {
            msg = await otherChannel.send(embedBuilder(true, true, false, false, true, `${m.content}`, false, false, false, true, client, m));
            info = {
                userMessage: {
                    guildID: m.guild.id,
                    channelID: m.channel.id,
                    messageID: m.id
                },
                botMessage: {
                    guildID: msg.guild.id,
                    channelID: msg.channel.id,
                    messageID: msg.id
                }
            };

            client.userphone_message_Mapper.set(m.id, info);
        }
    });

    thatChannelCollector.on('collect', async m => {
        if (m.author.bot) return;
        let msg;

        if (m.content.toLowerCase() === 'ec') {
            endConnections(thisChannelCollector, thatChannelCollector, guildInfo, message, otherChannel, client);
        } else if (m.content.includes('https://tenor.com')) {
            const matches = m.content.match(/\bhttps?:\/\/\S+/gi);
            const lastDash = matches[0].lastIndexOf('-');
            const id = matches[0].substring(lastDash + 1, matches[0].length);

            matches.forEach((match) => {
                Tenor.Search.Find([id]).then(results => {
                    message.channel.send(embedBuilder(true, true, false, false, true, false, results[0].media[0].gif.url, false, true, client, m));
                }).catch(console.error);
            });
        } else if (m.attachments.size > 0) {
            m.attachments.forEach(async attachment => {
                let url = attachment.url;
                message.channel.send(embedBuilder(true, true, false, false, true, `${m.content}\n[Attachment URL](${url})`, false, url, false, true, client, m));
            });
        } else {
            msg = await message.channel.send(embedBuilder(true, true, false, false, true, `${m.content}`, false, false, false, true, client, m));
            info = {
                userMessage: {
                    guildID: m.guild.id,
                    channelID: m.channel.id,
                    messageID: m.id
                },
                botMessage: {
                    guildID: msg.guild.id,
                    channelID: msg.channel.id,
                    messageID: msg.id
                }
            };

            client.userphone_message_Mapper.set(m.id, info);
        }
    });

    setTimeout(() => {
        if (client.channel_Connected.has(guildInfo.channel.channelID) && client.channel_Connected.has(message.channel.id)) {
            thisChannelCollector.stop();
            thatChannelCollector.stop();
            client.channel_Connected.delete(guildInfo.channel.channelID);
            client.channel_Connected.delete(message.channel.id);
            message.channel.send(embedBuilder(true, false, false, false, false, `Time is up! The connection with \`${otherChannel.guild.name}\` ended!`, false, false, true, false, client, message));
            otherChannel.send(embedBuilder(true, false, false, false, false, `Time is up! The connection with \`${message.channel.guild.name}\` ended!`, false, false, true, false, client, message));
        }
    }, 900000);
};