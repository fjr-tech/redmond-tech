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

    static async getOwnerIdByFolderId(folder_id) {
        const sql = `SELECT owner_id FROM folders WHERE folder_id = ?`;

        const [rows] = await db.query(sql, [folder_id]);
        const owner_id = rows[0]?.owner_id;

        return owner_id;
    }

    // Returns all root folder IDs that a given account id has access (level 1 or greater) to
    static async getAccessibleRootFolderIds(account_id) {
        const sql = `SELECT folder_id FROM folder_permissions WHERE account_id = ? AND permission_level >= ?`;

        const [rows] = await db.query(sql, [account_id, 1]);
        
        const flatArray = (() => {
            let array = [];
            for (const row of rows) {
                array.push(row.folder_id);
            }
            return array;
        })();

        return flatArray;
    }

    static async getAccessibleRootFolders(account_id) {
        const sql = `
            SELECT 'folder' AS type, f.folder_id as id, f.folder_name as name, f.created_at, f.owner_id, fp.permission_level
            FROM folders f
            JOIN folder_permissions fp ON fp.folder_id = f.folder_id
            WHERE fp.account_id = ?
            AND fp.permission_level >= 1
            AND f.parent_folder_id IS NULL
        `;

        /*
            SELECT f.* -- select everything from folders table
            FROM folders f -- sets f as folders alias
            JOIN folder_permissions fp ON fp.folder_id = f.folder_id -- joins folder_permissions (also sets fp alias)
            -- Match a row in folder_permissions to a row in folders when both have the same folder_id
            -- there could be multiple fp.account_id entries per folder, so filtering is done later
            WHERE fp.account_id = ? -- filters for rows with the account id x
            AND fp.permission_level >= 1 -- and permission level equal to or greater than 1
            AND f.parent_folder_id IS NULL -- and is a root folder
        */

        const [rows] = await db.query(sql, [account_id]);
        return rows;
    }

    // Returns all contents of a folder (will not get contents of sub-folders)
    static async getFolderContents(folder_id) {
        const sql = `
            SELECT
                'folder' AS type,
                f.folder_id AS id,
                f.folder_name AS name,
                f.created_at AS created_at,
                NULL AS size_bytes,
                NULL AS mime_type
            FROM folders f
            WHERE f.parent_folder_id = ?

            UNION ALL

            SELECT
                'file' AS type,
                fi.file_id AS id,
                fi.original_name AS name,
                fi.created_at AS created_at,
                fi.size_bytes AS size_bytes,
                fi.mime_type AS mime_type
            FROM files fi
            WHERE fi.folder_id = ?
            ORDER BY created_at ASC
        `;

        const [rows] = await db.query(sql, [folder_id, folder_id]);
        return rows;
    }

    static async getFilesByFolderIdRecursive(folder_id) {
        let files = [];
        const folder_contents = await this.getFolderContents(folder_id);

        for (const resource of folder_contents) {
            if (resource.type === 'file') {
                files.push(resource);
            } else if (resource.type === 'folder') {
                const subFiles = await this.getFilesByFolderIdRecursive(resource.id);
                files.push(...subFiles); // use spread operator to flatten
            }
        }

        return files;
    }

    static async getFilePathsByFolderId(folder_id) {
        const sql = `
            SELECT
                f.folder_id AS id,
                'folder' AS type,
                NULL AS path,
                f.created_at AS created_at
            FROM folders f
            WHERE f.parent_folder_id = ?

            UNION ALL

            SELECT
                fi.file_id AS id,
                'file' AS type,
                fi.path AS path,
                fi.created_at AS created_at
            FROM files fi
            WHERE fi.folder_id = ?
            ORDER BY created_at ASC
        `;

        const [rows] = await db.query(sql, [folder_id, folder_id]);
        return rows;
    }

    static async getFilePathsByFolderIdRecursive(folder_id) {
        let file_paths = [];
        const folder_contents = await this.getFilePathsByFolderId(folder_id);

        for (const resource of folder_contents) {
            if (resource.type === 'file') {
                file_paths.push(resource.path);
            } else if (resource.type === 'folder') {
                const subFiles = await this.getFilePathsByFolderIdRecursive(resource.id);
                file_paths.push(...subFiles); // use spread operator to flatten
            }
        }

        return file_paths;
    }

    static async getRootFolderIdByFolderId(folder_id) {
        const sql = `SELECT parent_folder_id, owner_id FROM folders WHERE folder_id = ?`;
        const [rows] = await db.query(sql, [folder_id]);
        const parent_folder_id = rows[0]?.parent_folder_id;

        if (parent_folder_id === null) return rows[0]?.owner_id;

        // if not root folder, call method again
        return await this.getRootFolderIdByFolderId(parent_folder_id);
    }

    static async getRootFolderIdByFileId(file_id) {
        const sql = `SELECT folder_id FROM files WHERE file_id = ?`;

        const [rows] = await db.query(sql, [file_id]);
        const folder_id = rows[0]?.folder_id;

        const root_folder_owner = await this.getRootFolderIdByFolderId(folder_id);

        return root_folder_owner;
    }

    static async getRootFolderOwnerIdByFolderId(folder_id) {
        const sql = `SELECT parent_folder_id, owner_id FROM folders WHERE folder_id = ?`;
        const [rows] = await db.query(sql, [folder_id]);
        const parent_folder_id = rows[0]?.parent_folder_id;

        if (parent_folder_id === null) return rows[0]?.owner_id;

        // if not root folder, call method again
        return await this.getRootFolderOwnerIdByFolderId(parent_folder_id);
    }

    static async getRootFolderOwnerIdByFileId(file_id) {
        const sql = `SELECT folder_id FROM files WHERE file_id = ?`;

        const [rows] = await db.query(sql, [file_id]);
        const folder_id = rows[0]?.folder_id;

        const root_folder_owner = await this.getRootFolderOwnerIdByFolderId(folder_id);

        return root_folder_owner;
    }

    static async getFolderPermissionLevelByAccountId(account_id, folder_id) {
        const sql = `SELECT permission_level FROM folder_permissions WHERE account_id = ? AND folder_id = ?`;
        const [rows] = await db.query(sql, [account_id, folder_id]);
        const permission_level = rows[0]?.permission_level;

        return permission_level;
    }

    static async getFileData(file_id) {
        const sql = `SELECT * FROM files WHERE file_id = ?`;

        const [rows] = await db.query(sql, [file_id]);
        const file_data = rows[0];
        
        return file_data;
    }

    static async uploadFile(owner_id, folder_id, original_name, stored_name, path, mime_type, size_bytes) {
        const sql = `INSERT INTO files (owner_id, folder_id, original_name, stored_name, path, mime_type, size_bytes) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        await db.query(sql, [owner_id, folder_id, original_name, stored_name, path, mime_type, size_bytes]);
    }

    static async deleteFile(file_id) {
        const sql = `DELETE from files WHERE file_id = ?`;
        await db.query(sql, [file_id]);
    }

    static async deleteFolder(folder_id) {
        const sql = `DELETE from folders WHERE folder_id = ?`;
        await db.query(sql, [folder_id]);
    }

}

module.exports = RedFS;