import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../slices/blogSlice';
import { toast, ToastContainer } from 'react-toastify';
import { motion } from 'framer-motion';
import { ImagePlus, FileText, Type } from "lucide-react";
import 'react-toastify/dist/ReactToastify.css';

const CreateBlog = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    await dispatch(createBlog(formData));
    toast.success('🌱 Blog created successfully!');
    setTitle('');
    setContent('');
    setImage(null);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-green-50 via-white to-green-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-green-200"
        >
          <h2 className="text-3xl font-extrabold text-green-800 mb-8 text-center flex items-center justify-center gap-2">
            🌿 Create a Blog Post
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-green-800 font-semibold mb-2 flex items-center gap-2">
                <Type className="w-5 h-5 text-green-600" /> Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-green-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
                placeholder="Enter blog title..."
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-green-800 font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" /> Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={6}
                className="w-full border border-green-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm resize-none"
                placeholder="Write your blog content here..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-green-800 font-semibold mb-2 flex items-center gap-2">
                <ImagePlus className="w-5 h-5 text-green-600" /> Upload Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="w-full text-green-700 file:bg-green-100 file:text-green-800 file:rounded-lg file:border-none file:px-4 file:py-2 hover:file:bg-green-200 cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
            >
              + Publish Blog
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default CreateBlog;
