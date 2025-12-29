const express = require('express');
const path = require('path');
const router = express.Router();
const auth = require('../../middleware/auth.js');

// Folder mapping
router.use('/public', express.static(path.join(__dirname, '../../../frontend/pages/public')));
router.use('/templates', express.static(path.join(__dirname, '../../../frontend/templates')));

// Custom routers
const fun = require('./fun.js');
router.use('/fun', fun);

const debug = require('./debug.js');
router.use('/debug', debug);


// Direct HTML link
router.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/public/login/login.html'));
});
router.get('/sign_up', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/public/sign_up/sign_up.html'));
});
router.get('/info', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/public/info/info.html'));
});


// HOME PAGE
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/public/home/index.html'));
});


// --------------------------------------------------------------- //
// --------- All routes after this require an account ---------
router.use(auth(0)); // must be suspended or higher

// Account folder
router.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/account/dashboard/dashboard.html'));
});
router.get('/logout', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/account/logout/logout.html'));
});

router.get('/rfs', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/rfs/rfs.html'));
});
router.use('/rfs', express.static(path.join(__dirname, '../../../frontend/pages/rfs')));


// Not found fallback
router.use((req, res) => {
    res.status(404).sendFile(path.resolve(__dirname, '../../../frontend/pages/public/errors/404.html'));
});

module.exports = router;