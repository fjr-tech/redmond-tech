// This model will be the sole JS file that interacts with the DB for accounts purposes
const db = require('../config/db.js');

class AccountsModel {
    static async createAccount(username, password) {
        const sql = `INSERT INTO accounts (username, password) VALUES (?, ?)`;

        await db.query(sql, [username, password]);
    }

    static async login(username, session_token, expirationTimeStamp) {
        const sql = `UPDATE accounts SET session_token = ?, session_expires_at = ? WHERE username = ?`;

        await db.query(sql, [session_token, expirationTimeStamp, username]);
    }

    static async logout(username) {
        
    }

    static async isValidUsernameAndPassword(username, password) {
        const sql = `SELECT * FROM ACCOUNTS WHERE username = ? AND password = ?`;
        
        const [rows] = await db.query(sql, [username, password]);


        return rows.length > 0;
    }

    static async getAccountIDByUsername(username) {
        const sql = `SELECT id FROM accounts WHERE (username) = (?)`;

        /*
        db.query(sql, [username])
        returns an array with rows, and metadata

        using [rows] sets the first element of the arr to const rows
        */
        const [rows] = await db.query(sql, [username]);
        
        // rows[0] contains id property only
        return rows.length > 0 ? rows[0].id : null;
    }
}

module.exports = AccountsModel;