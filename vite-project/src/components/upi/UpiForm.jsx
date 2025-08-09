import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadUPI } from '../../slices/upiSlice';

const UpiForm = () => {
  const [upiId, setUpiId] = useState('');
  const [qrImage, setQrImage] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('upiId', upiId);
    formData.append('qrImage', qrImage);

    dispatch(uploadUPI(formData));
    setUpiId('');
    setQrImage(null);
  };

  return (
    <div className="max-w-md mx-auto mt-12 px-6 py-8 rounded-2xl shadow-xl bg-white">
      <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Add Your UPI Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">UPI ID</label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required
            placeholder="example@upi"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">QR Code Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setQrImage(e.target.files[0])}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-green-100 file:text-green-800 hover:file:bg-green-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 transition duration-200 shadow-md"
        >
          Upload UPI
        </button>
      </form>
    </div>
  );
};

export default UpiForm;
