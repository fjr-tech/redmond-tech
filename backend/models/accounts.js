// This model will be the sole JS file that interacts with the DB for accounts purposes
const db = require('../config/db.js');

class AccountsModel {
    static async createAccount(username, password) {
        const sql = `INSERT INTO accounts (username, password) VALUES (?, ?)`;

        await db.query(sql, [username, password]);
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