const path = require('path');
const RedFSModel = require('../../models/red_fs.js');
const AccountsModel = require('../../models/accounts.js');

// Service to create a folder
module.exports = async (account_id, folder_name, parent_folder_id) => {
    
    // ** Add resource name validation later ** (seriously)
    // For now, assume folder name is okay

    const folder_path = path.join(process.env.STORAGE_LOCATION, JSON.stringify(account_id));

    // Get root folder owner -- all subfolders created by any editor is owned by the root owner
    let folder_owner_id;

    if (parent_folder_id != null) {
        folder_owner_id = await RedFSModel.getOwnerIdByFolderId(parent_folder_id);
    } else {
        folder_owner_id = account_id;
    }

    await RedFSModel.createFolder(parent_folder_id, folder_owner_id, folder_name, folder_path)

}