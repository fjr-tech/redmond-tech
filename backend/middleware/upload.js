// Handles uploading files by interacting with multer

const upload = require('../config/multer.js');

module.exports = (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: `File upload failed: ${err.message}` });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        next();
    });
}