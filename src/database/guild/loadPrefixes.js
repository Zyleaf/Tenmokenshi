module.exports = loadPrefixes = (client, sql) => {
    sql.query('SELECT * FROM guild_Prefixes', (error, results) => {
        console.log(results);
    });
};