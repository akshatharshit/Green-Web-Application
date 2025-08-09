import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const blogSamples = [
  {
    title: "Why We Need More Trees",
    content:
      "Trees aren’t just green friends; they cool the planet, purify the air, and offer shelter to wildlife. Planting one today can shape the climate of tomorrow. Let’s make our cities greener and our lives cleaner.",
    author: "Jane Forest",
    date: "May 10, 2025",
  },
  {
    title: "The Joy of Gardening",
    content:
      "Gardening connects us with nature. Whether it's a balcony herb pot or a backyard vegetable patch, the process is therapeutic, educational, and fun for all ages. Discover the magic of growing your own greens.",
    author: "Liam Earthwise",
    date: "May 6, 2025",
  },
  {
    title: "Urban Forests Matter",
    content:
      "City trees improve mental health, reduce heat islands, and bring communities together. Supporting urban forestry is crucial for a livable future in our growing metropolises.",
    author: "Ava Greenfield",
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
    <div className=" py-16 mb-16">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">

        
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md h-72 border-l-4 border-green-700 transition-all duration-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-green-800 font-bold text-xl mb-2">{currentBlog.title}</h3>
            <p className="text-gray-700 text-sm mb-4 line-clamp-4">{currentBlog.content}</p>
            <div className="text-gray-500 text-xs italic">
              By {currentBlog.author} • {currentBlog.date}
            </div>
          </motion.div>
        </motion.div>

       
        <motion.div
          className="md:w-1/2 space-y-6 text-center md:text-left"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-green-600 leading-snug">
            Every Tree Counts. <br className="hidden md:block" />
            Every Story Inspires.
          </h2>
          <p className="text-gray-200 text-lg">
            Be part of a movement to green our Earth. Learn from others and share your eco-friendly actions. Your story could inspire the next great change.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition font-semibold"
              onClick={() => navigate('/blog')}
            >
              Read Inspiring Stories
            </button>
            <button
              className="px-6 py-3 border border-green-700 text-green-700 rounded-xl hover:bg-green-100 transition font-semibold"
              onClick={() => token ? navigate('/blog/create') : navigate('/auth/login')}
            >
              Share Your Green Journey
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AddBlogList;
