const RedFSModel = require('../../models/red_fs.js');

module.exports = async (account_id, file_id, new_parent_folder) => {
    if (!file_id || !new_parent_folder) {
        const err = new Error("Bad request.");
        err.status = 400;
        throw err;
    }

    // Ensure the account has a permission level of at least 2
    const rootFolderOld = await RedFSModel.getRootFolderIdByFileId(file_id);
    if (await RedFSModel.getFolderPermissionLevelByAccountId(account_id, rootFolderOld) < 2) {
        const err = new Error("Forbidden");
        err.status = 403;
        throw err;
    }

    const rootFolderNew = await RedFSModel.getRootFolderIdByFolderId(new_parent_folder);

    // Forbid moving across root folders
    if (rootFolderOld !== rootFolderNew) {
        const err = new Error("Cross-root movement is forbidden");
        err.status = 403;
        throw err;
    }

    await RedFSModel.moveFile(file_id, new_parent_folder);
}