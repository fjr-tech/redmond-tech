const multer = require('multer');

const fs = require('fs');

const destination = process.env.STORAGE_LOCATION || null;

if (!destination) {
    console.error("Please add STORAGE_LOCATION to .env file and restart server");
} else if (!fs.existsSync(destination)) {
    console.error(`Destination folder does not exist: ${destination}`);
}

// Creates a storage engine
const storage = multer.diskStorage({
    // callback is provided by multer, this function calls it
    destination: (req, file, callback) => {
        callback(null, destination); // null means no error
    },

    filename: (req, file, callback) => {
        // File name must be UNIQUE
        const fileName = `${Date.now()}-${file.originalname}`;
        callback(null, fileName);
    }
});


// Exports multer with storage engine object passed as an argument
module.exports = multer({ storage });