// src/redux/environmentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const environmentSlice = createSlice({
  name: 'environment',
  initialState: {
    loading: false,
    news: [],
    filteredNews: [],
    error: null,
  },
  reducers: {
    fetchNewsStart(state) {
      state.loading = true;
    },
    getNewsSuccess(state, action) {
      state.loading = false;
      state.news = action.payload;
      state.filteredNews = action.payload;
    },
    fetchNewsError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    searchNews(state, action) {
      const query = action.payload.toLowerCase();
      state.filteredNews = state.news.filter((article) =>
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
      );
    },
  },
});

// Actions
export const { fetchNewsStart, getNewsSuccess, fetchNewsError, searchNews } = environmentSlice.actions;

// Selectors
export const selectFilteredNews = (state) => state.environment.filteredNews;
export const selectLoading = (state) => state.environment.loading;
export const selectError = (state) => state.environment.error;

// Thunk for fetching news
export const fetchEnvironmentNews = () => async (dispatch) => {
  dispatch(fetchNewsStart());
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'environment',
        apiKey: import.meta.env.VITE_REACT_APP_NEWS_API_KEY

      },
    });
    
    const simplifiedData = response.data.articles.map((article) => ({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
    }));
    dispatch(getNewsSuccess(simplifiedData));
  } catch (error) {
    dispatch(fetchNewsError('Failed to fetch environment news'));
  }
};

export default environmentSlice.reducer;
