import React from 'react';
import { BookOpen, Leaf, Newspaper } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function PlantCards() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Know About Plants & Trees",
      icon: <Leaf className="h-12 w-12 text-green-600 group-hover:text-green-800 transition duration-300" />,
      onClick: () => navigate("/Plant-info"),
    },
    {
      title: "How to Take Care of Plants",
      icon: <BookOpen className="h-12 w-12 text-green-600 group-hover:text-green-800 transition duration-300" />,
      onClick: () => navigate("/care"),
    },
    {
      title: "New Articles",
      icon: <Newspaper className="h-12 w-12 text-green-600 group-hover:text-green-800 transition duration-300" />,
      onClick: () => navigate("/news"),
    },
  ];

  return (
    <div className=" py-20 px-6 mb-16  ">
      <motion.h2
        className="text-4xl font-bold text-center text-green-600 mb-14"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Explore More
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            onClick={card.onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="cursor-pointer group bg-white p-8 rounded-2xl border border-green-200 shadow-lg hover:shadow-green-300 transition-all"
          >
            <div className="flex items-center justify-center mb-6">
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold text-center text-green-800 group-hover:text-green-600 transition">
              {card.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PlantCards;
