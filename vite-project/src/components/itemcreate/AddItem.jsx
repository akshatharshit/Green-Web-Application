import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie5 from './Lottie5';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUPI } from '../../slices/upiSlice';

function AddItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [upiData, setUpiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUPIData = async () => {
      try {
        const resultAction = await dispatch(fetchUPI());
        if (fetchUPI.fulfilled.match(resultAction)) {
          setUpiData(resultAction.payload);
        } else {
          console.warn("Fetch failed:", resultAction.payload?.message);
        }
      } catch (error) {
        console.error("Unexpected error fetching UPI data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUPIData();
  }, [dispatch]);

  const hasUPIData = upiData && Object.keys(upiData).length > 0;

  return (
    <div className="py-20 px-4 mb-16 mt-16 bg-gradient-to-r from-green-200 via-green-100 to-green-200">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div
          className="md:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6 leading-tight">
            Give Items a Second Life
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed">
            Turn your unused items into something valuable. Promote reusability and help reduce waste — while earning from things you no longer need.
          </p>

          <button
            onClick={() => navigate('/item/create')}
            className="px-6 py-3 mr-8 bg-green-700 text-white rounded-xl hover:bg-green-800 transition shadow-lg mb-4 gap-3"
          >
            Create Item
          </button>

          { !hasUPIData && (
            <>
              <button
                onClick={() => navigate('/upiId')}
                className="px-6 py-3 mr-8 bg-green-700 text-white rounded-xl hover:bg-green-800 transition shadow-lg mb-4"
              >
                Fill UPI Details
              </button>
              <button
                onClick={() => navigate('/upiId/edit')}
                className="px-6 py-3 bg-green-700 text-white rounded-xl hover:bg-green-800 transition shadow-lg mb-4"
              >
                UPI Details
              </button>
            </>
          )}
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Lottie5 />
        </motion.div>
      </div>
    </div>
  );
}

export default AddItem;
