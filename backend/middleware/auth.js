// Authentication middleware
const AccountsModel = require('../models/accounts.js');

module.exports = async (req, res, next) => {
    // cookie-praser avoids needing to parse req.headers.cookie
    const { session_token } = req.cookies;

    if (await AccountsModel.isValidSessionToken(session_token)) {
        next();
    } else {
        res.status(401).json({ message: "not authenticated" });
    }
}