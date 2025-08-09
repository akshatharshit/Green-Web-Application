import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, LocateIcon } from "lucide-react";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for react-toastify
import WeatherMap from "./WeatherMap";

// Dummy weather data for fallback
const dummyWeather = {
  name: "Greenland",
  sys: { country: "GL" },
  weather: [{ main: "Clear", icon: "01d" }],
  main: { temp: 22, feels_like: 20, humidity: 40 },
  wind: { speed: 5 },
};

const dummyForecast = [
  { day: "Mon", temp: "20°C", condition: "Clear", icon: "01d" },
  { day: "Tue", temp: "22°C", condition: "Partly Cloudy", icon: "02d" },
  { day: "Wed", temp: "24°C", condition: "Cloudy", icon: "03d" },
  { day: "Thu", temp: "19°C", condition: "Rainy", icon: "09d" },
  { day: "Fri", temp: "21°C", condition: "Clear", icon: "01d" },
];

export default function WeatherTemp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const key = import.meta.env.VITE_WEATHER_API_KEY;

  const groupForecastByDay = (list) => {
    const days = {};
    list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });
      if (!days[day]) days[day] = [];
      days[day].push(item);
    });

    return Object.entries(days)
      .slice(0, 5)
      .map(([day, entries]) => {
        const temps = entries.map((e) => e.main.temp);
        const avgTemp = (
          temps.reduce((a, b) => a + b, 0) / temps.length
        ).toFixed(1);
        const condition = entries[0].weather[0].main;
        const icon = entries[0].weather[0].icon;
        return { day, temp: avgTemp, condition, icon };
      });
  };

  const groupHourlyForecast = (list) => {
    return list
      .filter((item, idx) => idx % 3 === 0)
      .map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: item.main.temp,
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
      }));
  };

  const fetchWeatherByCoords = async (latitude, longitude) => {
    try {
      setLoading(true);
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`
      );

      setWeather(weatherRes.data);
      setForecast(groupForecastByDay(forecastRes.data.list));
      setHourlyWeather(groupHourlyForecast(forecastRes.data.list));
    } catch {
      setWeather(dummyWeather);
      setForecast(dummyForecast);
      setHourlyWeather([]);
      toast.error("Unable to fetch weather data. Showing dummy data.");
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        toast.error("Location access denied.");
      }
    );
  };

  const searchWeather = async (city) => {
    const searchQuery = city || query;
    if (!searchQuery) return;

    try {
      setLoading(true);
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${key}&units=metric`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${key}&units=metric`
      );

      setWeather(weatherRes.data);
      setForecast(groupForecastByDay(forecastRes.data.list));
      setHourlyWeather(groupHourlyForecast(forecastRes.data.list));
    } catch {
      toast.error("City not found.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load: try geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          setWeather(dummyWeather);
          setForecast(dummyForecast);
          toast.warn("Could not fetch location, showing dummy data.");
        }
      );
    } else {
      setWeather(dummyWeather);
      setForecast(dummyForecast);
      toast.warn("Geolocation not supported, showing dummy data.");
    }
  }, []);

  return (
    <div className="min-h-screen  py-14 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-2xl shadow-xl p-8 ">
        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex gap-4"
        >
          <input
            type="text"
            placeholder="🌍 Enter city (e.g., Delhi)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchWeather()}
            className="w-full p-4 border border-green-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 bg-white placeholder:text-green-700 text-green-800"
          />
          <button
            onClick={handleGeolocation}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl flex items-center justify-center"
            title="Use my location"
          >
            <LocateIcon className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center my-8">
            <Loader2 className="animate-spin w-10 h-10 text-green-700" />
          </div>
        )}

        {/* Current Weather */}
        {weather && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-green-100">
              <h2 className="text-3xl font-semibold text-green-800">
                {weather.name}, {weather.sys.country}
              </h2>
              <div className="flex justify-center items-center mt-4 gap-2">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  className="w-16 h-16"
                />
                <p className="text-xl text-blue-700">
                  {weather.weather[0].main}
                </p>
              </div>
              <p className="text-5xl font-bold text-green-900 mt-2">
                {weather.main.temp}°C
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Feels like: {weather.main.feels_like}°C | Humidity:{" "}
                {weather.main.humidity}% | Wind: {weather.wind.speed} m/s
              </p>
            </div>
          </motion.div>
        )}

        {/* Hourly Weather */}
        {hourlyWeather.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              🕒 Hourly Forecast
            </h3>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4">
                {hourlyWeather.map((hour, idx) => (
                  <div
                    key={idx}
                    className="min-w-[90px] bg-white border border-green-100 shadow-sm rounded-lg p-4 text-center"
                  >
                    <p className="text-green-700 text-sm font-medium">{hour.time}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
                      alt={hour.condition}
                      className="w-10 h-10 mx-auto"
                    />
                    <p className="text-blue-700 text-xl">{hour.temp}°</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 5-Day Forecast */}
        {forecast.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              📅 5-Day Forecast
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {forecast.map((day, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-green-100 shadow-xl rounded-xl p-6 text-center"
                >
                  <p className="font-semibold text-green-700">{day.day}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt={day.condition}
                    className="w-16 h-16 mx-auto"
                  />
                  <p className="text-lg text-blue-700">{day.condition}</p>
                  <p className="font-bold text-2xl text-green-800">{day.temp}°</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {/* Map */}
        <div className="mt-8">
          <WeatherMap />
        </div>
      </div>
    </div>
  );
}