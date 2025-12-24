// This model will be the sole JS file that interacts with the DB for accounts purposes
const db = require('../config/db.js');

class AccountsModel {
    static async createAccount(username, password, config) {
        const privilege_level = config?.privilege_level || 1; // 1 = default user

        const sql = `INSERT INTO accounts (username, password, privilege_level) VALUES (?, ?, ?)`;

        await db.query(sql, [username, password, privilege_level]);
    }

    static async login(username, session_token, created_at, expires_at) {
        const sql = `INSERT INTO sessions (account_id, token, created_at, expires_at) VALUES (?, ?, ?, ?)`;

        const account_id = await this.getAccountIdByUsername(username);

        await db.query(sql, [account_id, session_token, created_at, expires_at]);
    }

    static async logout(account_id) {
        const sql = `DELETE FROM sessions WHERE account_id = ?`;

        await db.query(sql, [account_id]);
    }

    static async isValidUsernameAndPassword(username, password) {
        const sql = `SELECT * FROM accounts WHERE username = ? AND password = ?`;
        
        const [rows] = await db.query(sql, [username, password]);

        return rows.length > 0;
    }

    static async getSession(session_token) {
        const sql = `SELECT * FROM sessions WHERE token = ?`;

        const [rows] = await db.query(sql, [session_token]);

        return rows?.[0] || null;
    }

    static async getPrivilegeLevelByAccountId(account_id) {
        const sql = `SELECT privilege_level FROM accounts WHERE id = ?`;

        const [rows] = await db.query(sql, [account_id]);

        return rows?.[0] || null;
    }

    static async getPrivilegeLevelBySession(session_token) {
        const session = await this.getSession(session_token);
        if (!session) return;

        const account_id = session.account_id;

        return await this.getPrivilegeLevelByAccountId(account_id);

    }

    static async isValidSessionToken(session_token) {
        const session = await this.getSession(session_token);
        return !!session;
    }

    static async getAccountIdByUsername(username) {
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