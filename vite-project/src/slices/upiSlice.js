import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const upiSlice = createSlice({
  name: 'upi',
  initialState: {
    loading: false,
    upiList: [],
    error: null,
  },
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    uploadSuccess(state, action) {
      state.loading = false;
      state.upiList.push(action.payload); 
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.upiList = action.payload; 
    },
    deleteSuccess(state, action) {
      state.loading = false;
      state.upiList = state.upiList.filter((upi) => upi._id !== action.payload);
    },
    updateSuccess(state, action) {
      state.loading = false;
      state.upiList = state.upiList.map((upi) =>
        upi._id === action.payload._id ? action.payload : upi
      );
    },
    failure(state, action) {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    },
  },
});

export const {
  startLoading,
  uploadSuccess,
  fetchSuccess,
  deleteSuccess,
  updateSuccess,
  failure,
} = upiSlice.actions;

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/upi`;

export const uploadUPI = (formData) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await axios.post(`${API_URL}/`, formData, config);
    dispatch(uploadSuccess(res.data));
  } catch (err) {
    console.error(err.response?.data || err);
    dispatch(failure(err.response?.data?.message));
  }
};

export const fetchUPI = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchSuccess(res.data));
  } catch (err) {
    console.error(err.response?.data || err);
    dispatch(failure(err.response?.data?.message));
  }
};

export const deleteUPI = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(deleteSuccess(id));
  } catch (err) {
    console.error(err.response?.data || err);
    dispatch(failure(err.response?.data?.message));
  }
};

export const updateUPI = (id, formData) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    const res = await axios.put(`${API_URL}/${id}`, formData, config);
    dispatch(updateSuccess(res.data));
  } catch (err) {
    console.error(err.response?.data || err);
    dispatch(failure(err.response?.data?.message));
  }
};

export default upiSlice.reducer;
