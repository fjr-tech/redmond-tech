const RedFSModel = require('../../models/red_fs.js');

module.exports = async (folder_id) => {
    const root_folders = await RedFSModel.getFolderContents(folder_id);

    return root_folders;
}