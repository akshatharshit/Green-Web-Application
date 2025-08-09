import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPlants } from '../../slices/plantInfoSlice'; // Adjust the path
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleButtonClick = () => {
    if (query.trim() !== '') {  // make sure query is not empty
      dispatch(searchPlants(query)); 
      navigate("/Plant-info/search");
    }
  };

  return (
    <div className="search-bar-container py-4 px-4 sm:px-8 ">
      <div className="container mx-auto flex justify-center items-center space-x-4">
        <input
          type="text"
          placeholder="Search for a plant..."
          value={query}
          onChange={handleInputChange}
          className="w-full max-w-lg p-3 rounded-lg shadow-md border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
