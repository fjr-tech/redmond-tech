const fs = require('fs').promises;
const path = require('path');

const RedFSModel = require('../../models/red_fs.js');

module.exports = async (account_id, folder_id) => {
    // Must have permission level of 2 or greater to delete a resource
    const root_folder = await RedFSModel.getRootFolderIdByFolderId(folder_id);
    if (await RedFSModel.getFolderPermissionLevelByAccountId(account_id, root_folder) < 2) {
        const err = new Error("Forbidden");
        err.status = 403;
        throw err;
    }

    // Delete all folders within file
    const file_paths = await RedFSModel.getFilePathsByFolderIdRecursive(folder_id);

    for (let i = 0; i < file_paths.length; i++) {
        const filePath = file_paths[i];

        try {
            await fs.unlink(filePath);
        } catch (err) {
            // Don't report an error if 'error no entry' error is thrown
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
    }

    // Delete on DB
    await RedFSModel.deleteFolder(folder_id);
}