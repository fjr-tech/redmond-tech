const express = require('express');
const path = require('path');
const router = express.Router();

// Serve all static files from frontend/pages
router.use(express.static(path.resolve(__dirname, '../../../frontend/pages')));


// Exception routes here:
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/home/index.html'));
});


router.get('/account/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/account/dashboard.html'))
});

module.exports = router;