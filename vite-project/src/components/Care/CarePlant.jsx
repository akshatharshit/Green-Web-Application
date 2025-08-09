import React from 'react';
import { BlogList } from './BlogList';


function CarePlant() {
  return (
    <>
 
      <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-green-700 mb-12">How to Take Care of Your Plants</h1>

      <div className="text-lg text-gray-700 mb-8">
        <p>
          Taking care of plants requires understanding their specific needs, including water, sunlight, soil, and
          temperature. Whether you are a beginner or an experienced gardener, following the right care steps ensures your
          plants thrive and flourish. Here are some general tips to get you started.
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-2">
          <li>Water your plant regularly, but ensure the soil is not waterlogged.</li>
          <li>Provide proper sunlight for your plant—some need direct sunlight, while others thrive in the shade.</li>
          <li>Use quality soil and fertilizer based on the type of plant.</li>
          <li>Ensure the pot has proper drainage to avoid root rot.</li>
          <li>Regularly prune dead or damaged leaves to promote new growth.</li>
        </ul>
      </div>

      <h2 className="text-3xl font-semibold text-center text-green-600 mb-8">Plant Care Blogs</h2>

      
      <BlogList />
    </div>
    
    </>
  )
}

export default CarePlant