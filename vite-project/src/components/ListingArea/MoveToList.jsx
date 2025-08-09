import React from 'react';
import { motion } from 'framer-motion';
import Lottie6 from './Lottie6';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MoveToList() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  return (
    <div className=" py-20 mt-16 px-4 mb-16 bg-gradient-to-r from-green-200 via-green-100 to-green-200">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Lottie6 />
        </motion.div>

        
        <motion.div
          className="md:w-1/2"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
            Discover Items Ready for a Second Home
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
            Looking for quality pre-loved items? Support sustainability and save money by purchasing from our growing community. Let reuse be your first choice.
          </p>
          <button
            className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition shadow-md"
            onClick={() => {
              if(token){
                navigate('/item/listings');
              }else{
                navigate('/auth/login');
              }
            }}
          >
            Browse Listings
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default MoveToList;
