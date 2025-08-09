import React from 'react';

function plantinfoCard({ name, image }) {
  return (
    <div className="plant-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-lg mb-4"
          />
      </div>
      <h3 className="text-2xl font-bold text-white text-center">{name}</h3>
      <p className="text-center text-white opacity-75 mt-2">Discover the beauty of nature</p>
    </div>
    
  );
}

export default plantinfoCard;
