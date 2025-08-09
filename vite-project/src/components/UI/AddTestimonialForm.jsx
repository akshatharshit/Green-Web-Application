import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTestimonial } from '../../slices/testimonialSlice';
import { toast } from 'react-toastify';

const AddTestimonialForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
    img: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      toast.error("Name and message are required.");
      return;
    }

    if (!form.img) {
      toast.error("Please enter a valid image URL.");
      return;
    }

    try {
      setLoading(true);
      await dispatch(addTestimonial(form)).unwrap();
      toast.success("🌱 Testimonial submitted!");
      setForm({ name: '', img: '', message: '' });
    } catch {
      // toast.error("Failed to submit testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 mt-12 bg-white rounded-lg shadow-lg border border-green-200 ">
      <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">Share Your Experience</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-lg font-medium text-green-700">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm focus:outline-none transition"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="img" className="text-lg font-medium text-green-700">Image URL </label>
          <input
            type="url"
            id="img"
            name="img"
            value={form.img}
            onChange={handleChange}
            placeholder="Enter image URL (optional)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm focus:outline-none transition"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-lg font-medium text-green-700">Your Testimonial</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Share your experience"
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 shadow-sm focus:outline-none transition"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-lg font-semibold rounded-lg text-white ${loading ? 'bg-green-300' : 'bg-green-600'} hover:bg-green-700 focus:outline-none transition ease-in-out duration-300`}
        >
          {loading ? 'Submitting...' : 'Submit Testimonial'}
        </button>
      </form>
    </div>
  );
};

export default AddTestimonialForm;
