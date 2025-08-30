import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSeedling, FaLeaf, FaTractor, FaCheckCircle, FaRegSmileBeam } from "react-icons/fa";

const fieldSuggestions = {
  Temperature: "Current air temperature in °C (auto-fetched if location is allowed).",
  Humidity: "Relative humidity (%) — affects soil moisture and crop health.",
  Moisture: "Soil moisture (%) — estimated from humidity but can be adjusted.",
  SoilType: "Type of soil (e.g., Sandy, Loamy, Clay, Silt).",
  CropName: "Name of the crop you are growing (e.g., Wheat, Rice, Maize).",
  pH: "Soil pH level (recommended range: 5.5 - 7.5).",
  Phosphorus: "Available phosphorus in soil (mg/kg or ppm).",
  TargetYield: "Target yield for the crop (tons/hectare).",
  TotalNitrogen: "Nitrogen content in the soil (%) — key for leafy growth.",
  OrganicCarbon: "Organic carbon content (%) — indicates soil fertility.",
  Potassium: "Exchangeable potassium in soil (mg/kg).",
  FieldSize: "Size of your field in hectares (ha).",
};

const backendKeyMap = {
  Temperature: "Temperature",
  Humidity: "Humidity",
  Moisture: "Moisture",
  SoilType: "Soil Type",
  CropName: "Crop Name",
  pH: "pH (water)",
  Phosphorus: "Phosphorus (M3)",
  TargetYield: "Target Yield",
  TotalNitrogen: "Total Nitrogen",
  OrganicCarbon: "Organic Carbon",
  Potassium: "Potassium (exch.)",
  FieldSize: "Field Size",
};

const soilOptions = ["Sandy", "Loamy", "Clay", "Silt"];
const cropOptions = ["Wheat", "Rice", "Maize", "Barley", "Soybean"];

const languageLabels = {
  en: "English",
  hi: "Hindi",
  od: "Odia",
};

