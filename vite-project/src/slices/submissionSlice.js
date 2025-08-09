// features/submissions/submissionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const submissionSlice = createSlice({
  name: 'submission',
  initialState: {
    loading: false,
    submissions: [],
  },
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    uploadSuccess(state, action) {
      state.loading = false;
      state.submissions.push(action.payload);
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.submissions = action.payload;
    },
    deleteSuccess(state, action) {
      state.loading = false;
      state.submissions = state.submissions.filter(s => s._id !== action.payload);
    },
    failure(state) {
      state.loading = false;
    }
  }
});

export const {
  startLoading,
  uploadSuccess,
  fetchSuccess,
  deleteSuccess,
  failure
} = submissionSlice.actions;

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/submission`;

// **Upload Submission**
export const uploadSubmission = (formData) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', 
      },
    };

    
    const response = await axios.post(`${API_URL}/sub`, formData, config);
    dispatch(uploadSuccess(response.data));
  } catch (err) {
    console.error('Error uploading submission:', err.response ? err.response.data : err);
    dispatch(failure());
  }
};


export const fetchAllSubmissions = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.get(`${API_URL}/`);
    dispatch(fetchSuccess(response.data));
  } catch (err) {
    console.error('Error fetching submissions:', err.response ? err.response.data : err);
    dispatch(failure());
  }
};


export const deleteSubmission = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    
    const token = localStorage.getItem('token'); 

    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    };

    
    await axios.delete(`${API_URL}/${id}`, config); 
    dispatch(deleteSuccess(id));
  } catch (err) {
    console.error('Error deleting submission:', err.response ? err.response.data : err);
    dispatch(failure());
  }
};


export default submissionSlice.reducer;
