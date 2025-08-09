import { motion } from 'framer-motion';
import { Leaf, Globe, Droplet, TreePalm, Recycle } from 'lucide-react';

const tips = [
  {
    icon: <TreePalm className="text-green-700 w-6 h-6" />,
    title: "Plant Native Trees",
    text: "Native trees require less maintenance and adapt well to the environment.",
  },
  {
    icon: <Droplet className="text-green-700 w-6 h-6" />,
    title: "Conserve Water",
    text: "Trees help maintain the water cycle, reducing the risk of drought.",
  },
  {
    icon: <Recycle className="text-green-700 w-6 h-6" />,
    title: "Recycle & Reuse",
    text: "Reduce landfill waste by recycling items like paper and plastic.",
  },
  {
    icon: <Leaf className="text-green-700 w-6 h-6" />,
    title: "Go Organic",
    text: "Avoid pesticides that harm tree roots and local wildlife.",
  },
  {
    icon: <Globe className="text-green-700 w-6 h-6" />,
    title: "Global Impact",
    text: "Every tree helps reduce carbon emissions and cool the planet.",
  },
  {
    icon: <Globe className="text-green-700 w-6 h-6" />,
    title: "Global Impact",
    text: "Every tree helps reduce carbon emissions and cool the planet.",
  },
];

const InfoCardGrid = () => {
  return (
    <div className="py-12 px-4 md:px-10 mt-16 mb-16 ">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-green-600 mb-10">
        🌱 Green Living Tips
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {tips.map((tip, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 12px 24px rgba(0, 128, 0, 0.15)",
              transition: { type: "spring", stiffness: 300 },
            }}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600 flex gap-4 items-start transition"
          >
            <div className="p-2 bg-green-100 rounded-full">{tip.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-green-800">{tip.title}</h3>
              <p className="text-sm text-green-700 mt-1">{tip.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InfoCardGrid;
