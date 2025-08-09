import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,  
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); 
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); 
    },
  },
});

export const { authStart, authSuccess, authFailure, logout } = authSlice.actions;

// Login user
export const loginUser = (credentials) => async (dispatch) => {
  dispatch(authStart());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, credentials);
    dispatch(authSuccess(response.data));
    return { success: true };
  } catch (error) {
    dispatch(authFailure(error.response?.data?.message || 'Login failed'));
    return { success: false };
  }
};

// Register user and auto-login
export const registerUser = (data) => async (dispatch) => {
  dispatch(authStart());
  try {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`
      , data);
    return dispatch(loginUser({ email: data.email, password: data.password }));
  } catch (error) {
    dispatch(authFailure(error.response?.data?.message || 'Registration failed'));
    return { success: false };
  }
};

export default authSlice.reducer;
