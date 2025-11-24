const express = require('express');
const path = require('path');
const router = express.Router();
const auth = require('../../middleware/auth.js');

router.use('/public', express.static(path.join(__dirname, '../../../frontend/pages/public')));

// HOME PAGE
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/public/home/index.html'));
});

// LOG IN
router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/public/login/login.html'))
});

// All routes after this require an account
router.use(auth(0)); // must be suspended or higher

// Account folder
router.get('/account/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/account/dashboard/dashboard.html'))
});
router.get('/account/logout', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/account/logout/logout.html'))
});
router.get('/account/sign_up', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/account/sign_up/sign_up.html'))
});


// DEBUG ROUTE
const debug = require('./debug.js');
router.use('/debug', debug);

module.exports = router;