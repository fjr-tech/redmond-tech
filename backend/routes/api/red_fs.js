const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth.js');

// const upload_middleware = require('../../middleware/upload.js');
// const upload_controller = require('../../controllers/red_fs/upload.js');
// router.post('/upload', upload_middleware, upload_controller);


// -----------------------------

// Create folder
const createFolder = require('../../controllers/red_fs/create_folder.js');
router.post('/folder', auth(1), createFolder);

// Upload file
const uploadMiddleware = require('../../middleware/upload.js');
const uploadMetadataHandler = require('../../controllers/red_fs/upload.js');
router.post('/upload/:folder_id', auth(1), uploadMiddleware, uploadMetadataHandler);

// Upload multiple files

// Upload folder


// Get root folders
const getFolderContent = require('../../controllers/red_fs/get_folder_contents.js');
router.get('/:folder_id', auth(1), getFolderContent);

const getRootFolders = require('../../controllers/red_fs/get_root_folders.js');
router.get('/', auth(1), getRootFolders);

// Download
const download = require('../../controllers/red_fs/download.js');
router.get('/download/:file_id', auth(1), download);

module.exports = router;