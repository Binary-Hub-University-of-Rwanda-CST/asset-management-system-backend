const { Client } = require('pg');
require('dotenv').config();
const dbConnection = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
module.exports = dbConnection;