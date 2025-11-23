// Authentication middleware

const AccountsModel = require('../models/accounts.js');

module.exports = (req, res) => {
    // cookie-praser avoids needing to parse req.headers.cookie
    const { session_token } = req.cookies;

    if (AccountsModel.isValidSessionToken(session_token)) {
        next();
    } else {
        res.status(401).json({ message: "not authenticated" });
    }
}