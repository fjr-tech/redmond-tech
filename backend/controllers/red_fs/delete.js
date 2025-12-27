// Delete folders and files given the resource type and id

const delete_file = require('../../services/red_fs/delete_file.js');
const delete_folder = require('../../services/red_fs/delete_folder.js');

module.exports = async (req, res) => {
    try {
        const { type, resource_id } = req.body;

        if (type === 'file') {
            await delete_file(req.account_id, resource_id);
        } else if (type === 'folder') {
            await delete_folder(req.account_id, resource_id);
        }


        res.status(201).json({ message: `Resource deleted` });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}