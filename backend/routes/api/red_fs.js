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

// View (for images, PDFs, etc.)
const view = require('../../controllers/red_fs/view.js');
router.get('/view/:file_id', auth(1), view);

// Move resource
const move = require('../../controllers/red_fs/move.js');
router.put('/move', auth(1), move);

// Delete
const delete_resource = require('../../controllers/red_fs/delete.js');
router.delete('/delete', auth(1), delete_resource);

// Add account permissions
const add_permission = require('../../controllers/red_fs/add_permission.js');
router.post('/add_permission', auth(1), add_permission);

// Remove account permissions
const remove_permission = require('../../controllers/red_fs/remove_permission.js');
router.post('/remove_permission', auth(1), remove_permission);

// Edit account permissions
const edit_permission = require('../../controllers/red_fs/edit_permission.js');
router.post('/edit_permission', auth(1), edit_permission);

module.exports = router;