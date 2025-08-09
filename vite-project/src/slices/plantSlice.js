// plantSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const plantSlice = createSlice({
    name: "plant",
    initialState: {
        loading: false,
        Details: {},  
    },
    reducers: {
        plantDetails(state) {
            state.loading = true;
        },
        getPlantDetails(state, action) {
            state.loading = false;
            state.Details = action.payload;
        }
    }
});

export const { plantDetails, getPlantDetails } = plantSlice.actions;

export const fetchPlantDetails = () => async (dispatch) => {
    dispatch(plantDetails()); 
    try {
        const response = await axios.get("https://uselessfacts.jsph.pl/api/v2/facts/random");
        dispatch(getPlantDetails(response.data));  
    } catch (error) {
        console.log(error);  
    }
};

export default plantSlice.reducer;
