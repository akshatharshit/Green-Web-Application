// src/components/PlantInfo/DetailPlant.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


function DetailPlant() {
  const { id } = useParams();
  const plantData = useSelector((state) =>
    state.plantinfoslice.Details.find((plant) => plant.id === parseInt(id))
  );

  if (!plantData) {
    return (
      <div className="loading-container flex justify-center items-center py-20">
        <span className="text-2xl text-gray-500">Loading plant details...</span>
      </div>
    );
  }

  return (
    <>
    
    <div className="plant-detail-container py-8 px-4 sm:px-8 lg:px-16 ">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-4xl font-semibold text-center text-green-800 mb-6">{plantData.name}</h2>
        
        <div className="plant-image-container w-full max-w-2xl mb-8 rounded-lg overflow-hidden shadow-xl border border-green-200">
          <img
            src={plantData.image}
            alt={plantData.name}
            className="w-full h-80 object-cover rounded-lg transition-all hover:scale-105 transform duration-300 ease-in-out"
          />
        </div>

        <div className="plant-description w-full max-w-2xl bg-white p-6 rounded-lg shadow-md border border-green-200">
          <p className="text-lg text-gray-700 mb-4 font-medium">
            <span className="font-semibold text-green-700">Scientific Name:</span> {plantData.scientific_name}
          </p>
          <p className="text-lg text-gray-700 mb-4 font-medium">
            <span className="font-semibold text-green-700">Plant Type:</span> {plantData.type || 'Unknown'}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-semibold text-green-700">More Details:</span> {plantData.details || 'No additional information available.'}
          </p>

          <div className="plant-care mt-6">
            <h3 className="text-xl font-semibold text-green-600 mb-2">Care Instructions:</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Water regularly, but avoid overwatering.</li>
              <li>Keep in a well-lit spot for optimal growth.</li>
              <li>Consider repotting every 1-2 years for healthier growth.</li>
            </ul>
          </div>
        </div>

        {/* Back to list button */}
        <div className="mt-8">
          <a href="/Plant-info" className="text-lg text-white bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg shadow-md">
            Back to Plant List
          </a>
        </div>
      </div>
    </div>
   
    </>
  );
}

export default DetailPlant;
