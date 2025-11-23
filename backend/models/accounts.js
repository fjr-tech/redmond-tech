// This model will be the sole JS file that interacts with the DB for accounts purposes
const db = require('../config/db.js');

class AccountsModel {
    static async createAccount(username, password) {
        const sql = `INSERT INTO accounts (username, password) VALUES (?, ?)`;

        await db.query(sql, [username, password]);
    }

    static async login(username, session_token, created_at, expires_at) {
        const sql = `INSERT INTO sessions (user_id, token, created_at, expires_at) VALUES (?, ?, ?, ?)`;

        const user_id = await this.getAccountIDByUsername(username);

        await db.query(sql, [user_id, session_token, created_at, expires_at]);
    }

    static async logout(id) {
        const sql = `DELETE FROM sessions WHERE user_id = ?`;

        await db.query(sql, [id]);
    }

    static async isValidUsernameAndPassword(username, password) {
        const sql = `SELECT * FROM accounts WHERE username = ? AND password = ?`;
        
        const [rows] = await db.query(sql, [username, password]);

        return rows.length > 0;
    }

    static async getSession(session_token) {
        const sql = `SELECT * FROM sessions WHERE token = ?`;

        const [rows] = await db.query(sql, [session_token]);

        return rows?.[0];
    }

    static async isValidSessionToken(session_token) {
        const session = await this.getSession(session_token);
        return !!session;
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

// Always import the whole class to keep this keyword bound to class