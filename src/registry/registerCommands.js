const readdir = require('readdir-plus');

module.exports = registerCommands = (client) => {
    readdir('src/commands', (error, files) => {
        if (error) throw error;

        for (const file of files) {
            let command = require(file.path);
            let { aliases } = command;
            
            client.commands.set(command.name.toUpperCase(), command);
            if (aliases.length !== 0) { aliases.map(alias => client.aliases.set(alias.toUpperCase(), command)); };
        }
    });
};
