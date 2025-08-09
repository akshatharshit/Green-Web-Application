import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  item: null,
  loading: false,
  error: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    itemListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    itemListSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload; 
    },
    itemListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    },
    itemCreateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    itemCreateSuccess: (state, action) => {
      state.loading = false;
      state.item = action.payload; 
    },
    itemCreateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    },
    itemDeleteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    itemDeleteSuccess: (state, action) => {
      state.loading = false;
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    itemDeleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    },
  },
});

export const {
  itemListStart,
  itemListSuccess,
  itemListFailure,
  itemCreateStart,
  itemCreateSuccess,
  itemCreateFailure,
  itemDeleteStart,
  itemDeleteSuccess,
  itemDeleteFailure,
} = itemSlice.actions;

// Async action for listing items
export const listItems = () => async (dispatch) => {
  dispatch(itemListStart());
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/item`);
    dispatch(itemListSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error fetching items';
    dispatch(itemListFailure(errorMessage));
  }
};

// Async action for creating an item
export const createItem = (itemData, token) => async (dispatch) => {
  dispatch(itemCreateStart());
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/item/create`, itemData, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    dispatch(itemCreateSuccess(response.data)); 
    return { success: true };
  } catch (error) {
    dispatch(itemCreateFailure(error.response?.data?.message || 'Error creating item'));
    return { success: false };
  }
};

// Async action for deleting an item
export const deleteItem = (itemId, token) => async (dispatch) => {
  dispatch(itemDeleteStart());
  try {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/item/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    dispatch(itemDeleteSuccess(itemId)); 
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Error deleting item';
    dispatch(itemDeleteFailure(errorMessage)); 
  }
};

export default itemSlice.reducer;
