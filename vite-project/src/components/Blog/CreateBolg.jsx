import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../../slices/blogSlice';
import { toast, ToastContainer } from 'react-toastify';
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
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            🌿 Create New Blog
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-green-800 font-semibold mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-green-800 font-semibold mb-1">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={5}
                className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Write your blog content here..."
              />
            </div>

            <div>
              <label className="block text-green-800 font-semibold mb-1">Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="w-full text-green-700 file:bg-green-100 file:text-green-800 file:rounded-md file:border-none file:px-4 file:py-1 hover:file:bg-green-200"
              />
            </div>

            <button
              type="submit"
              className="text-green-700 font-semibold hover:underline hover:text-green-900 transition-all"
            >
              + Post Blog
            </button>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default CreateBlog;
