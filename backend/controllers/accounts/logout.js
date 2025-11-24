const logout = require('../../services/accounts/logout.js');

module.exports = async (req, res) => {
    try {
        const session_token = req.cookies.session_token;

        await logout(session_token);

        // Clear session token cookie
        res.clearCookie('session_token');

        res.status(200).json({ message: "Logged out!" });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }

}