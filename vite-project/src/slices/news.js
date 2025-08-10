import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const environmentSlice = createSlice({
  name: "environment",
  initialState: {
    loading: false,
    news: [],
    filteredNews: [],
    error: null,
  },
  reducers: {
    fetchNewsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getNewsSuccess(state, action) {
      state.loading = false;
      state.news = Array.isArray(action.payload) ? action.payload : [];
      state.filteredNews = state.news;
    },
    fetchNewsError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    searchNews(state, action) {
      const query = action.payload.toLowerCase();
      state.filteredNews = state.news.filter(
        (article) =>
          article.title?.toLowerCase().includes(query) ||
          article.description?.toLowerCase().includes(query)
      );
    },
  },
});

// Actions
export const {
  fetchNewsStart,
  getNewsSuccess,
  fetchNewsError,
  searchNews,
} = environmentSlice.actions;

// Selectors
export const selectFilteredNews = (state) => state.environment.filteredNews;
export const selectLoading = (state) => state.environment.loading;
export const selectError = (state) => state.environment.error;

// Thunk for fetching news from backend
export const fetchEnvironmentNews = () => async (dispatch) => {
  dispatch(fetchNewsStart());
  try {
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL ||
      process.env.REACT_APP_BACKEND_URL ||
      "http://localhost:5000"; // dev fallback

    const response = await axios.get(`${backendUrl}/api/environment-news`);

    dispatch(getNewsSuccess(response.data));
  } catch (error) {
    console.error("Error fetching environment news:", error);
    dispatch(fetchNewsError("Failed to fetch environment news"));
  }
};

export default environmentSlice.reducer;
