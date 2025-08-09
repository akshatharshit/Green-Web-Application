



// src/redux/chatslice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const chatslice = createSlice({
  name: 'chatslice',
  initialState: {
    loading: false,
    messages: [],
    error: null,
  },
  reducers: {
    chatLoading(state) {
      state.loading = true;
    },
    getChatMessages(state, action) {
      state.loading = false;
      state.messages = action.payload;
    },
    chatError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
});

export const { chatLoading, getChatMessages, chatError, addMessage } = chatslice.actions;

// ✅ Async thunk to handle chat response using Google Gemini API
export const fetchChatResponse = (message) => async (dispatch) => {
  dispatch(chatLoading());

  try {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Use your env variable
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const botResponse =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm not sure how to respond to that.";

    dispatch(addMessage({ sender: 'bot', text: botResponse }));
  } catch (error) {
    console.error(error);
    dispatch(chatError('Failed to fetch chat response from Gemini API'));
  }
};

export default chatslice.reducer;
