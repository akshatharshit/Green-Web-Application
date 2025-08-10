// backend/routes/environmentRoutes.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

// GET /api/environment-news
router.get('/', async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=environment&apiKey=${apiKey}`;

    const { data } = await axios.get(url);

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
    console.error('Error fetching environment news:', error.message);
    res.status(500).json({ error: 'Failed to fetch environment news' });
  }
});

export default router;
