module.exports = loadEmbedColors = (client, sql) => {
    sql.query('SELECT * FROM user_Embed_Settings;', (error, results) => {
        if (error) throw error;
        results.map((result) => {
            client.user_Embed_Settings.set(result.user_id, result.user_embed_color);
        });
    });
    // Load users embed color
};