import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  FaCloudSun,
  FaWind,
  FaTint,
  FaLeaf,
  FaMapMarkerAlt,
  FaSun,
  FaCloudRain,
  FaRegClock,
} from "react-icons/fa";

const key = import.meta.env.VITE_WEATHER_API_KEY;

export default function LocationWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation({ lat: latitude, lon: longitude });

      try {
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
        );
        setWeather(weatherRes.data);

        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
        );

        setForecast(groupForecastByDay(forecastRes.data.list));
        setHourlyForecast(forecastRes.data.list);
      } catch (err) {
        console.error("Could not fetch weather:", err);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const groupForecastByDay = (list) => {
    const days = {};
    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      if (!days[day]) days[day] = [];
      days[day].push(item);
    });

    return Object.entries(days).slice(0, 3).map(([day, entries]) => {
      const temps = entries.map((e) => e.main.temp);
      const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
      const minTemp = Math.min(...temps).toFixed(1);
      const maxTemp = Math.max(...temps).toFixed(1);
      const condition = entries[0].weather[0].main;
      const icon = entries[0].weather[0].icon;
      return { day, temp: avgTemp, minTemp, maxTemp, condition, icon };
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-lime-100">
        <Loader2 className="animate-spin w-10 h-10 text-green-600" />
      </div>
    );
  }

  if (!weather) return null;

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto mt-10 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Left - Current Weather */}
      <motion.div
        className="bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100 shadow-xl rounded-2xl p-6 flex flex-col justify-between"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex justify-between items-center mb-3">
          <div className="text-xl font-bold text-green-800 flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-500" />
            {weather.name}
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="w-16 h-16"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-blue-700 flex items-center gap-1">
              <FaCloudSun className="text-yellow-400" /> {weather.weather[0].main}
            </p>
            <p className="text-3xl font-bold text-green-900">{weather.main.temp}°C</p>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <FaWind className="text-green-400" /> Wind: {weather.wind.speed} m/s
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <FaTint className="text-blue-400" /> Humidity: {weather.main.humidity}%
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <FaLeaf className="text-green-500" /> Pressure: {weather.main.pressure} hPa
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => navigate("/weather")}
            className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition hover:scale-105 text-sm font-semibold flex items-center gap-2"
          >
            <FaCloudRain className="text-blue-200" />
            Check Weather
          </button>
        </div>
      </motion.div>

      {/* Right - Forecast */}
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-6"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-lg font-bold text-center text-green-700 mb-4 flex items-center justify-center gap-2">
          <FaSun className="text-yellow-400" /> Upcoming Weather
        </h3>
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          {forecast.map((day, idx) => (
            <motion.div
              key={idx}
              className="text-center flex-1 bg-green-50 rounded-xl p-3 shadow hover:shadow-lg transition-all"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="font-bold text-green-600 text-sm">{day.day}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.condition}
                className="w-12 h-12 mx-auto"
              />
              <p className="text-xl text-blue-800 font-bold">{day.temp}°C</p>
              <p className="text-xs text-gray-500">{day.condition}</p>
              <p className="text-xs text-gray-500">
                {day.minTemp}°C - {day.maxTemp}°C
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Third - Map */}
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-6 mt-4"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-lg font-bold text-center text-green-700 mb-4 flex items-center justify-center gap-2">
          <FaMapMarkerAlt className="text-green-500" /> Your Current Location
        </h3>
        {location && (
          <MapContainer
            center={location}
            zoom={13}
            style={{ height: "220px", borderRadius: "12px" }}
            className="overflow-hidden"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location}>
              <Popup>
                <span className="text-green-700 font-semibold">
                  <FaLeaf className="inline mr-1" />
                  You are here!
                </span>
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </motion.div>

      {/* Fourth - Hourly Weather */}
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-6 mt-4"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-lg font-bold text-center text-green-700 mb-4 flex items-center justify-center gap-2">
          <FaRegClock className="text-green-500" /> Hourly Weather for Today
        </h3>
        {hourlyForecast.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {hourlyForecast.slice(0, 8).map((hour, idx) => {
              const date = new Date(hour.dt * 1000);
              const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

              return (
                <motion.div
                  key={idx}
                  className="text-center flex-1 bg-green-50 rounded-xl p-2 shadow hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {hour.weather && hour.weather[0]?.icon ? (
                    <div>
                      <p className="font-bold text-green-600 text-sm">{time}</p>
                      <img
                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                        alt={hour.weather[0].description}
                        className="w-10 h-10 mx-auto"
                      />
                      <p className="text-lg text-blue-800">{hour.main.temp}°C</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold text-green-600 text-sm">{time}</p>
                      <p className="text-lg text-blue-800">Data unavailable</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hourly data available</p>
        )}
      </motion.div>

      {/* Agriculture Tip */}
      <motion.div
        className="col-span-1 lg:col-span-2 bg-gradient-to-r from-green-100 via-lime-100 to-emerald-100 border border-green-200 rounded-xl shadow p-6 flex items-center gap-4 mt-6 animate-fade-in"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <FaLeaf className="text-green-500 text-2xl animate-bounce" />
        <span className="text-green-700 font-semibold text-lg">
          Tip: Monitor weather for smarter farming and healthier crops!
        </span>
      </motion.div>

      <style>
        {`
          .animate-fade-in {
            animation: fade-in 0.7s;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </motion.div>
  );
}
