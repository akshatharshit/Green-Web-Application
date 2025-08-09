// src/redux/plantinfoslice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const plantinfoslice = createSlice({
  name: 'plantinfoslice',
  initialState: {
    loading: false,
    Details: [],  
    filteredPlants: [],  
    error: null,
  },
  reducers: {
    plantDetails(state) {
      state.loading = true;
    },
    getPlantDetails(state, action) {
      state.loading = false;
      state.Details = action.payload;
      state.filteredPlants = action.payload;
    },
    plantError(state, action) {
      state.loading = false;
      state.error = action.payload;  
    },
    searchPlants(state, action) {
      const query = action.payload.toLowerCase();
      state.filteredPlants = state.Details.filter((plant) =>
        plant.name.toLowerCase().includes(query)
      );
    },
  },
});

export const { plantDetails, getPlantDetails, plantError, searchPlants } = plantinfoslice.actions;

export const fetchPlantDetails = () => async (dispatch) => {
  dispatch(plantDetails());
  try {
    const response = await axios.get('/api/plants?limit=10', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TREFLE_API_KEY}`,
      },
    });
    const simplifiedData = response.data.data.map((plant) => ({
      id: plant.id,
      name: plant.common_name,
      scientific_name: plant.scientific_name,
      image: plant.image_url,
    }));
    dispatch(getPlantDetails(simplifiedData));
  } catch (error) {
    dispatch(plantError('Failed to fetch plant details'));
  }
};

export default plantinfoslice.reducer;
