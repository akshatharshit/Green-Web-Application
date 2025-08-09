import express from 'express';
import multer from 'multer';
import fs from 'fs';
import cloudinary from '../utils/cloudinary.js';
import Item from '../models/Item.js';
import Review from '../models/Review.js';
import { authenticate } from '../middleware/auth.js'; 

const router = express.Router();
const upload = multer({ dest: 'uploads/' });


// ✅ CREATE ITEM
router.post('/create', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { title, description, price } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path);

    const item = new Item({
      title,
      description,
      price,
      image: result.secure_url,
      seller: req.user.id, 
    });

    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ GET ALL ITEMS WITH REVIEWS
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().populate('seller', 'username');
    const itemsWithReviews = await Promise.all(items.map(async (item) => {
      const reviews = await Review.find({ listing: item._id }).populate('user', 'username');
      return { ...item.toObject(), reviews };
    }));

    res.json(itemsWithReviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ DELETE ITEM (OWNER ONLY)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (item.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
