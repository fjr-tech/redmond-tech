// Creates and initialises database for later use

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise.js'); // use promise api rather than callback

const prompt = require('prompt-sync')({sigint: true});
const validate_credential_specs = require('../utils/accounts/validate_credential_specs.js');

// Since this file will be run separately from the main app, .env must be required
require('dotenv').config();

(async () => {
    try {

        // Create DB connection
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        // Set up DB
        const DB_NAME = process.env.DB_NAME;
        await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
        await db.query(`USE ${DB_NAME}`);

        // Set up all tables
        const table_paths = [
            '../schemas/accounts.sql',
            '../schemas/sessions.sql',

            '../schemas/folders.sql',
            '../schemas/folder_permissions.sql',
            '../schemas/files.sql'
        ];

        for (const table_path of table_paths) {
            const schemaPath = path.join(__dirname, table_path);
            const schema = fs.readFileSync(schemaPath, 'utf8');
            await db.query(schema);
        }

        // Set up super user
        let SUPER_USER = process.env.SUPER_USER || null;
        let SUPER_PASSWORD = process.env.SUPER_PASSWORD || null;

        if ((await db.query(`SELECT * FROM accounts WHERE username = ?`, [SUPER_USER]))?.[0].length === 0) {
            while (!SUPER_USER) {
                const input = prompt("Enter SUPER_USER (username): ").trim();
                if (validate_credential_specs.validateUsername(input)) {
                    if (prompt("Are you sure? (y/n) ").trim() === 'y') {
                        SUPER_USER = input;
                    }
                }
            }

            while (!SUPER_PASSWORD) {
                const input = prompt("Enter SUPER_PASSWORD (password): ").trim();
                if (validate_credential_specs.validatePassword(input)) {
                    if (prompt("Are you sure? (y/n) ").trim() === 'y') {
                        SUPER_PASSWORD = input;
                    }
                }
            }

            await db.query(`INSERT INTO accounts (username, password, permission_level) VALUES (?, ?, ?)`, [SUPER_USER, SUPER_PASSWORD, 3]);
        }

        // Close connection
        console.log(`Database '${DB_NAME}' initialised successfully.`);
        await db.end(); // Close the connection

    } catch (error) {
        console.error('Error initializing database:', error);
    }
})();