import express from "express";
import Listing from "../models/Listing.js";
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Create a listing
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const newListing = new Listing({ title, description, price, image, user: req.user.id });
    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find().populate("user", "username");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single listing
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("user", "username").populate("reviews.user", "username");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete listing (only creator)
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    if (listing.user.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    await listing.remove();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add review
router.post("/:id/reviews", authenticate, async (req, res) => {
  try {
    const { comment, rating } = req.body;
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const alreadyReviewed = listing.reviews.find(r => r.user.toString() === req.user.id);
    if (alreadyReviewed) return res.status(400).json({ message: "You already reviewed this listing" });

    listing.reviews.push({ user: req.user.id, comment, rating });
    await listing.save();
    res.status(201).json({ message: "Review added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
