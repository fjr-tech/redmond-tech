const login = require('../../services/accounts/login.js');
const { accounts: { credential_specs: {session_token_duration} } } = require('../../config/config.json');

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;
        const session_token = await login(username, password);

        // Send session token cookie
        res.cookie('session_token', session_token, {
            httpOnly: true,
            secure: false, // http
            sameSite: "strict",
            maxAge: session_token_duration
        });

        res.status(201).json({ message: "Logged in!" });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}