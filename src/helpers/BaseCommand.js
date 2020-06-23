const Discord = require('discord.js');
const humanizeDuration = require('humanize-duration');

module.exports = class BaseCommand {
    constructor(client, message, permissions, args, parsedArgs, cooldown, usage) {
        this.client = client,
        this.message = message,
        this.permissions = permissions,
        this.args = args,
        this.parsedArgs = parsedArgs
        this.cooldown = cooldown;
        this.usage = usage;
    }

    checkPerms = () => {
        if (this.permissions.length === 0 || this.message.member.hasPermission([this.permissions])) {
            this.checkArguments();
        } else {
            this.message.channel.send(this.embedBuilder(false, true, 'Missing permission(s)', false, false, `\`You require the ${this.permissions.join(', ')} permission(s)!\``, false, false, true, true));
        }
    }

    checkArguments = () => {   
        if (this.usage.length !== 0 && this.args.length !== this.usage.length) {
            this.message.channel.send(`This command requires <${this.usage.join(', ')}> as its arguments!`);
        } else {
            this.checkCooldown();
        }
    }

    checkCooldown = () => {
        if (this.client.cooldown.has(this.message.author.id)) {
            const usedTime = this.client.cooldown.get(this.message.author.id);
            const remainingTime = humanizeDuration(((Date.now() - usedTime) - this.cooldown), { units: ['s'], round: true });
            this.message.channel.send(this.embedBuilder(false, true, 'Take a break!', false, false, `Please wait \`${remainingTime}\` before using another command!`, false, false, true, true));
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

        if (color) builtEmbed.setColor();
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