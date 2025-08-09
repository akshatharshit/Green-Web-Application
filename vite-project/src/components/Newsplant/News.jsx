// src/components/News.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnvironmentNews, searchNews, selectFilteredNews, selectLoading, selectError } from '../../slices/news'; 
import { Link } from 'react-router-dom'; // Add this at the top


const News = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectFilteredNews);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchEnvironmentNews());
  }, [dispatch]);

  const handleSearch = (event) => {
    dispatch(searchNews(event.target.value));
  };

  if (loading) return <p className="text-center mt-20 text-xl font-semibold animate-pulse">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-600 text-lg font-semibold">Error: {error}</p>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-green-700">🌍 Latest Environment News</h2>

        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search for news articles..."
            onChange={handleSearch}
            className="w-full max-w-2xl px-5 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-green-400 text-lg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.map((article) => (
            <div
              key={article.id}
              className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative group"
            >
              {article.imageUrl && (
                <div className="relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-60 group-hover:opacity-40 transition duration-300"></div>
                </div>
              )}
              <div className="p-6">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h3 className="text-2xl font-bold text-green-700 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {article.title.length > 80 ? article.title.substring(0, 80) + '...' : article.title}
                </h3>
              </a>
                <p className="text-white text-sm mb-6 line-clamp-3">
                  {article.description ? (article.description.length > 120 ? article.description.substring(0, 120) + '...' : article.description) : 'No description available.'}
                </p>
                <p className="text-gray-400 text-xs">{new Date(article.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default News;
