// backend/routes/environmentRoutes.js
import express from "express";
import axios from "axios";

const router = express.Router();

// GET /api/environment-news
router.get("/", async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      console.error("❌ Missing NEWS_API_KEY in environment variables.");
      return res.status(500).json([]); // Always return an array
    }

    const { data } = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "environment",
        language: "en",
        sortBy: "publishedAt",
        pageSize: 20,
        apiKey,
      },
    });

    if (!data || !Array.isArray(data.articles)) {
      console.error("❌ Unexpected NewsAPI response:", data);
      return res.json([]); // Safe fallback
    }

    const simplifiedData = data.articles.map((article) => ({
      id: article.url || crypto.randomUUID(),
      title: article.title || "No title",
      description: article.description || "No description available",
      url: article.url || "#",
      imageUrl: article.urlToImage || null,
      publishedAt: article.publishedAt || null,
    }));

    res.json(simplifiedData);
  } catch (error) {
    console.error("❌ Error fetching environment news:", error.message);
    if (error.response) {
      console.error("🔍 API Response Data:", error.response.data);
    }
    res.status(500).json([]); // Always send an array
  }
});

export default router;
