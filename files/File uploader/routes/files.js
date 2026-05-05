const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const File = require('../models/File');

// @route   POST /api/files/upload
// @desc    Upload a file
// @access  Private (Requires login)
router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Save file details in MongoDB
        const newFile = new File({
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size,
            uploadedBy: req.user.id // Pulled from the token by auth middleware
        });

        const savedFile = await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully', file: savedFile });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/files
// @desc    Get list of all files uploaded by the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const files = await File.find({ uploadedBy: req.user.id })
            .select('-__v') // exclude version key
            .sort({ createdAt: -1 }); // newest first
            
        res.json(files);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/files/:id/download
// @desc    Download a file
// @access  Private
router.get('/:id/download', auth, async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        if (file.uploadedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to download this file' });
        }

        const filePath = path.resolve(file.path);
        
        // Check if file physically exists on the disk
        if (fs.existsSync(filePath)) {
            // Using express's res.download to handle the download natively
            res.download(filePath, file.originalName);
        } else {
            res.status(404).json({ message: 'File does not exist on server' });
        }
    } catch (err) {
        console.error(err);
        
        if (err.name === 'CastError') {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/files/:id
// @desc    Delete a file
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Make sure user owns the file
        if (file.uploadedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this file' });
        }

        const filePath = path.resolve(file.path);

        // Delete from local file system
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete from Database using findByIdAndDelete
        await File.findByIdAndDelete(req.params.id);

        res.json({ message: 'File deleted successfully' });
    } catch (err) {
        console.error(err);
        if (err.name === 'CastError') {
            return res.status(404).json({ message: 'File not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
