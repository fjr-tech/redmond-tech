const { getAccountIDByUsername, createAccount } = require('../../models/accounts.js');
const { validateUsername, validatePassword } = require('../../utils/accounts/validate_credential_specs.js')

module.exports = async (username, password) => {
    // Validate username & password
    if (!validateUsername(username) || !validatePassword(password)) {
        const err = new Error("Invalid username and/or password");
        err.status = 400;
        throw err;
    }

    if (await getAccountIDByUsername(username)) {
        const err = new Error("Account already exists");
        err.status = 409;
        throw err;
    }

    createAccount(username, password);

}