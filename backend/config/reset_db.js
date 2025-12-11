const mysql = require('mysql2/promise');
require('dotenv').config();
const prompt = require('prompt-sync')({ sigint: true });

async function deleteDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    await connection.query(`DROP DATABASE IF EXISTS \`${process.env.DB_NAME}\``);
    await connection.end();
}

(async () => {
    let answer;

    while (true) {
        answer = prompt("Delete entire database? (y/n): ").trim().toLowerCase();
        if (answer === "y") {
            await deleteDatabase();
            require('./init_db.js');
            console.log("Database deleted.");
            break;
        }
        if (answer === "n") {
            console.log("Canceled.");
            break;
        }
    }
})();