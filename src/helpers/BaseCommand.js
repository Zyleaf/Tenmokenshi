module.exports = class BaseCommand {
    constructor(client, message, permissions, args, parsedArgs) {
        this.client = client,
        this.message = message,
        this.permissions = permissions,
        this.args = args,
        this.parsedArgs = parsedArgs
    }

    checkAndRun = () => {
        if (this.permissions.length === 0) {
            this.run();
        } else if (this.message.member.hasPermission([this.permissions])) {
            this.run();
        } else {
            this.message.channel.send(`You require the \`${this.permissions.join(', ')} permission(s)!\``);
        }
    }

    run = async (client, message, permissions, args, parsedArgs) => {
        this.message.channel.send(`This is just the base command!`);
    };
}