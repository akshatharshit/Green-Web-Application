import React from "react";

function PlantInfoCard({ name, image, description, category }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-200 w-80">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {category || "Plant"}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {description || "Discover the unique beauty and benefits of this plant."}
        </p>

        <div className="flex justify-between items-center">
          <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition-colors">
            Learn More
          </button>
          <span className="text-xs text-gray-400 italic">🌱 Nature's Gift</span>
        </div>
      </div>
    </div>
  );
}

export default PlantInfoCard;
