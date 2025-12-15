const AccountsModel = require('../../models/accounts.js');
const { validateUsername, validatePassword } = require('../../utils/accounts/validate_credential_specs.js');
const verifyAccountCreationKey = require('../../utils/accounts/verify_account_creation_key.js');

module.exports = async (username, password, accountCreationKey) => {
    // Validate username & password
    if (!validateUsername(username) || !validatePassword(password) || !verifyAccountCreationKey(accountCreationKey)) {
        const err = new Error("Invalid username, password, and/or account creation key");
        err.status = 400;
        throw err;
    }

    if (await AccountsModel.getAccountIDByUsername(username)) {
        const err = new Error("Account already exists");
        err.status = 409;
        throw err;
    }

    await AccountsModel.createAccount(username, password);

}