// This is a router for the debug folder within the frontend
const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth.js');
const path = require('path');

router.get('/permissionGuest', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/debug/permissions/permissionGuest.html'));
});

router.get('/permission0', auth(0), (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/debug/permissions/permission0.html'));
});

router.get('/permission1', auth(1), (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/debug/permissions/permission1.html'));
});

router.get('/permission2', auth(2), (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/debug/permissions/permission2.html'));
});

router.get('/permission3', auth(3), (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../frontend/pages/debug/permissions/permission3.html'));
});

module.exports = router;

// test