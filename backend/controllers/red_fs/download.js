// Get root folders accessible by a given account

const download = require('../../services/red_fs/download.js');
module.exports = async (req, res) => {
    try {
        const { file_id } = req.params;

        const {file_path, file_name} = await download(req.account_id, file_id);

        // res.download automatically sends a 200 status code
        res.download(file_path, file_name, err => {
            if (err) {
                res.status(500).json({ message: 'Download failed' });
            }
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}