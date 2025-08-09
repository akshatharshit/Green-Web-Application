import React from 'react';
import { motion } from 'framer-motion';
import treeVideo from '../assets/tree.mp4'; 
import { useNavigate } from 'react-router-dom';


function PlantTree() {
  const navigate = useNavigate();
  return (
    <div className="py-12 mb-16 bg-gradient-to-r from-green-200 via-green-100 to-green-200 ">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

        {/* Left Side - Text Content */}
        <motion.div
          className="md:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-green-800 mb-4">Plant a Tree, Grow a Future</h2>
          <p className="text-gray-700 text-lg mb-6">
            Trees are the lungs of our planet. By planting trees, we reduce carbon, improve air quality, and make the Earth a better place for future generations.
          </p>
          <button className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition mr-16"
           onClick={()=> navigate('/submission/upload')}
          >
            Get Involved
          </button>

          <button className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition"
           onClick={()=> navigate('/leaderboard')}
          >
            Leaderboard
          </button>
        </motion.div>

        {/* Right Side - Animation */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <video
            src={treeVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-md rounded-xl shadow-lg object-cover"
          />
        </motion.div>


      </div>
    </div>
  );
}

export default PlantTree;
