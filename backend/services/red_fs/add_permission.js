const RedFSModel = require('../../models/red_fs.js');

module.exports = async (account_id, folder_id, target_account_id, permission_level) => {
    // account_id - the account performing the operation
    // target_account_id - the account having the permissions applied to


    // Ensure valid folder id
    if (!await RedFSModel.isValidFolderId(folder_id)) {
        const err = new Error("Invalid folder id");
        err.status = 400;
        throw err;
    }

    // Enforce permissions only be set on a root folder
    if (!await RedFSModel.isRootFolder(folder_id)) {
        const err = new Error("Cannot set permissions on non-root folders");
        err.status = 403;
        throw err;
    }

    // Ensure account has permissions to set add permission -- must be a folder admin
    if (await RedFSModel.getFolderPermissionLevelByAccountId(account_id, folder_id) < 3) {
        const err = new Error("Must be folder admin to change permissions");
        err.status = 403;
        throw err;
    }

    if (!Number.isInteger(permission_level) || permission_level < 1 || permission_level > 3) {
        const err = new Error("Invalid permission level");
        err.status = 400;
        throw err;
    }

    RedFSModel.addPermission(folder_id, target_account_id, permission_level);

}