import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/cloudinary.js';  // Assuming Cloudinary config is here
import { authenticate } from '../middleware/auth.js';
import Submission from '../models/submission.js';
import { Readable } from 'stream';

const router = express.Router();

// Use memory storage for Multer to store files in memory
const storage = multer.memoryStorage();

// File filter to accept only image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

// Multer instance with memory storage
const upload = multer({
  storage,
});

// CREATE a submission (upload directly to Cloudinary)
router.post('/sub', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    console.log(name);
    // Upload file to Cloudinary directly from memory buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'tree-submissions' },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Error uploading to Cloudinary', error: error.message });
        }

        const imageUrl = result.secure_url;

        // Create a new submission in the database
        const newSubmission = new Submission({
          name,
          imageUrl,
          userId: req.user.id,
        });

        await newSubmission.save();
        res.json({ message: 'Green token granted!', submission: newSubmission });
      }
    );

    // Convert the buffer to a readable stream and pipe to Cloudinary upload
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null); 
    bufferStream.pipe(uploadStream);

  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ message: 'Error creating submission', error: error.message });
  }
});

// GET all submissions
router.get('/', async (_, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
});

// DELETE submission by owner
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const sub = await Submission.findById(req.params.id);
    if (!sub) return res.status(404).json({ message: 'Submission not found' });

    if (sub.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await sub.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting submission:', error);
    res.status(500).json({ message: 'Error deleting submission', error: error.message });
  }
});

export default router;
