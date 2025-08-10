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
      state.error = null;
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

export const { plantDetails, getPlantDetails, plantError, searchPlants } =
  plantinfoslice.actions;

// Fetch from backend instead of Trefle API directly
export const fetchPlantDetails = () => async (dispatch) => {
  dispatch(plantDetails());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/plants`
    );

    // Format the plant data
    const simplifiedData = response.data.data.map((plant) => ({
      id: plant.id,
      name: plant.common_name || 'Unknown',
      scientific_name: plant.scientific_name,
      image: plant.image_url,
    }));

    dispatch(getPlantDetails(simplifiedData));
  } catch (error) {
    console.error('Backend API Error:', error);
    dispatch(plantError('Failed to fetch plant details'));
  }
};

export default plantinfoslice.reducer;
