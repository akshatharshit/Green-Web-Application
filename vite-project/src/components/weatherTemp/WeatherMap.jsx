import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import loc from '../../assets/location-icon.png'

// OpenWeatherMap API Key (replace with your own API key)
const key = import.meta.env.VITE_WEATHER_API_KEY;

const WeatherMap = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user's location from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          // You can set a default location here if needed
          setLocation({ latitude: 40.730610, longitude: -73.935242 }); // Default: New York City
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location) {
      const fetchWeatherData = async () => {
        try {
          setLoading(true);
          // Fetch weather data
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${key}&units=metric`
          );
          setWeatherData(weatherResponse.data);

          // Fetch air quality data
          const airQualityResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.latitude}&lon=${location.longitude}&appid=${key}`
          );
          setAirQualityData(airQualityResponse.data.list[0].main);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Failed to fetch data:", error);
        }
      };
      fetchWeatherData();
    }
  }, [location]);

  if (!location) {
    return <div>Loading your location...</div>;
  }

  const mapCenter = [location.latitude, location.longitude];
  const zoom = 13;

  return (
    <div className="mt-6">
      {/* Air Quality */}
      {airQualityData && !loading && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-green-500">Air Quality Information</h3>
          <div className="text-gray-700">
            <p>AQI: {airQualityData.aqi}</p>
            <p>CO: {airQualityData.co} µg/m³</p>
            <p>PM2.5: {airQualityData.pm2_5} µg/m³</p>
          </div>
        </div>
      )}

      {/* Map */}
      <div className="rounded-lg shadow-lg h-96 mb-6">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg shadow-lg" 
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={mapCenter}
            icon={L.icon({
              iconUrl: loc, // Ensure this path is correct
              iconSize: [35, 35], // Increased size for visibility
            })}
          >
            <Popup>
              <div>
                <h3 className="text-lg font-bold">Weather Info</h3>
                {weatherData ? (
                  <>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                  </>
                ) : (
                  <p>Loading weather data...</p>
                )}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default WeatherMap;
