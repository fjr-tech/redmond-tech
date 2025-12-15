/* 
    router - routes traffic, maps URLs to endpoints
    controller - gets req, sends res
    service - business logic, keeps controller clean, calls models
    model - interact with db
*/

const createAccount = require('../../services/accounts/create_account.js');

module.exports = async (req, res) => {
    try {
        const { username, password, accountCreationKey } = req.body;

        await createAccount(username, password, accountCreationKey);

        res.status(201).json({ message: "Account created!" });

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}