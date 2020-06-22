module.exports = updateStatus = async (client) => {
    client.user.setActivity('with myself!', { type: 'PLAYING' });
};