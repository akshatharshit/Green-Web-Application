import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { BookOpen, Leaf } from "lucide-react";

const blogSamples = [
  {
    title: "Planting Trees, Growing Futures",
    content:
      "Farmers know that a tree is more than shade. It enriches soil, shelters crops, and provides fruits and fuel for generations. Planting a tree today is planting prosperity for tomorrow.",
    author: "Ravi Kisan",
    date: "May 10, 2025",
  },
  {
    title: "Farming with Nature",
    content:
      "Agroforestry blends crops and trees, helping farmers increase yield while protecting the land. From windbreaks to fruit trees, every branch strengthens a farmer’s livelihood and the planet.",
    author: "Anita Verma",
    date: "May 6, 2025",
  },
  {
    title: "Trees: A Farmer’s Best Friend",
    content:
      "Healthy trees mean healthy farms. They prevent soil erosion, conserve water, and keep fields fertile. Supporting farmers to grow trees is supporting food security for all.",
    author: "Manoj Greenfield",
    date: "April 30, 2025",
  },
];

function AddBlogList() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % blogSamples.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentBlog = blogSamples[index];

  return (
    <div className="py-20 relative ">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Blog Card */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            key={index}
            className="bg-white/95 rounded-2xl shadow-xl p-8 w-full max-w-md h-80 border border-green-200 hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="absolute -top-6 -left-6 bg-green-100 p-4 rounded-full shadow-md">
              <Leaf className="w-6 h-6 text-green-700" />
            </div>

            <h3 className="text-green-800 font-bold text-2xl mb-3 line-clamp-2">
              {currentBlog.title}
            </h3>
            <p className="text-gray-700 text-sm mb-6 leading-relaxed line-clamp-4">
              {currentBlog.content}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="italic">By {currentBlog.author}</span>
              <span>{currentBlog.date}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Heading + Buttons */}
        <motion.div
          className="md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-extrabold text-green-500 leading-snug">
            Strong Roots, <br className="hidden md:block" />
            Strong Harvests.
          </h2>
          <p className="text-gray-300 text-lg max-w-md mx-auto md:mx-0">
            Join a community of farmers and tree lovers working together for a greener tomorrow. 
            Learn how trees improve farming, and share your own success stories.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition font-semibold shadow-lg"
              onClick={() => navigate('/blog')}
            >
              <BookOpen className="w-5 h-5" />
              Read Farmer Stories
            </button>
            <button
              className="px-6 py-3 border border-green-700 text-green-400 rounded-xl hover:bg-green-100 transition font-semibold"
              onClick={() => token ? navigate('/blog/create') : navigate('/auth/login')}
            >
              Share Your Tree Journey
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AddBlogList;
