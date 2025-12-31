// Get root folders accessible by a given account

const { permission } = require('node:process');
const getPermissions = require('../../services/red_fs/get_permissions.js');
module.exports = async (req, res) => {
    try {
        // which folder to fetch from
        const folder_id = req.params.folder_id;
        const account_id = req.account_id;

        const permission_data = await getPermissions(account_id, folder_id);

        res.status(200).json({
            data: {
                permission_data: permission_data
            },
            message: "Data retrieved successfully!"
        });

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}