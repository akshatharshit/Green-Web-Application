import React from 'react';
import { BlogList } from './BlogList';

function CarePlant() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4">
            🌱 How to Take Care of Your Plants
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Healthy plants bring life to your space. With the right care—
            from water to sunlight—you can help them thrive beautifully.
          </p>
        </div>

        {/* Plant Care Tips */}
        <div className="bg-green-50 border border-green-100 shadow-sm rounded-xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-700 mb-4">🌿 General Tips</h2>
          <p className="text-gray-700 leading-relaxed">
            Taking care of plants requires understanding their specific needs,
            including water, sunlight, soil, and temperature. Whether you are a
            beginner or an experienced gardener, these steps will guide you.
          </p>
          <ul className="list-disc ml-6 mt-4 space-y-2 text-gray-700">
            <li>💧 Water regularly, but avoid waterlogging.</li>
            <li>☀️ Provide the right amount of sunlight—direct or indirect.</li>
            <li>🌱 Use quality soil and fertilizer suited for the plant type.</li>
            <li>🪴 Ensure proper drainage to prevent root rot.</li>
            <li>✂️ Prune dead or damaged leaves to encourage growth.</li>
          </ul>
        </div>

        {/* Blog Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-green-600">
            🌼 Plant Care Blogs
          </h2>
          <p className="text-gray-500">
            Explore helpful articles and expert tips for your plants.
          </p>
        </div>

        <BlogList />
      </div>
    </>
  );
}

export default CarePlant;
