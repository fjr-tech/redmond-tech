const multer = require('multer');

const fs = require('fs');
const path = require('path');

const root_destination = process.env.STORAGE_LOCATION || null;

if (!root_destination) {
    return console.error("Please add STORAGE_LOCATION to .env file and restart server");
} else if (!fs.existsSync(root_destination)) {
    return console.error(`Destination folder does not exist: ${root_destination}`);
}

// Creates a storage engine
const storage = multer.diskStorage({
    // callback is provided by multer, this function calls it
    destination: (req, file, callback) => {
        const destination = path.join(root_destination, JSON.stringify(req.account_id));
        callback(null, destination); // null means no error
    },

    filename: (req, file, callback) => {
        // File name must be UNIQUE
        const prefix = Date.now();
        const fileName = `${prefix}-${file.originalname}`;
        callback(null, fileName);
    }
});

const { file_sharing } = require('./config.json');
const maxFileSize = file_sharing.per_account.max_upload_bytes;
const maxStorage = file_sharing.per_account.max_storage_bytes;
const maxUploads = file_sharing.per_account.max_uploads_per_request;

const getDirSize = require('../utils/red_fs/get_directory_size.js');

const upload = multer({
    storage,
    limits: {
        fileSize: maxFileSize, // max file size
        files: maxUploads, // max number of files
    },
    fileFilter: (req, file, cb) => {
        // Note: Max per account storage may be exceeded
        // Actual max storage is max_storage_bytes + max_upload_bytes 

        const string_account_id = String(req.account_id);
        const account_storage_path = path.join(process.env.STORAGE_LOCATION, string_account_id);
        

        if (getDirSize(account_storage_path) > maxStorage) {
            const err = new multer.MulterError('LIMIT_ACCOUNT_STORAGE'); // or custom code
            err.message = 'Account storage limit exceeded';
            return cb(err);
        }

        cb(null, true);
    }
});

// Exports multer with storage engine object passed as an argument
module.exports = upload;