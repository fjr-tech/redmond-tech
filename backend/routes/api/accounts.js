const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth.js');

// Create account
const create_account = require('../../controllers/accounts/create_account.js');
router.post('/new', create_account);

const login = require('../../controllers/accounts/login.js');
router.post('/login', login);

const logout = require('../../controllers/accounts/logout.js');
router.post('/logout', auth, logout); // protected

module.exports = router;