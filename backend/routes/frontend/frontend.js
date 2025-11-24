const express = require('express');
const router = express.Router();
const path = require('path');

router.use('/components', express.static(path.join(__dirname, '../../../frontend/components')));
router.use('/services', express.static(path.join(__dirname, '../../../frontend/services')));
router.use('/assets', express.static(path.join(__dirname, '../../../frontend/assets')));
router.use('/utils', express.static(path.join(__dirname, '../../../frontend/utils')));

// Pages can be accessed with or without '/pages'
const pages = require('./pages.js');
router.use('/pages', pages);
router.use('/', pages); // fallback '/' - prevents needing '/pages' route

module.exports = router;