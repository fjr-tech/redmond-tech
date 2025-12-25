const RedFSModel = require('../../models/red_fs.js');
const AccountsModel = require('../../models/accounts.js');

module.exports = async (account_id) => {
    const root_folders = await RedFSModel.getAccessibleRootFolders(account_id);

    return root_folders;
}