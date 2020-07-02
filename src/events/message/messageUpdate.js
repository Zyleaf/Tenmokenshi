const messageEdits = require('../../snippets/userphoneCommand/messageEdits');
const globalChatEdits = require('../../snippets/messageEvent/globalChatEdits');

module.exports = async (client, oldMessage, newMessage) => {
    messageEdits(client, oldMessage, newMessage);
    globalChatEdits(client, oldMessage, newMessage);
};