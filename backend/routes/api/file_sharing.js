const express = require('express');
const router = express.Router();

const upload = require('../../controllers/file_sharing/upload.js');
router.post('/upload', upload);

module.exports = router;