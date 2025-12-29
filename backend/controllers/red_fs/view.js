// View file (for images, PDFs, etc.)
const view = require('../../services/red_fs/download.js');
const path = require('path');

module.exports = async (req, res) => {
    try {
        const { file_id } = req.params;

        const {file_path, file_name} = await view(req.account_id, file_id);

        // Determine Content-Type based on extension
        const ext = (path.extname(file_name) || '').toLowerCase();
        let contentType = 'application/octet-stream';
        let inlineable = false;

        if (ext === '.pdf') {
            contentType = 'application/pdf';
            inlineable = true;
        } else if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) {
            contentType = `image/${ext.replace('.', '')}`.replace('image/.jpg', 'image/jpeg');
            inlineable = true;
        }

        // Set headers to allow inline display when possible
        res.setHeader('Content-Type', contentType);
        if (inlineable) {
            res.setHeader('Content-Disposition', `inline; filename="${file_name}"`);
        } else {
            // Fallback to attachment for non-viewable types
            res.setHeader('Content-Disposition', `attachment; filename="${file_name}"`);
        }

        // Send the file
        res.sendFile(file_path, err => {
            if (err) {
                console.error('sendFile error:', err);
                if (!res.headersSent) res.status(500).json({ message: 'View failed' });
            }
        });

    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}
