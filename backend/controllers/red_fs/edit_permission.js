// Edit permission

module.exports = async (req, res) => {
    try {
        
        res.status(201).json({ message: `Permission changed.` });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}