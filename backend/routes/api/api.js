const express = require('express');
const router = express.Router();

const accounts = require('./accounts.js');
router.use('/accounts', accounts);

module.exports = router;