const FertilizerPredictor = () => {
  const [location, setLocation] = useState("");
  const [formData, setFormData] = useState({
    Temperature: "",
    Humidity: "",
    Moisture: "",
    SoilType: "",
    CropName: "",
    pH: "",
    Phosphorus: "",
    TargetYield: "",
    TotalNitrogen: "",
    OrganicCarbon: "",
    Potassium: "",
    FieldSize: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(true);
  const [aiResponse, setAiResponse] = useState("");
  const [language, setLanguage] = useState("en");

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch location-based weather
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationAllowed(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
          if (!apiKey) return;
          const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: { lat: latitude, lon: longitude, appid: apiKey, units: "metric" },
          });
          const cityName = res.data.name;
          setLocation(cityName);
          const weather = res.data.main;
          setFormData((prev) => ({
            ...prev,
            Temperature: weather.temp,
            Humidity: weather.humidity,
            Moisture: Math.min(100, weather.humidity * 0.5).toFixed(1),
          }));
        } catch (err) {
          setLocationAllowed(false);
        }
      },
      () => setLocationAllowed(false)
    );
  }, []);

  const fetchWeather = async () => {
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      if (!apiKey) return alert("Missing OpenWeather API key!");
      if (!location.trim()) return alert("Please enter a valid city name.");
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: { q: location, appid: apiKey, units: "metric" },
      });
      const weather = res.data.main;
      setFormData((prev) => ({
        ...prev,
        Temperature: weather.temp,
        Humidity: weather.humidity,
        Moisture: Math.min(100, weather.humidity * 0.5).toFixed(1),
      }));
    } catch (err) {
      alert("❌ Could not fetch weather data.");
    }
  };

  // Gemini 2.0 Flash AI request
  const generateAIResponse = async (lang = language, prediction = result) => {
    if (!prediction) {
      setAiResponse("No prediction result available.");
      return;
    }
    try {
      let prompt = `You are an agriculture assistant. Based on the following fertilizer recommendation result, explain to the farmer in ${
        languageLabels[lang]
      } what fertilizer to use, how much, and why. Be clear and simple. Do not use any asterisks (*).\n\n`;

      if (prediction.recommendations) {
        prompt += "Recommendations:\n";
        prediction.recommendations.forEach((rec) => {
          prompt += `Fertilizer: ${rec.fertilizer}, Amount: ${rec.amount} kg/ha\n`;
        });
      } else if (prediction.fertilizer_amount && prediction.fertilizer_types) {
        prompt += `Total Fertilizer Required: ${prediction.fertilizer_amount} kg/ha\nSuggested Types: ${prediction.fertilizer_types.join(", ")}\n`;
      } else {
        prompt += "No recommendation returned.\n";
      }

      prompt += "\nExplain this to the farmer in simple steps. Do not use any asterisks (*).";

      const response = await axios.post(
        GEMINI_URL,
        {
          contents: [
            { parts: [{ text: prompt }] }
          ],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 500,
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Clean response: remove asterisks and extra whitespace
      const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text
        ?.replace(/\*/g, "")
        ?.replace(/^\s+|\s+$/gm, "")
        ?.replace(/\n{2,}/g, "\n")
        || "No response generated";
      setAiResponse(content);
    } catch (err) {
      console.error(err);
      setAiResponse("❌ Could not generate AI explanation.");
    }
  };

  // Handle fertilizer prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const payload = {};
      Object.keys(formData).forEach((key) => {
        payload[backendKeyMap[key]] =
          isNaN(parseFloat(formData[key])) || formData[key] === "" ? formData[key] : parseFloat(formData[key]);
      });
      const res = await axios.post("http://127.0.0.1:7000/predict/fertilizer", payload);
      setResult(res.data);
      generateAIResponse(language, res.data);
    } catch {
      alert("❌ Prediction request failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    generateAIResponse(lang, result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-lime-100 py-12 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full glass-card rounded-3xl shadow-2xl p-10 border border-green-200">
        <div className="flex items-center gap-4 mb-8">
          <FaSeedling className="text-green-500 text-4xl animate-bounce" />
          <h2 className="text-5xl font-extrabold text-green-700 drop-shadow">Fertilizer Predictor</h2>
          <FaLeaf className="text-green-600 text-4xl animate-spin-slow" />
        </div>

        {!locationAllowed ? (
          <div className="flex gap-2 mb-8">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city..."
              className="flex-1 p-4 border border-green-300 rounded-xl focus:ring focus:ring-green-300 text-lg"
            />
            <button
              type="button"
              onClick={fetchWeather}
              className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
            >
              Get Weather
            </button>
          </div>
        ) : (
          <p className="mb-8 text-green-700 text-lg">
            📍 Using your current location: <strong>{location}</strong>
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              {key === "SoilType" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="p-4 border border-green-300 rounded-xl focus:ring focus:ring-green-300 text-lg"
                >
                  <option value="">Select Soil Type</option>
                  {soilOptions.map((soil) => (
                    <option key={soil} value={soil}>{soil}</option>
                  ))}
                </select>
              ) : key === "CropName" ? (
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="p-4 border border-green-300 rounded-xl focus:ring focus:ring-green-300 text-lg"
                >
                  <option value="">Select Crop</option>
                  {cropOptions.map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              ) : (
                <input
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={key}
                  className="p-4 border border-green-300 rounded-xl focus:ring focus:ring-green-300 text-lg"
                />
              )}
              <span className="text-xs text-gray-600 mt-2">💡 {fieldSuggestions[key]}</span>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 mt-6 px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-bold text-xl"
          >
            {loading ? "Predicting..." : "Get Fertilizer Recommendation"}
          </button>
        </form>

        {result && (
          <div className="mt-10 p-8 bg-white rounded-2xl shadow-lg border border-green-100">
            <h3 className="text-3xl font-bold mb-6 text-green-700 flex items-center gap-3">
              <FaCheckCircle className="text-green-500" /> Prediction Result
            </h3>
            {result.recommendations ? (
              result.recommendations.map((rec, idx) => (
                <div key={idx} className="mt-3 text-lg">
                  <p><strong>Fertilizer:</strong> {rec.fertilizer}</p>
                  <p><strong>Amount:</strong> {rec.amount} kg/ha</p>
                </div>
              ))
            ) : result.fertilizer_amount && result.fertilizer_types ? (
              <div>
                <p><strong>Total Fertilizer Required:</strong> {result.fertilizer_amount} kg/ha</p>
                <p className="mt-3"><strong>Suggested Types:</strong></p>
                <ul className="list-disc ml-6">
                  {result.fertilizer_types.map((fert, idx) => (
                    <li key={idx}>{fert}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No recommendation returned</p>
            )}
          </div>
        )}

        {/* Gemini AI Explanation Section */}
        <div className="mt-10 p-8 bg-gradient-to-r from-green-50 via-lime-50 to-emerald-50 rounded-2xl shadow-lg border border-green-100">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 text-green-700">
            <FaRegSmileBeam className="text-green-500" />
            Gemini Explanation
          </h3>
          <div className="flex gap-4 mb-6">
            {Object.entries(languageLabels).map(([lang, label]) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-6 py-3 rounded-xl font-semibold text-lg transition ${
                  language === lang
                    ? "bg-green-600 text-white shadow"
                    : "bg-gray-200 text-green-700 hover:bg-green-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="text-gray-800 whitespace-pre-line text-lg leading-relaxed bg-white rounded-xl p-6 border border-green-100 shadow">
            {aiResponse || "Click a language button to generate explanation."}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-lg text-green-700 text-center py-8 opacity-80 mt-16 border-t border-green-200">
        <span className="flex items-center justify-center gap-3">
          <FaLeaf className="text-green-600" />
          Powered by Green | AI by Gemini & HuggingFace
          <FaTractor className="text-yellow-600" />
        </span>
      </footer>

      {/* Animations & Glassmorphism */}
      <style>
        {`
          .glass-card {
            background: rgba(255,255,255,0.92);
            backdrop-filter: blur(14px);
            box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.18);
            border: 1px solid rgba(255,255,255,0.18);
          }
          .animate-spin-slow {
            animation: spin 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default FertilizerPredictor;
