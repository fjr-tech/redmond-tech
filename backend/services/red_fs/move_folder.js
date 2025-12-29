const RedFSModel = require('../../models/red_fs.js');

// ONLY MOVEMENT WITHIN THE FOLDER IS ALLOWED (no cross-root movement)

// To do:
    // Add resource protection

module.exports = async (account_id, folder_id, new_parent_folder) => {
    
    if (folder_id == null || new_parent_folder == null) {
        const err = new Error("Moving folders to or from root is not allowed.");
        err.status = 400;
        throw err;
    }

    const rootFolder = await RedFSModel.getRootFolderIdByFolderId(folder_id);
    const destinationRoot = await RedFSModel.getRootFolderIdByFolderId(new_parent_folder);

    if (!rootFolder || !destinationRoot) {
        const err = new Error("Folder not found");
        err.status = 404;
        throw err;
    }

    // Ensure the account has a permission level of at least 2
    if (await RedFSModel.getFolderPermissionLevelByAccountId(account_id, rootFolder) < 2) {
        const err = new Error("Forbidden");
        err.status = 403;
        throw err;
    }

    // This code has been commented out because it has been decided to disallow cross-root-folder movement
    /*
    const root_folder_old = folder_id === null ? null: await RedFSModel.getRootFolderIdByFolderId(folder_id);
    const folder_owner = folder_id === null ? null: await RedFSModel.getOwnerIdByFolderId(folder_id);
    
    // If new_parent_folder = null, root_folder_new = null
    const root_folder_new = new_parent_folder === null ? null: await RedFSModel.getRootFolderIdByFolderId(new_parent_folder);
    const folder_owner_new = root_folder_new === null ? null: await RedFSModel.getOwnerIdByFolderId(root_folder_new);
    
    // If the movement isn't within the same root folder
    if (root_folder_new !== root_folder_old) {
        // You must own both the folder and {you must own the new parent folder or there is no new parent folder ie. root}
        if (folder_owner !== account_id || (folder_owner_new !== account_id || new_parent_folder !== null)) {
            const err = new Error("Forbidden");
            err.status = 403;
            throw err;
        }

    }

    // If the root folder changes
    // ie. moving to a new root folder, turning a folder into a root folder, turning a root folder into a folder
    if (root_folder_new !== root_folder_old) {
        // If the root folder owner is not the account attempting the move OR
            // ie. the user doesn't own the folder he/she is trying to move
        // If the destination is not root and the destination root folder owner is not the account attempting the move
            // ie. moving to another sub-folder within a different root folder that the user doesn't own 
        if (
            folder_owner !== account_id ||
            (root_folder_new !== null && folder_owner_new !== account_id)
        ) {
            const err = new Error("Forbidden");
            err.status = 403;
            throw err;
        }
    }
    */

    // Forbid the folder and destination folder from having different root folders
    if (rootFolder !== destinationRoot) {
        const err = new Error("Cross-root movement is forbidden");
        err.status = 400;
        throw err;
    }

    // Move the folder
    await RedFSModel.moveFolder(folder_id, new_parent_folder);
    
}