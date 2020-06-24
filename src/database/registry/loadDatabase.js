const dotenv = require('dotenv').config();
const mysql = require('mysql');
const sql = mysql.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE });
const loadPrefixes = require('../guild/loadPrefixes');

module.exports = loadDatabase = async (client) => {
    sql.connect(() => console.log('Connected to the DB!'));
    await loadPrefixes(client, sql);
};