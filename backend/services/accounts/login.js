const { login, isValidUsernameAndPassword } = require('../../models/accounts.js');

const generateSessionToken = require('../../utils/accounts/session_token.js');
const { accounts: { credential_specs: { session_token_duration } } } = require('../../config/config.json');

module.exports = async (username, password) => {

    // Validate username & password
    if (!isValidUsernameAndPassword(username, password)) {
        const err = new Error("Invalid username or password");
        err.status = 401;

        throw err;
    }

    // Login

    const session_token = generateSessionToken();

    const now = new Date();
    const session_token_expiry = new Date(now.getTime() + session_token_duration);

    await login(username, session_token, session_token_expiry);


    return session_token;
}