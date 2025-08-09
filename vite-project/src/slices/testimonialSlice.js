import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/testimonials`;

const testimonialSlice = createSlice({
  name: 'testimonial',
  initialState: {
    loading: false,
    testimonials: [],
    error: null,
  },
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.testimonials = action.payload;
    },
    addSuccess(state, action) {
      state.loading = false;
      state.testimonials.unshift(action.payload); 
    },
    deleteSuccess(state, action) {
      state.loading = false;
      state.testimonials = state.testimonials.filter(t => t._id !== action.payload);
    },
    failure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startLoading, fetchSuccess, addSuccess, deleteSuccess, failure } = testimonialSlice.actions;

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/testimonials`;

// **Fetch All Testimonials**
export const fetchTestimonials = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.get(BASE_URL);
    dispatch(fetchSuccess(response.data));
  } catch (err) {
    console.error('Error fetching testimonials:', err.response ? err.response.data : err);
    dispatch(failure(err.message));
  }
};

// **Add Testimonial**
export const addTestimonial = (testimonial) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.post(BASE_URL, testimonial);
    dispatch(addSuccess(response.data));
  } catch (err) {
    console.error('Error adding testimonial:', err.response ? err.response.data : err);
    dispatch(failure(err.message));
  }
};

// **Delete Testimonial**
export const deleteTestimonial = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    dispatch(deleteSuccess(id));
  } catch (err) {
    console.error('Error deleting testimonial:', err.response ? err.response.data : err);
    dispatch(failure(err.message));
  }
};

export default testimonialSlice.reducer;
