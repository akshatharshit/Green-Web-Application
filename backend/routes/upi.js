import multer from 'multer';
import cloudinary from 'cloudinary';
import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Upi from '../models/Upi.js';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// 🌱 Create UPI entry
router.post('/', authenticate, upload.single('qrImage'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'QR image is required' });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'upi_qr',
      allowed_formats: ['jpg', 'jpeg', 'png'],
    });

    const upi = await Upi.create({
      upiId: req.body.upiId,
      qrImage: result.secure_url,
      user: req.user.id,
      hasFilled: true, 
    });

    res.status(201).json(upi);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.get('/', authenticate, async (req, res) => {
  try {
  
    const upi = await Upi.find({ user: req.user.id }); 
    console.log(upi);
    if (upi.length === 0) {
      return res.status(404).json({ error: 'No UPI details found' });
    }  

    res.json(upi); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});




// ✏️ Update UPI
router.put('/:id', authenticate, upload.single('qrImage'), async (req, res) => {
  try {
    const upi = await Upi.findOne({ _id: req.params.id, user: req.user.id });
    if (!upi) return res.status(404).json({ error: 'UPI not found' });

    const updateData = { upiId: req.body.upiId };

    if (req.file) {
      const publicId = upi.qrImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`upi_qr/${publicId}`);

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'upi_qr',
      });

      updateData.qrImage = result.secure_url;
    }

    const updated = await Upi.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑 Delete UPI
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const upi = await Upi.findOne({ _id: req.params.id, user: req.user.id });
    if (!upi) return res.status(404).json({ error: 'UPI not found' });

    const publicId = upi.qrImage.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`upi_qr/${publicId}`);

    await Upi.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
