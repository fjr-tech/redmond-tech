const { accounts: { credential_specs } } = require('../config/config.json');

function validateUsername(username) {
    if (typeof username !== 'string') return false;

    // Check len
    if (username.length < credential_specs.username_min_len || username.length > credential_specs.username_max_len) return false

    // Check chars
    for (const char of username) {
        if (!credential_specs.valid_chars.includes(char)) return false;
    }

    return true;
}

function validatePassword(password) {
    if (typeof password !== 'string') return false;

    // Check len
    if (password.length < credential_specs.password_min_len || password.length > credential_specs.password_max_len) return false

    // Check chars
    for (const char of password) {
        if (!credential_specs.valid_chars.includes(char)) return false;
    }

    return true;
}

module.exports = {
    validateUsername, validatePassword
};