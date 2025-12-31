const RedFSModel = require('../../models/red_fs.js');

module.exports = async (account_id, folder_id) => {
    // Ensure valid folder id
    if (!await RedFSModel.isValidFolderId(folder_id)) {
        const err = new Error("Invalid folder id");
        err.status = 400;
        throw err;
    }

    // Enforce folder_id refers to a root folder
    if (!await RedFSModel.isRootFolder(folder_id)) {
        const err = new Error("Permissions cannot be associated with non-root folders");
        err.status = 403;
        throw err;
    }

    // Account must have permission level of at least 1 to access permission data
    if (await RedFSModel.getFolderPermissionLevelByAccountId(account_id, folder_id) < 1) {
        const err = new Error("Must have read permission to access permission data");
        err.status = 403;
        throw err;
    }

    const permission_data = await RedFSModel.getAllAccountsByFolderPermissionLevel(folder_id, 1);

    return permission_data;
}