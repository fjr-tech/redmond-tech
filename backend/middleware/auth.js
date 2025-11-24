// Authentication middleware
const AccountsModel = require('../models/accounts.js');

/*
This middleware returns a function instead of exporting the function directly
Thus, when using it, parentheses must be used to call the function to get the middleware
*/
module.exports = (required_permission_level = 1) => {
    return async (req, res, next) => {
        // cookie-praser avoids needing to parse req.headers.cookie
        const { session_token } = req.cookies;

        if (!await AccountsModel.isValidSessionToken(session_token)) return res.status(401).json({ message: "not authenticated" });
        if (await AccountsModel.getPermissionLevelBySession(session_token) < required_permission_level) return res.status(403).json({ message: "forbidden" });

        next();
    }
}