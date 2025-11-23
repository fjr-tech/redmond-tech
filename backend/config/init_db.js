// Creates and initialises database for later use

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise.js'); // use promise api rather than callback

// Since this file will be run separately from the main app, .env must be required
require('dotenv').config();

(async () => {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        const DB_NAME = process.env.DB_NAME;
        await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
        await db.query(`USE ${DB_NAME}`);

        // Set up table for accounts
        const accountsSchemaPath = path.join(__dirname, '../schemas/accounts.sql');
        const accountsSchema = fs.readFileSync(accountsSchemaPath, 'utf8');
        await db.query(accountsSchema);

        // Set up table for sessions
        const sessionsSchemaPath = path.join(__dirname, '../schemas/sessions.sql');
        const sessionsSchema = fs.readFileSync(sessionsSchemaPath, 'utf8');
        await db.query(sessionsSchema);

        // Close connection
        console.log(`Database '${DB_NAME}' initialised successfully.`);
        await db.end(); // Close the connection

    } catch (error) {
        console.error('Error initializing database:', error);
    }
})();