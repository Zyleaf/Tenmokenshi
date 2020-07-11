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

const embedBuilder = (color, author, title, url, thumbnail, description, fields, imageURL, timeStamp, footer, client, message) => {
    const builtEmbed = new Discord.MessageEmbed();

    let user_embed_color = client.user_Embed_Settings.get(message.author.id) ? client.user_Embed_Settings.get(message.author.id) : '#0bff9e';

    if (color) builtEmbed.setColor(user_embed_color);
    if (author) builtEmbed.setAuthor(message.author.tag, message.author.avatarURL());
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

module.exports = globalChat = async (client, message) => {
    if (client.guild_Chat_Channels.has(message.guild.id)) {
        if (message.channel.id === client.guild_Chat_Channels.get(message.guild.id)) {
            if (message.author.id === '526449871671001098') {
                for (const [g, c] of client.guild_Chat_Channels) {
                    if (g === message.guild.id) {
                        continue;
                    } else {
                        client.global_message_cooldown.set(message.author.id, true);
                        let guild = message.client.guilds.cache.get(g);
                        if (!guild) continue;
                        let channel = message.client.guilds.cache.get(guild.id).channels.cache.get(c);

                        if (message.content.includes('https://tenor.com')) {
                            const matches = message.content.match(/\bhttps?:\/\/\S+/gi);
                            const lastDash = matches[0].lastIndexOf('-');
                            const id = matches[0].substring(lastDash + 1, matches[0].length);

                            matches.forEach((match) => {
                                Tenor.Search.Find([id]).then((results) => {
                                    channel.send(embedBuilder(true, true, false, false, true, false, false, results[0].media[0].gif.url, false, true, client, message));
                                }).catch(console.error);
                            });
                        } else if (message.attachments.size > 0) {
                            message.attachments.forEach(async (attachment) => {
                                let url = attachment.url;
                                channel.send(embedBuilder(true, true, false, false, true, `${message.content}\n[Attachment URL](${url})`, false, url, false, true, client, message));
                            });
                        } else {
                            channel.send(embedBuilder(true, true, false, false, true, `${message.content}`, false, false, false, true, client, message));
                        }
                    }
                }
            } else {
                if (client.global_message_cooldown.get(message.author.id) === true) {
                    const msg = await message.channel.send(embedBuilder(true, false, false, false, false, `**${message.author.tag}, please wait before sending another global message!**`, false, false, false, false, client, message));
                    setTimeout(() => {
                        msg.delete();
                    }, 2000);
                } else {
                    for (const [g, c] of client.guild_Chat_Channels) {
                        if (g === message.guild.id) {
                            continue;
                        } else {
                            client.global_message_cooldown.set(message.author.id, true);
                            let guild = message.client.guilds.cache.get(g);
                            if (!guild) continue;
                            let channel = message.client.guilds.cache.get(guild.id).channels.cache.get(c);

                            if (message.content.includes('https://tenor.com')) {
                                const matches = message.content.match(/\bhttps?:\/\/\S+/gi);
                                const lastDash = matches[0].lastIndexOf('-');
                                const id = matches[0].substring(lastDash + 1, matches[0].length);

                                matches.forEach((match) => {
                                    Tenor.Search.Find([id]).then((results) => {
                                        channel.send(embedBuilder(true, true, false, false, true, false, false, results[0].media[0].gif.url, false, true, client, message));
                                    }).catch(console.error);
                                });
                            } else if (message.attachments.size > 0) {
                                message.attachments.forEach(async (attachment) => {
                                    let url = attachment.url;
                                    channel.send(embedBuilder(true, true, false, false, true, `${message.content}\n[Attachment URL](${url})`, false, url, false, true, client, message));
                                });
                            } else {
                                channel.send(embedBuilder(true, true, false, false, true, `${message.content}`, false, false, false, true, client, message));
                            }
                        }
                    }

                    setTimeout(() => {
                        client.global_message_cooldown.set(message.author.id, false);
                    }, 3000);
                }
            }
        }
    }
};