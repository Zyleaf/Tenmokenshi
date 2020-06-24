module.exports = loadPrefixes = (client, sql) => {
    sql.query('SELECT * FROM guild_Prefixes', (error, results) => {
        if (error) throw error;
        results.map((result) => {
            client.prefixes.set(result.guild_id, result.guild_prefix);
        });
    });
};