// JS Model that interacts with the DB for all RedFS functionality

const db = require('../config/db.js');

class RedFS {
    static async createFolder(parent_folder_id, owner_id, folder_name, path) {
        const sql_folder = `INSERT INTO folders (parent_folder_id, owner_id, folder_name, path) VALUES (?, ?, ?, ?)`;
        
        const [metadata] = await db.query(sql_folder, [parent_folder_id, owner_id, folder_name, path]);
        // equivalent to const result = response[0]; - [0] - metadata, [1] - fields

        const folder_id = metadata.insertId;

        const sql_folder_permissions = `INSERT INTO folder_permissions (folder_id, account_id, permission_level) VALUES (?, ?, ?)`;
        await db.query(sql_folder_permissions, [folder_id, owner_id, 4]);
        
    }

    static async getFolderOwnerId(folder_id) {
        const sql = `SELECT owner_id FROM folders WHERE folder_id = ?`;

        const [rows] = await db.query(sql, [folder_id]);
        const owner_id = rows[0]?.owner_id;

        return owner_id;
    }

    static async uploadFile(metadata) {
        console.log(metadata)
    }

    static async deleteFile() {
        
    }
}

module.exports = RedFS;