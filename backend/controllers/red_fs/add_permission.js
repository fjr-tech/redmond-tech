// Share root folder with a new account

const add_permission = require('../../services/red_fs/add_permission.js');

module.exports = async (req, res) => {
    try {
        
        const account_id = req.account_id;
        const {account_id: target_account_id, permission_level} = req.body;

        await add_permission(account_id, target_account_id, permission_level);

        res.status(201).json({ message: `Permission granted to new account.` });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}