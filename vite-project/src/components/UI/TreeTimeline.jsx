import { Sprout, Wheat, FlaskConical, Tractor, Users } from "lucide-react";

const events = [
  { 
    year: 2025, 
    title: "Smart Crop Prediction", 
    desc: "AI guides farmers in choosing the right crops for soil, water, and season.", 
    icon: <Sprout className="text-green-600 w-6 h-6" /> 
  },
  { 
    year: 2025, 
    title: "Leaf Disease Detection", 
    desc: "Farmers detect crop diseases early with AI-powered leaf scans.", 
    icon: <Wheat className="text-yellow-700 w-6 h-6" /> 
  },
  { 
    year: 2025, 
    title: "Fertilizer & Soil Health", 
    desc: "Smart recommendations reduce costs and improve soil fertility.", 
    icon: <FlaskConical className="text-blue-600 w-6 h-6" /> 
  },
  { 
    year: 2025, 
    title: "Yield Prediction", 
    desc: "Accurate harvest forecasts help farmers plan storage & sales.", 
    icon: <Tractor className="text-orange-600 w-6 h-6" /> 
  },
  { 
    year: 2025, 
    title: "Farmer Community Growth", 
    desc: "Thousands of farmers connected, sharing tips and sustainable practices.", 
    icon: <Users className="text-purple-600 w-6 h-6" /> 
  },
];

const TreeTimeline = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-r from-green-200 via-green-100 to-yellow-100 rounded-2xl mb-16 shadow-lg">
      <h2 className="text-4xl font-extrabold text-green-900 mb-12 text-center drop-shadow-sm">
        🌍  Journey
      </h2>
      <div className="relative border-l-4 border-gradient-to-b from-green-500 via-yellow-500 to-brown-500 pl-10">
        {events.map((e, idx) => (
          <div key={idx} className="mb-12 relative group">
            {/* Icon */}
            <div className="absolute -left-[30px] top-1 w-12 h-12 flex items-center justify-center bg-white border-4 border-green-500 rounded-full shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-green-300">
              {e.icon}
            </div>
            {/* Card */}
            <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-green-800">
                {e.year} – {e.title}
              </h3>
              <p className="text-gray-700 text-sm mt-2 leading-relaxed">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeTimeline;
