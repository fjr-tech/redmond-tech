// Get root folders accessible by a given account

const getRootFolders = require('../../services/red_fs/get_root_folders.js');
module.exports = async (req, res) => {
    try {
        const resources = await getRootFolders(req.account_id);

        res.status(200).json({
            data: {
                resources: resources
            },
            message: "Data retrieved successfully!"
        });

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}