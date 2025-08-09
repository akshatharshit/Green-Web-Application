import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import Blog from '../models/Blog.js';
import {authenticate} from '../middleware/auth.js';


const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Create blog
router.post('/create', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { title, content } = req.body;
    let imageUrl = '';
    let publicId = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path); 
      imageUrl = result.secure_url;
      publicId = result.public_id;
    }

    const blog = new Blog({
      title,
      content,
      imageUrl,
      imagePublicId: publicId,
      author: req.user?.id,
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate('author', 'userName'); 

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Delete blog by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

 
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    
    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;
