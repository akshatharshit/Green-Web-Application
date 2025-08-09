import React from 'react';
import { motion } from 'framer-motion';
import Lottie2 from './lottie2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Add() {
  const { token } = useSelector(state => state.auth);
  const navigate = useNavigate();

  return (
    <div className=" py-16 px-4 bg-gradient-to-r from-green-200 via-green-100 to-green-200">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-14">

        
        <motion.div
          className="md:w-1/2 flex justify-center text-center md:text-left"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              AI: Your Partner in Sustainability
            </h2>
            <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
              AI can analyze big data, forecast environmental trends, optimize resources, and uncover new ways to cut emissions. Use technology to empower your green mission.
            </p>
            <button
              className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-shadow shadow-lg"
              onClick={() => {
                if (token) {
                  navigate("/ai");
                } else {
                  navigate("/auth/login");
                }
              }}
            >
              Get AI Assistance
            </button>
          </div>
        </motion.div>

        
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Lottie2 />
        </motion.div>

      </div>
    </div>
  );
}

export default Add;
