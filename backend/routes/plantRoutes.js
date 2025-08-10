import express from "express";
import axios from "axios";

const router = express.Router();

// GET /api/plants
router.get("/", async (req, res) => {
  try {
    const trefleURL = `https://trefle.io/api/v1/plants?token=${process.env.TREFLE_API_KEY}&limit=10`;
    const response = await axios.get(trefleURL);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching plants:", error.message);
    res.status(500).json({ error: "Failed to fetch plant details" });
  }
});

export default router;
