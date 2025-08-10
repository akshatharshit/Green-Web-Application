// backend/routes/environmentRoutes.js
import express from "express";
import axios from "axios";

const router = express.Router();

// GET /api/environment-news
router.get("/", async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "Missing NEWS_API_KEY" });
    }

    const { data } = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "environment",
        apiKey,
      },
    });

    if (!Array.isArray(data.articles)) {
      console.error("Unexpected NewsAPI response:", data);
      return res.json([]); // Always return an array
    }

    const simplifiedData = data.articles.map((article) => ({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
    }));

    res.json(simplifiedData);
  } catch (error) {
    console.error("Error fetching environment news:", error.message);
    res.status(500).json([]); // Always send an array so frontend .map() doesn't crash
  }
});

export default router;
