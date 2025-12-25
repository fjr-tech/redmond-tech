// Business logic - updating DB with metadata
const upload = require('../../services/red_fs/upload.js');

module.exports = async (req, res) => {
    try {
        const { folder_id } = req.params;

        const {
            originalname: original_name,
            filename: stored_name,
            path,
            mimetype: mime_type,
            size
        } = req.file;


        await upload(req.account_id, folder_id, original_name, stored_name, path, mime_type, size);

        res.status(201).json({ message: "Uploaded successfully!" });

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}