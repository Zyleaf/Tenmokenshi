const Discord = require('discord.js');
const humanizeDuration = require('humanize-duration');

module.exports = class BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, requiredArgs, cooldown, usage, name, sql) {
        this.client = client;
        this.message = message;
        this.permissions = permissions;
        this.args = args;
        this.parsedArgs = parsedArgs;
        this.requiredArgs = requiredArgs;
        this.cooldown = cooldown;
        this.usage = usage;
        this.name = name;
        this.sql = sql;
    }

    checkPerms = () => {
        if (this.permissions.length === 0 || this.message.member.hasPermission([this.permissions])) {
            this.checkArguments();
        } else {
            this.message.channel.send(this.embedBuilder(true, true, false, false, false, `**You need the \`${this.permissions.join(', ')}\` permission(s)!**`, false, false, false, false));
        }
    }

    checkArguments = () => {
        if (this.requiredArgs) {
            if (this.args.length !== this.usage.length || this.args[0].slice(1).toUpperCase() === this.name.toUpperCase()) {
                this.message.channel.send(this.embedBuilder(true, true, false, false, false, `**The valid arguments are <${this.usage.join(', ')}>**`, false, false, false, false));
            } else {
                this.checkCooldown();
            }
        } else {
            this.checkCooldown();
        }
    }

    checkCooldown = () => {
        if (this.client.cooldown.has(this.message.author.id)) {
            const usedTime = this.client.cooldown.get(this.message.author.id);
            const remainingTime = humanizeDuration(((Date.now() - usedTime) - this.cooldown), { units: ['s'], round: true });
            this.message.channel.send(this.embedBuilder(true, true, false, false, false, `**Please wait ${remainingTime} before using another command!**`, false, false, false, false));
        } else {
            this.run();
            this.client.cooldown.set(this.message.author.id, Date.now());
            setTimeout(() => {
                this.client.cooldown.delete(this.message.author.id);
            }, this.cooldown);
        }
    }

    run = async (client, message, permissions, args, parsedArgs) => {
        this.message.channel.send(`This is just the base command!`);
    }

    embedBuilder = (color, author, title, url, thumbnail, description, fields, imageURL, timeStamp, footer) => {
        const builtEmbed = new Discord.MessageEmbed();

        let user_embed_color = this.client.user_Embed_Settings.get(this.message.author.id) ? this.client.user_Embed_Settings.get(this.message.author.id) :  '#000000';
        
        if (color) builtEmbed.setColor(user_embed_color);
        if (author) builtEmbed.setAuthor(this.message.author.username, this.message.author.avatarURL());
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
        if (footer) builtEmbed.setFooter(`Requested by ${this.message.author.username}`, this.message.guild.iconURL());

        return builtEmbed;
    }

    randomInt = (min, max) => {
        return Math.random() * (max - min) + min;
    }
}