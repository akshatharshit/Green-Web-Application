// src/pages/PlantInfo.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlantinfoCard from '../PlantInfo/plantinfoCard'; 
import { fetchPlantDetails } from '../../slices/plantInfoSlice'; 
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

function PlantInfo() {
  const dispatch = useDispatch();

  const { Details: plants, loading, error } = useSelector((state) => state.plantinfoslice);

  useEffect(() => {
    dispatch(fetchPlantDetails());
  }, [dispatch]);

  if (loading) {
    return <div>Loading plants...</div>;
  }

  if (error) {
    return <div>Error fetching plants: {error}</div>;
  }
  return (<>
    
    <SearchBar/>
    <div className="plant-info-container py-8 px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Plants Information</h2>
      <div className="plant-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map((plant, index) => (
          <Link to={`/Plant-info/${plant.id}`} key={plant.id}>
          <PlantinfoCard name={plant.name} image={plant.image} />
        </Link>
        ))}
      </div>
    </div>
    
      </>
  );
}

export default PlantInfo;
