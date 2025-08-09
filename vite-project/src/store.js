// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import plantReducer from './slices/plantSlice';
import plantInfoReducer from './slices/plantInfoSlice';
import environmentReducer from './slices/news'
import chatsliceReducer from './slices/chatbot'
import authReducer from './slices/authSlice'
import itemCreateReducer from './slices/itemCreateSlice'
import blogReducer from './slices/blogSlice'
import submissionReducer from './slices/submissionSlice'
import testimonialReducer from './slices/testimonialSlice'
import upiReducer from './slices/upiSlice'

export const store = configureStore({
  reducer: {
    plant: plantReducer,
    plantinfoslice: plantInfoReducer,
    environment: environmentReducer,
    chat: chatsliceReducer,
    auth: authReducer,
    itemCreate: itemCreateReducer,
    blogs: blogReducer,
    submission: submissionReducer,
    testimonial: testimonialReducer,
    upi: upiReducer,
  },
});
