import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import loc from '../../assets/location-icon.png';
import { FaCloudSun, FaWind, FaTint, FaLeaf, FaSmog, FaMapMarkerAlt } from "react-icons/fa";

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
    return (
      <div className="flex items-center justify-center h-96">
        <span className="text-green-700 font-semibold text-lg animate-pulse">
          <FaMapMarkerAlt className="inline mr-2" />
          Loading your location...
        </span>
      </div>
    );
  }

  const mapCenter = [location.latitude, location.longitude];
  const zoom = 13;

  return (
    <div className="mt-10 max-w-3xl mx-auto">
      {/* Air Quality */}
      {airQualityData && !loading && (
        <div className="mb-8 p-6 rounded-2xl shadow-xl bg-gradient-to-r from-green-50 via-emerald-100 to-lime-50 border border-green-200 flex items-center gap-6 animate-fade-in">
          <FaSmog className="text-3xl text-green-400" />
          <div>
            <h3 className="text-xl font-bold text-green-700 mb-2 flex items-center gap-2">
              <FaLeaf className="text-green-500" /> Air Quality Information
            </h3>
            <div className="text-gray-700 grid grid-cols-2 gap-x-8 gap-y-1">
              <span className="flex items-center gap-2">
                AQI: <span className="font-semibold text-green-800">{airQualityData.aqi}</span>
              </span>
              <span className="flex items-center gap-2">
                CO: <span className="font-semibold text-green-800">{airQualityData.co} µg/m³</span>
              </span>
              <span className="flex items-center gap-2">
                PM2.5: <span className="font-semibold text-green-800">{airQualityData.pm2_5} µg/m³</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      <div className="rounded-2xl shadow-2xl h-96 mb-8 border-2 border-green-200 overflow-hidden animate-fade-in">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          className="rounded-2xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={mapCenter}
            icon={L.icon({
              iconUrl: loc,
              iconSize: [40, 40],
            })}
          >
            <Popup>
              <div className="text-center">
                <h3 className="text-lg font-bold text-green-700 mb-2 flex items-center justify-center gap-2">
                  <FaCloudSun className="text-yellow-400" /> Weather Info
                </h3>
                {weatherData ? (
                  <div className="space-y-1 text-gray-700">
                    <p>
                      <FaCloudSun className="inline text-yellow-400 mr-1" />
                      Temperature: <span className="font-semibold">{weatherData.main.temp}°C</span>
                    </p>
                    <p>
                      <FaTint className="inline text-blue-400 mr-1" />
                      Humidity: <span className="font-semibold">{weatherData.main.humidity}%</span>
                    </p>
                    <p>
                      <FaWind className="inline text-green-500 mr-1" />
                      Wind Speed: <span className="font-semibold">{weatherData.wind.speed} m/s</span>
                    </p>
                  </div>
                ) : (
                  <p>Loading weather data...</p>
                )}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Agriculture Tip */}
      <div className="bg-gradient-to-r from-green-100 via-lime-100 to-emerald-100 border border-green-200 rounded-xl shadow p-6 flex items-center gap-4 animate-fade-in">
        <FaLeaf className="text-green-500 text-2xl animate-bounce" />
        <span className="text-green-700 font-semibold text-lg">
          Tip: Monitor weather and air quality for healthier crops and smarter farming decisions!
        </span>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.7s;
          }
        `}
      </style>
    </div>
  );
};

export default WeatherMap;
