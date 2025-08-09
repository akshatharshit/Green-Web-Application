import express from 'express';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();

// GET all testimonials
router.get('/', async (req, res) => {
  try {
    const all = await Testimonial.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new testimonial
router.post('/', async (req, res) => {
  const { name, img, message } = req.body;
  if (!name || !message) return res.status(400).json({ error: "Name and message required" });

  try {
    const newTestimonial = await Testimonial.create({ name, img, message });
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save testimonial' });
  }
});

export default router;


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // Find and delete the testimonial by its ID from your database
  // Example:
  Testimonial.findByIdAndDelete(id)
    .then(() => res.status(200).send('Testimonial deleted'))
    .catch((err) => res.status(500).json({ message: err.message }));
});
