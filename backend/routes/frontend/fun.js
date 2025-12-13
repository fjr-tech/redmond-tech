const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/pages/fun/fun.html'));
});

// Custom direct links
router.get('/flatblock', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/pages/fun/flatblock/flatblock.html'));
});


// Fallback
router.use('/', express.static(path.join(__dirname, '../../../frontend/pages/fun')));

module.exports = router;