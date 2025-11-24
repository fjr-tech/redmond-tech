const express = require('express');
const path = require('path');
const router = express.Router();

// Exception routes here:
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/home/index.html'));
});


router.get('/account/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/account/dashboard.html'))
});


// DEBUG ROUTE
const debug = require('./debug.js');
router.use('/debug', debug);

module.exports = router;