import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "i18next";

// Framer Motion animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const About = () => {
  const { t } = useTranslation();

  const features = [
  { 
    emoji: "🌾", 
    title: t("AI Crop Prediction"), 
    description: t("Predict the best crops for your soil and season using our AI-powered crop recommendation model. Maximize yield and farm sustainably.") 
  },
  { 
    emoji: "🍂", 
    title: t("Disease Detection"), 
    description: t("Upload a photo of your crop leaves and our AI model instantly detects possible diseases, giving you early warnings and remedies.") 
  },
  { 
    emoji: "🧪", 
    title: t("Fertilizer Recommendation"), 
    description: t("Get smart fertilizer suggestions based on your soil nutrients and crop type. Save money and boost soil health with precise guidance.") 
  },
  { 
    emoji: "📊", 
    title: t("Yield Prediction"), 
    description: t("Estimate your farm’s harvest with AI-driven yield prediction. Plan your sales, storage, and future farming decisions confidently.") 
  },
  { 
    emoji: "✍️", 
    title: t("Farmer Stories & Blogs"), 
    description: t("Share your journey, farming techniques, and experiences with trees and crops. Learn from other farmers’ success stories.") 
  },
  { 
    emoji: "🛒", 
    title: t("Agri Marketplace"), 
    description: t("Buy or sell seeds, fertilizers, tools, and eco-friendly farming products. Secure payments and trusted farmer-to-farmer deals.") 
  },
  { 
    emoji: "🌱", 
    title: t("Tree Plantation Program"), 
    description: t("Plant real trees on your farm, track growth, and earn certificates. Strengthen soil fertility and protect your land for the future.") 
  },
  { 
    emoji: "☀️", 
    title: t("Weather & Farming News"), 
    description: t("Get real-time weather updates, monsoon alerts, and the latest agricultural news to make better farming decisions.") 
  },
  { 
    emoji: "🤖", 
    title: t("AI Farming Assistant"), 
    description: t("Chat with your personal AI assistant for advice on crops, soil health, tree planting, and sustainable practices.") 
  },
  { 
    emoji: "📚", 
    title: t("Farmer Education & Guides"), 
    description: t("Learn best practices for crop rotation, soil conservation, tree care, and modern farming methods.") 
  },
  { 
    emoji: "🤝", 
    title: t("Farmer Community"), 
    description: t("Join a network of farmers, share knowledge, and collaborate on agricultural challenges to grow together.") 
  },
  { 
    emoji: "📈", 
    title: t("Farm Data & Analytics"), 
    description: t("Visualize your farm’s progress with charts: crop health, yields, fertilizer use, and tree plantation impact.") 
  },
];


  return (
    <div className="py-14 px-6 md:px-16 text-green-600 ">
      <motion.h1
        className="text-5xl font-extrabold text-center mb-8 "
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌍 {t("About Us")}
      </motion.h1>

      <motion.p
        className="max-w-4xl mx-auto text-lg leading-8 text-center text-gray-200 mb-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        {t("We're building a green, smart, and inclusive platform for everyone who loves nature. From identifying plants with a click to planting real trees that impact the planet, our platform is a global movement for a greener tomorrow.")}
      </motion.p>

      {/* Animated Features Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
      >
        {features.map((item, index) => (
          <motion.div
            key={index}
            variants={item}
            className="bg-green-50 hover:bg-green-100 transition rounded-xl p-6 shadow-md border-l-4 border-green-400 cursor-default"
            whileHover={{ scale: 1.03 }}
          >
            <div className="text-4xl mb-3">{item.emoji}</div>
            <h3 className="text-xl font-semibold text-green-800">{item.title}</h3>
            <p className="mt-2 text-green-700 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Timeline Section */}
      <div className="h-110 mt-16 mb-16 bg-gradient-to-r from-green-200 via-green-100 to-green-200 rounded-lg">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 "
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🌱 {t("Our Journey")}
        </motion.h2>

        <div className="relative border-l-4 border-green-600 pl-6 max-w-3xl mx-auto">
          {[
            {
              year: 2025,
              stage: "🌱 " + t("Seedling Phase"),
              desc: t("Kickoff in india with 5 trees. Our first roots were planted by passionate individuals."),
            },
            {
              year: 2025,
              stage: "🌿 " + t("Growth Phase"),
              desc: t("Expanded to 2 countries and hit 10+ trees. Volunteers joined and content blossomed."),
            },
            // {
            //   year: 2024,
            //   stage: "🌳 " + t("Forest Phase"),
            //   desc: t("Over 500 monthly contributors, massive user-generated content, and global community impact."),
            // },
            {
              year: 2025,
              stage: "🌏 " + t("Sustainability Phase"),
              desc: t("Green marketplace, AI tools, and 3D experiences are taking root across the world."),
            },
          ].map((event, i) => (
            <motion.div
              key={i}
              className="mb-10 relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.25, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="absolute -left-5 top-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-md"></div>
              <h3 className="text-lg font-semibold text-green-700">{event.year} — {event.stage}</h3>
              <p className="text-gray-700 mt-1 text-sm">{event.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="text-center mt-20 text-green-400 text-xl font-semibold"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {t("Join us in reimagining a planet where technology and nature grow together.")}
      </motion.div>
    </div>
  );
};

export default About;
