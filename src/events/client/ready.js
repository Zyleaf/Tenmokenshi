const updateStatus = require('../../snippets/readyEvent/updateStatus');

module.exports = async (client) => {
    console.log('Bot online!');
    updateStatus(client);
    client.user.setStatus('dnd');
};