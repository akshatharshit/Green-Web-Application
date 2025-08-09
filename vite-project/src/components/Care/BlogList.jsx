import React from 'react';
import { Link } from 'react-router-dom';


const blogs = [
  {
    id: 1,
    title: 'Best Tips for Indoor Plants Care',
    description:
      'Indoor plants can thrive in your home with the right care. Learn how to take care of them and create a beautiful indoor garden.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0mfN-QlCPQOlLgeEjQL8fIfI7XCEXUJ7jg&s',
    url: 'https://www.pennington.com/all-products/fertilizer/resources/8-steps-to-growing-a-healthy-indoor-garden-anytime',
  },
  {
    id: 2,
    title: 'Watering Your Plants: A Beginner\'s Guide',
    description: 'Watering your plants properly is crucial for their growth. Discover the best techniques for watering different plants.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_GyciOh_PKjOTGFjJizBtCPlwSQLuOAN3A&s',
    url: 'https://www.longfield-gardens.com/article/how-to-water-your-plants?srsltid=AfmBOoqMX8hCykdc2xzrOgmX1EihF3Ki7eADxiPMd29jzly15MKSRoOG',
  },
  {
    id: 3,
    title: 'How to Prune Plants for Healthy Growth',
    description: 'Pruning is essential to encourage healthy growth. Learn when and how to prune your plants for maximum results.',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/550b57f0e4b03338e0474a39/1565553451830-BO7IQYQ89ZY6YL3MN1H9/pothos+cut.jpg',
    url: 'https://stumpplants.com/journal/pruning-guide',
  },
];

export const BlogList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative group"
        >
          {blog.imageUrl && (
            <div className="relative">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-60 group-hover:opacity-40 transition duration-300"></div>
            </div>
          )}
          <div className="p-6">
            <Link to={blog.url}>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                {blog.title.length > 80 ? blog.title.substring(0, 80) + '...' : blog.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mb-6 line-clamp-3">
              {blog.description ? (blog.description.length > 120 ? blog.description.substring(0, 120) + '...' : blog.description) : 'No description available.'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
