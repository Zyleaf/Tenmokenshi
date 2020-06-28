const dotenv = require('dotenv').config();
const mysql = require('mysql');
const sql = mysql.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE });
const loadPrefixes = require('../guild/loadPrefixes');
const loadEmbedColors = require('../user/loadEmbedColors');
const loadGlobalChannels = require('../guild/loadGlobalChannels'); 

module.exports = loadDatabase = async (client) => {
    sql.connect(() => console.log('Connected to the DB!'));
    await loadPrefixes(client, sql);
    await loadEmbedColors(client, sql);
    await loadGlobalChannels(client, sql);
};