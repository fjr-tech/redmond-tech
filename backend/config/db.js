// This file contains the DB connection pool
// All files that require DB access should require this file

const mysql = require('mysql2/promise.js');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    // max connections that can be open
    connectionLimit: 4,
    // controls if a request should wait if no connections are available
    waitForConnections: true,
    // max number of queued requests before throwing an error
    queueLimit: 8

});

module.exports = pool;