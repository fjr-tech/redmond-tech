// Move a resource to another location

const move_file = require('../../services/red_fs/move_file.js');
const move_folder = require('../../services/red_fs/move_folder.js');


module.exports = async (req, res) => {
    try {
        const account_id = req.account_id;

        const {type, resource_id, new_parent_folder} = req.body;

        if (type === 'folder') await move_folder(account_id, resource_id, new_parent_folder);
        else if (type === 'file') await move_file(account_id, resource_id, new_parent_folder);

        res.status(200).json({ message: "Resource moved!" });

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}