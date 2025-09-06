import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../slices/blogSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

function Blog() {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center text-green-500 text-lg mt-10">
        Loading blogs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        Error: {error}
      </div>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
      toast.success("✅ Blog deleted successfully!", {
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
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
        🌱 Farmer Community Blogs
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-600">No blogs found</p>
      ) : (
        <div className="w-full max-w-4xl space-y-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="border-b border-gray-200 pb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Title */}
              <h2 className="text-xl font-semibold text-green-700 mb-2 hover:underline cursor-pointer">
                {blog.title}
              </h2>

              {/* Content + Image */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {blog.content}
                  </p>
                  <p className="mt-2 text-xs text-gray-500 italic">
                    ✍️ By{" "}
                    <span className="font-semibold">
                      {blog.author?.userName || "Anonymous"}
                    </span>
                  </p>
                </div>

                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-28 h-28 object-cover rounded-lg shadow"
                  />
                )}
              </div>

              {/* Actions */}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-red-600 border border-red-300 rounded hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
