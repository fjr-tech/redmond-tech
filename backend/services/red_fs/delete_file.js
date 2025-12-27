const fs = require('fs').promises;
const path = require('path');

const RedFSModel = require('../../models/red_fs.js');

module.exports = async (account_id, file_id) => {
    // Must have permission level of 2 or greater to delete a resource
    const root_folder = await RedFSModel.getRootFolderIdByFileId(file_id);
    if (await RedFSModel.getFolderPermissionLevelByAccountId(account_id, root_folder) < 2) {
        const err = new Error("Forbidden");
        err.status = 403;
        throw err;
    }

    // Delete file
    const file_data = await RedFSModel.getFileData(file_id);
    const file_path = file_data.path;

    try {
        await fs.unlink(file_path);
    } catch (err) {
        // Don't report an error if 'error no entry' error is thrown
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    // Delete on DB
    await RedFSModel.deleteFile(file_id);
}