const express = require('express');
const router = express.Router();

// Create account
const create_account = require('../../controllers/accounts/create_account.js');
router.post('/new', create_account);

const login = require('../../controllers/accounts/login.js');
router.post('/login', login);

const logout = require('../../controllers/accounts/logout.js');
router.post('/logout', logout);

module.exports = router;