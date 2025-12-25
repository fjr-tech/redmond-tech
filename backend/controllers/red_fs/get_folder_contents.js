// Get root folders accessible by a given account

const getResources = require('../../services/red_fs/get_resources.js');
module.exports = async (req, res) => {
    try {
        // which folder to fetch from
        const folder_id = req.params.folder_id;

        const resources = await getResources(folder_id);

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