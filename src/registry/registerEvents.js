const readdir = require('readdir-plus');

module.exports = registerEvents = (client) => {
    readdir('src/events', (error, files) => {
        if (error) throw error;

        for (const file of files) {
            let eventName = file.basename;
            try {
                let eventModule = require(file.path);
                client.on(eventName, eventModule.bind(null, client));
            } catch (error) {
                console.log(error);
            }
        }
    });
};
