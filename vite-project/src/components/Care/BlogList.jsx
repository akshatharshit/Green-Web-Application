import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const blogs = [
  {
    id: 1,
    title: 'Best Tips for Indoor Plants Care',
    description:
      'Indoor plants can thrive in your home with the right care. Learn how to take care of them and create a beautiful indoor garden.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0mfN-QlCPQOlLgeEjQL8fIfI7XCEXUJ7jg&s',
    url: 'https://www.pennington.com/all-products/fertilizer/resources/8-steps-to-growing-a-healthy-indoor-garden-anytime',
    tag: 'Plant Care',
  },
  {
    id: 2,
    title: "Watering Your Plants: A Beginner's Guide",
    description:
      'Watering your plants properly is crucial for their growth. Discover the best techniques for watering different plants.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_GyciOh_PKjOTGFjJizBtCPlwSQLuOAN3A&s',
    url: 'https://www.longfield-gardens.com/article/how-to-water-your-plants?srsltid=AfmBOoqMX8hCykdc2xzrOgmX1EihF3Ki7eADxiPMd29jzly15MKSRoOG',
    tag: 'Watering',
  },
  {
    id: 3,
    title: 'How to Prune Plants for Healthy Growth',
    description:
      'Pruning is essential to encourage healthy growth. Learn when and how to prune your plants for maximum results.',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/550b57f0e4b03338e0474a39/1565553451830-BO7IQYQ89ZY6YL3MN1H9/pothos+cut.jpg',
    url: 'https://stumpplants.com/journal/pruning-guide',
    tag: 'Gardening',
  },
];

export const BlogList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
        >
          {/* Blog Image */}
          {blog.imageUrl && (
            <div className="relative">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                {blog.tag}
              </span>
            </div>
          )}

          {/* Blog Content */}
          <div className="p-5 flex flex-col h-full">
            <Link to={blog.url} target="_blank" rel="noopener noreferrer">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                {blog.title.length > 60 ? blog.title.substring(0, 60) + '...' : blog.title}
              </h3>
            </Link>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              {blog.description.length > 100
                ? blog.description.substring(0, 100) + '...'
                : blog.description}
            </p>
            <Link
              to={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-green-700 font-medium hover:underline mt-auto"
            >
              Read More <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
