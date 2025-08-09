import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


function SearchCard() {
  const dispatch = useDispatch();
  const { filteredPlants } = useSelector((state) => state.plantinfoslice); 

  // Handling case when no plants match or results are empty
  if (!filteredPlants || filteredPlants.length === 0) {
    return (
      <>
        
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">No plants found matching your search query.</p>
        </div>
        
      </>
    );
  }

  // Assuming you want to show the first plant's details (or any other logic if needed)
  const filteredPlant = filteredPlants[0];

  return (
    <>
      

      <div className="plant-detail-container py-8 px-4 sm:px-8 lg:px-16 bg-green-50">
        <div className="container mx-auto flex flex-col items-center">
          <h2 className="text-4xl font-semibold text-center text-green-800 mb-6">{filteredPlant.name}</h2>

          <div className="plant-image-container w-full max-w-2xl mb-8 rounded-lg overflow-hidden shadow-xl border border-green-200">
            <img
              src={filteredPlant.image}
              alt={filteredPlant.name}
              className="w-full h-80 object-cover rounded-lg transition-all hover:scale-105 transform duration-300 ease-in-out"
            />
          </div>

          <div className="plant-description w-full max-w-2xl bg-white p-6 rounded-lg shadow-md border border-green-200">
            <p className="text-lg text-gray-700 mb-4 font-medium">
              <span className="font-semibold text-green-700">Scientific Name:</span> {filteredPlant.scientific_name}
            </p>
            <p className="text-lg text-gray-700 mb-4 font-medium">
              <span className="font-semibold text-green-700">Plant Type:</span> {filteredPlant.type || 'Unknown'}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <span className="font-semibold text-green-700">More Details:</span> {filteredPlant.details || 'No additional information available.'}
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

export default SearchCard;
