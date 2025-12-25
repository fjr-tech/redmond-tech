const RedFSModel = require('../../models/red_fs.js');
const AccountsModel = require('../../models/accounts.js');

module.exports = async (owner_id, folder_id, original_name, stored_name, path, mime_type, size) => {
    //stored_name, path, mime_type, size_bytes

    await RedFSModel.uploadFile(owner_id, folder_id, original_name, stored_name, path, mime_type, size);

}