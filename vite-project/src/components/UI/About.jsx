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
    { emoji: "📷", title: t("Identify Any Plant"), description: t("Use our scanner, camera upload, or search tools to identify thousands of plant species with instant AI recognition.") },
    { emoji: "✍️", title: t("Write & Read Plant Blogs"), description: t("Explore curated content or create your own blog posts on plant care, biodiversity, gardening, and nature travel.") },
    { emoji: "🛒", title: t("Eco Marketplace"), description: t("Buy or sell eco-friendly items in our green marketplace. Track items, manage your cart, and enjoy secure checkout.") },
    { emoji: "🌱", title: t("Plant a Tree Program"), description: t("Plant real trees, upload proof, and earn a certificate after every 5 trees! View your progress on our interactive leaderboard.") },
    { emoji: "🗺️", title: t("Global Green Map"), description: t("Discover 100+ protected and green reverse areas. See your own location and find forests near you.") },
    { emoji: "🎮", title: t("Quests & Rewards"), description: t("Take part in challenges like saving water or planting a sapling. Earn green points and climb the leaderboard!") },
    { emoji: "🤖", title: t("Your AI Plant Assistant"), description: t("Chat with our AI bot for plant suggestions, gardening help, eco-tips, and more! Always available when you need guidance.") },
    { emoji: "☀️", title: t("Real-Time Weather & News"), description: t("Stay informed with current weather updates and trending news articles related to nature and sustainability.") },
    { emoji: "📊", title: t("Data & Charts"), description: t("Track your impact with visual charts: trees planted, blogs contributed, items traded, and more.") },
    { emoji: "🌍", title: t("3D Nature Experiences"), description: t("Immerse yourself in our mini 3D models or upcoming VR tours for a virtual walk through forests and trails.") },
    { emoji: "🤝", title: t("Green Community & Impact"), description: t("Join a growing global community of eco-warriors. Share your journey, inspire others, and view our collective impact.") },
    { emoji: "📚", title: t("Plant Education & Guides"), description: t("Learn how to care for different plants, understand local biodiversity, and explore nature education resources.") },
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
