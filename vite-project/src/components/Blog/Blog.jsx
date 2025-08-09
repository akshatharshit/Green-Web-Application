import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs, deleteBlog } from '../../slices/blogSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';


function Blog() {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center text-green-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(id));
      toast.success('Blog deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
   
    <div className="min-h-screen  flex flex-col items-center justify-start py-6 px-4">
      <h1 className="text-4xl font-extrabold text-green-800 mb-8 text-center">
        🌱 All Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-green-600 text-lg">No blogs found</p>
      ) : (
        <div className="space-y-8 w-full max-w-4xl">
          {blogs.map((blog) => (
            <motion.div
            key={blog._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              >
              <h2 className="text-2xl font-semibold text-green-700">{blog.title}</h2>

              {/* Blog content and image */}
              <div className="flex flex-col md:flex-row items-start mt-4">
                <div className="flex-1">
                  <p className="text-green-600 text-base">{blog.content}</p>
                  <p className="mt-2 text-sm text-gray-500">By {blog.author?.userName || 'Anonymous'}</p>
                </div>

                {blog.imageUrl && (
                  <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-32 h-32 object-cover rounded-lg mt-4 md:mt-0 md:ml-6"
                  />
                )}
              </div>

              <button
                onClick={() => handleDelete(blog._id)}
                className="mt-4 text-red-600 text-sm hover:underline"
                >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
   
      </>
  );
}

export default Blog;
