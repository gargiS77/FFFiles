const multer = require('multer');
const path = require('path');

// Configure storage engine for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Files will be stored in the 'uploads' directory
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        // Generate a unique filename using Date.now() to avoid overwriting files with the same name
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB limit as an example
});

module.exports = upload;
