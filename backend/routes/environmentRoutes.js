import express from "express";
import axios from "axios";

const router = express.Router();

// GET /api/environment-news
router.get("/", async (req, res) => {
  try {
    const newsApiURL = "https://newsapi.org/v2/everything";

    const response = await axios.get(newsApiURL, {
      params: {
        q: "environment",
        apiKey: process.env.NEWS_API_KEY, // Store key in .env
      },
    });

    // Format the response
    const simplifiedData = response.data.articles.map((article) => ({
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
    res.status(500).json({ error: "Failed to fetch environment news" });
  }
});

export default router;
