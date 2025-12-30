// Remove permission from an account

module.exports = async (req, res) => {
    try {
        
        res.status(201).json({ message: `Permission removed.` });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}