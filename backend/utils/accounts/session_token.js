const crypto = require('crypto');
const { accounts: { credential_specs: { session_token_len } } } = require('../../config/config.json');

module.exports = () => {
    const token = crypto.randomBytes(session_token_len).toString("hex");

    return token;
}