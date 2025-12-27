const RedFSModel = require('../../models/red_fs.js');

module.exports = async (account_id, file_id) => {
    // Ensure account has access to file
    const root_folder = await RedFSModel.getRootFolderIdByFileId(file_id);
    if (await RedFSModel.getFolderPermissionLevelByAccountId(account_id, root_folder) < 1) {
        const err = new Error("Forbidden");
        err.status = 403;
        throw err;
    }

    const file_data = await RedFSModel.getFileData(file_id);
    const return_data = {
        file_path: file_data.path,
        file_name: file_data.original_name
    }

    return return_data;
}