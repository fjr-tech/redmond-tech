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


const upload = multer({ storage });

// Exports multer with storage engine object passed as an argument
module.exports = upload;