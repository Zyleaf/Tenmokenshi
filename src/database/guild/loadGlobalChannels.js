module.exports = loadGlobalChannels = (client, sql) => {
    sql.query('SELECT * FROM guild_Chat_Channels;', (error, results) => {
        if (error) throw error;
        results.map((result) => {
            client.guild_Chat_Channels.set(result.guild_id, result.channel_id);
        });
    });
    // Load the global chat channels
};