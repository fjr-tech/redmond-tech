// JS Model that interacts with the DB for all RedFS functionality

const db = require('../config/db.js');

class RedFS {
    static async createFolder(parent_folder_id, owner_id, folder_name, path) {
        const sql = `INSERT INTO folders (parent_folder_id, owner_id, folder_name, path) VALUES (?, ?, ?, ?)`;

        await db.query(sql, [parent_folder_id, owner_id, folder_name, path]);
        
    }

    static async uploadFile(metadata) {
        console.log(metadata)
    }

    static async deleteFile() {
        
    }
}

module.exports = RedFS;