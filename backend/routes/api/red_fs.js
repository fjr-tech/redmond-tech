const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth.js');

// const upload_middleware = require('../../middleware/upload.js');
// const upload_controller = require('../../controllers/red_fs/upload.js');
// router.post('/upload', upload_middleware, upload_controller);


// -----------------------------
function placeHolder() {

}

// Create folder
const createFolder = require('../../controllers/red_fs/create_folder.js');
router.post('/:account_id/folder', auth(1), createFolder);

// Upload file

// Upload multiple files

// Upload folder

module.exports = router;