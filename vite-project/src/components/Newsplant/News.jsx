// src/components/News.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEnvironmentNews,
  searchNews,
  selectFilteredNews,
  selectLoading,
  selectError,
} from "../../slices/news";

const categories = ["All", "Climate", "Wildlife", "Energy", "Pollution", "Sustainability"];

const News = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectFilteredNews);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchEnvironmentNews());
  }, [dispatch]);

  const handleSearch = (event) => {
    dispatch(searchNews(event.target.value));
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-xl font-semibold animate-pulse text-green-600">
        🌿 Fetching latest news...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-red-600 text-lg font-semibold">
        ❌ Error: {error}
      </p>
    );

  // Filter news by category (for demo using title/description includes check)
  const filteredNews =
    activeCategory === "All"
      ? news
      : news.filter(
          (article) =>
            article.title?.toLowerCase().includes(activeCategory.toLowerCase()) ||
            article.description?.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-green-700 mb-3">
          🌍 Latest Environment News
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Stay updated with the most recent stories about our planet, nature,
          and sustainability.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔎 Search news articles..."
          onChange={handleSearch}
          className="w-full max-w-2xl px-5 py-3 border border-green-200 rounded-full shadow-sm focus:outline-none focus:ring-4 focus:ring-green-400 text-lg transition"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-green-600 text-white shadow-md"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.length > 0 ? (
          filteredNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 group border border-gray-100"
            >
              {/* Image */}
              {article.imageUrl && (
                <div className="relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-50 group-hover:opacity-30 transition"></div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                    {article.title.length > 80
                      ? article.title.substring(0, 80) + "..."
                      : article.title}
                  </h3>
                </a>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.description
                    ? article.description.length > 120
                      ? article.description.substring(0, 120) + "..."
                      : article.description
                    : "No description available."}
                </p>
                <p className="text-gray-400 text-xs">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No news found for <span className="font-semibold">{activeCategory}</span>.
          </p>
        )}
      </div>
    </div>
  );
};

export default News;
