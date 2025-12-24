const path = require('path');
const RedFSModel = require('../../models/red_fs.js');

// Service to create a folder
module.exports = async (account_id, folder_name, parent_folder_id) => {
    
    // ** Add resource name validation later ** (seriously)
    // For now, assume folder name is okay

    const folder_path = path.join(process.env.STORAGE_LOCATION, account_id);

    await RedFSModel.createFolder(parent_folder_id, account_id, folder_name, folder_path)

}