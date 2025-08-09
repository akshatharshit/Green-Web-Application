import React, { useState } from 'react';
import CountUp from 'react-countup';

const initialStats = [
  { label: 'Trees Planted', value: 12500 },
  { label: 'CO₂ Reduced (kg)', value: 430000 },
  { label: 'Volunteers Joined', value: 3400 },
  { label: 'Projects Completed', value: 85 },
];

export default function ImpactStats() {
  const [stats, setStats] = useState(initialStats);

  const handleIncrement = (index) => {
    const newStats = [...stats];
    newStats[index].value += 1;
    setStats(newStats);
  };

  return (
    <div className="py-12 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-10">Our Impact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 transition transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl border border-transparent hover:border-green-300"
            >
              <h3 className="text-3xl font-bold text-green-700 mb-2">
                <CountUp end={stat.value} duration={0.8} separator="," />
              </h3>
              <p className="text-gray-600 mb-4">{stat.label}</p>
              <button
                onClick={() => handleIncrement(index)}
                className="text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded-full text-sm transition"
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
