const upload = require('../../services/file_sharing/multer.js');

/*
app.post('/upload', upload.single('file-upload'), handler);
in routes

is equivalent to:

upload.single('file-upload')(req, res, () => {
    handler(req, res);
});
in the controller

*/


module.exports = async (req, res) => {
    try {
        // manually call middleware
        const middleware = upload.single('upload');
        middleware(req, res, (error) => {
            // This is the handler function
            if (error) return res.status(500).json({ message: `Error saving file: ${error.message}` });

            // file is an obj added by multer middleware
            const file = req.file;

            if (!file) return res.status(400).json({ message: 'No file uploaded' });

            res.status(201).json({ message: `Uploaded file: ${file.originalname}` });
        });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ message: `Server error: ${error.message}` });
    }
}