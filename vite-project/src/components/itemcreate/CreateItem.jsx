import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../../slices/itemCreateSlice';

import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function CreateItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.itemCreate);

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
  });

 
  if (!token) {
    toast.error('User not found. Please log in again.');
    navigate('/auth/login');
    return;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('image', form.image);
    data.append('seller', user._id);

    const result = await dispatch(createItem(data, token));

    navigate('/item/listings');
    if (result.success) {
      toast.success('Item listed successfully!');
    } else {
      toast.error(result.error || 'Failed to list item. Please try again.');
    }
  };

  return (
    <>
      
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl p-8 bg-white border border-emerald-200 rounded-3xl shadow-xl">
          <h2 className="text-4xl font-bold text-emerald-800 mb-6 text-center">
            Put a Reusable Item for Sale 🌿
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            <input
              type="text"
              name="title"
              placeholder="Item Title"
              className="w-full px-4 py-3 rounded-xl border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm placeholder:text-gray-500"
              onChange={handleChange}
              value={form.title}
            />

            <textarea
              name="description"
              placeholder="Describe your item..."
              rows="4"
              className="w-full px-4 py-3 rounded-xl border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm placeholder:text-gray-500"
              onChange={handleChange}
              value={form.description}
            />

            <input
              type="number"
              name="price"
              placeholder="Price (in ₹)"
              className="w-full px-4 py-3 rounded-xl border border-emerald-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm placeholder:text-gray-500"
              onChange={handleChange}
              value={form.price}
            />

            <div>
              <label className="block mb-1 font-medium text-emerald-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-4 py-2 rounded-xl border border-emerald-300 bg-white focus:outline-none shadow-sm"
                onChange={handleFileChange}
              />
            </div>

            
            {form.image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-xl shadow border border-emerald-200"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white text-lg font-semibold py-3 rounded-xl shadow-md hover:bg-emerald-700 transition duration-200"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'List Item'}
            </button>
          </form>

          {error && (
            <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
          )}
        </div>
      </div>
      

      
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}

export default CreateItem;
