// Handles uploading files by interacting with multer

const upload = require('../config/multer.js');

module.exports = (req, res, next) => {
    upload.single('file')(req, res, err => {
        if (err) {
            // Multer-specific errors
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({
                    message: 'File is too large'
                });
            }

            if (err.code === 'LIMIT_ACCOUNT_STORAGE') {
                return res.status(413).json({
                    message: 'Account has run out of storage space'
                });
            }

            // Generic error
            return res.status(400).json({
                message: `File upload failed: ${err.message}`
            });
        }

        // No file
        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded'
            });
        }

        next();
    });
}