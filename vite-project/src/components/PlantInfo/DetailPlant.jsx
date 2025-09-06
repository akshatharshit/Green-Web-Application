// src/components/PlantInfo/DetailPlant.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Leaf, Droplet, SunMedium, ArrowLeft } from "lucide-react";

function DetailPlant() {
  const { id } = useParams();
  const plantData = useSelector((state) =>
    state.plantinfoslice.Details.find((plant) => plant.id === parseInt(id))
  );

  if (!plantData) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="text-2xl text-gray-500 animate-pulse">
          Loading plant details...
        </span>
      </div>
    );
  }

  return (
    <div className="py-10 px-6 lg:px-20 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-10 drop-shadow-md">
          {plantData.name}
        </h2>

        {/* Image */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-green-200 mb-10">
          <img
            src={plantData.image}
            alt={plantData.name}
            className="w-full h-[450px] object-cover hover:scale-105 transform transition duration-500 ease-in-out"
          />
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <p className="text-lg text-gray-700 font-medium">
              <span className="font-semibold text-green-700">
                🌱 Scientific Name:
              </span>{" "}
              {plantData.scientific_name}
            </p>
            <p className="text-lg text-gray-700 font-medium">
              <span className="font-semibold text-green-700">🌿 Type:</span>{" "}
              {plantData.type || "Unknown"}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            <span className="font-semibold text-green-700">About:</span>{" "}
            {plantData.details ||
              "No additional information available for this plant."}
          </p>

          {/* Care Instructions */}
          <div className="bg-green-50 p-6 rounded-xl shadow-inner">
            <h3 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
              <Leaf className="w-6 h-6" /> Care Instructions
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-blue-500" /> Water regularly,
                but avoid overwatering.
              </li>
              <li className="flex items-center gap-2">
                <SunMedium className="w-5 h-5 text-yellow-500" /> Place in a
                well-lit spot for optimal growth.
              </li>
              <li className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" /> Repot every 1–2
                years for healthier growth.
              </li>
            </ul>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/Plant-info"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-md transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Plant List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailPlant;
