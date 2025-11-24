const AccountsModel = require('../../models/accounts.js');

module.exports = async (session_token) => {
    const { user_id } = await AccountsModel.getSession(session_token);

    if (!user_id) {
        const err = new Error("Session does not exist");
        err.status = 401;
        throw err;
    }

    await AccountsModel.logout(user_id);
}