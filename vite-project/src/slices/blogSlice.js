// src/slices/blogSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/blogs`;

// Initial state
const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
    },
    addBlog: (state, action) => {
      state.blogs.unshift(action.payload);
      state.loading = false;
    },
    removeBlog: (state, action) => {
      state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setBlogs, addBlog, removeBlog, setLoading, setError } = blogSlice.actions;

// Fetch all blogs
export const fetchBlogs = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    dispatch(setBlogs(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

// Create a new blog
export const createBlog = (blogData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/create`, blogData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(addBlog(response.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

// Delete a blog
export const deleteBlog = (id) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(removeBlog(id));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message));
  }
};

export default blogSlice.reducer;
