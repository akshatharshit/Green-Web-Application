import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSeedling,
  FaLeaf,
  FaTractor,
  FaRegSmileBeam,
  FaCloudSunRain,
  FaWater,
  FaRegSun,
  FaSyncAlt,
  FaTemperatureHigh,
  FaTint,
  FaBalanceScale,
  FaUmbrella,
  FaInfoCircle,
  FaRegSnowflake,
} from "react-icons/fa";

const fieldHelp = {
  nitrogen: "Essential for plant growth and leaf development.",
  phosphorous: "Promotes root and flower growth.",
  pottasium: "Improves overall plant health and disease resistance.",
  temperature: "Ambient temperature in Celsius.",
  humidity: "Relative humidity percentage.",
  ph: "Soil acidity/alkalinity (6.5 is neutral).",
  rainfall: "Rainfall in millimeters.",
};

const fieldIcons = {
  nitrogen: <FaSeedling className="text-green-600" />,
  phosphorous: <FaSeedling className="text-yellow-700" />,
  pottasium: <FaSeedling className="text-lime-600" />,
  temperature: <FaTemperatureHigh className="text-orange-500" />,
  humidity: <FaTint className="text-blue-500" />,
  ph: <FaBalanceScale className="text-amber-700" />,
  rainfall: <FaUmbrella className="text-blue-700" />,
};

export default function CropPredictor() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorous: "",
    pottasium: "",
    temperature: "",
    humidity: "",
    ph: 6.5,
    rainfall: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHelp, setShowHelp] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
          const response = await axios.get(url);
          const { temp, humidity } = response.data.main;
          const rain1h = response.data.rain?.["1h"];
          const rain3h = response.data.rain?.["3h"];
          const rainfall = rain1h ?? rain3h ?? 0;

          setFormData((prev) => ({
            ...prev,
            temperature: temp,
            humidity,
            rainfall,
          }));
        } catch (err) {
          // Weather fetch error
        }
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFormData({
      nitrogen: "",
      phosphorous: "",
      pottasium: "",
      temperature: "",
      humidity: "",
      ph: 6.5,
      rainfall: "",
    });
    setPrediction(null);
    setImage(null);
    setError(null);
  };

  const handleHelpToggle = (field) => {
    setShowHelp((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    setImage(null);

    try {
      const response = await axios.post("http://127.0.0.1:7000/crop-predict", {
        nitrogen: parseFloat(formData.nitrogen),
        phosphorous: parseFloat(formData.phosphorous),
        pottasium: parseFloat(formData.pottasium),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
      });

      if (response.data.prediction) {
        const cropName = response.data.prediction;
        setPrediction(cropName);

        // Generate image using Hugging Face
        const prompt = `A healthy, lush field of ${cropName}, vibrant colors, natural sunlight, detailed agricultural scenery, realistic, high quality, cinematic`;
        try {
          const hfRes = await fetch(
            "https://router.huggingface.co/together/v1/images/generations",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt,
                response_format: "b64_json",
                model: "black-forest-labs/FLUX.1-dev",
              }),
            }
          );
          const result = await hfRes.json();
          if (result?.data?.[0]?.b64_json) {
            setImage(`data:image/png;base64,${result.data[0].b64_json}`);
          }
        } catch (imgErr) {
          // Image generation error
        }
      } else if (response.data.error) {
        setError(response.data.error);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fbe7] via-[#e7f6e7] to-[#f5fbe7] py-12 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full glass-card rounded-3xl shadow-2xl p-10 border border-green-200">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <FaSeedling className="text-green-600 text-4xl animate-bounce" />
          <h2 className="text-4xl font-extrabold text-green-800 drop-shadow">
            Crop Predictor
          </h2>
          <FaLeaf className="text-green-700 text-4xl animate-spin-slow" />
        </div>
        <div className="flex gap-6 mb-8">
          <FaTractor className="text-yellow-600 text-2xl animate-pulse" />
          <FaCloudSunRain className="text-blue-400 text-2xl" />
          <FaWater className="text-blue-500 text-2xl animate-pulse" />
          <FaRegSun className="text-yellow-400 text-2xl animate-spin-slow" />
        </div>
        <div className="w-32 h-1 bg-lime-300 rounded-full mb-8" />
        <p className="text-green-700/80 text-lg font-medium text-center mb-4">
          Enter your field details and let AI recommend the best crop for your
          soil and weather!
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "nitrogen", label: "Nitrogen (N)" },
            { name: "phosphorous", label: "Phosphorous (P)" },
            { name: "pottasium", label: "Pottasium (K)" },
            { name: "temperature", label: "Temperature (°C)" },
            { name: "humidity", label: "Humidity (%)" },
            { name: "ph", label: "Soil pH" },
            { name: "rainfall", label: "Rainfall (mm)" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col mb-2">
              <label className="font-semibold text-green-800 mb-1 flex items-center gap-2">
                {fieldIcons[field.name]}
                {field.label}
                <button
                  type="button"
                  className="ml-1 text-green-500 hover:text-green-700 focus:outline-none"
                  onClick={() => handleHelpToggle(field.name)}
                  aria-label={`Help for ${field.label}`}
                  tabIndex={-1}
                >
                  <FaInfoCircle />
                </button>
              </label>
              <input
                type="number"
                step="any"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="p-3 border border-green-300 rounded-xl focus:ring focus:ring-green-300 text-base bg-white/80"
              />
              {showHelp[field.name] && (
                <div className="mt-1 bg-green-50 border border-green-300 rounded p-2 text-xs text-green-900 shadow animate-fade-in">
                  {fieldHelp[field.name]}
                </div>
              )}
            </div>
          ))}

          <div className="col-span-1 md:col-span-2 flex gap-2 mt-2">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-700 via-lime-600 to-green-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-60"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                  Predicting...
                </span>
              ) : (
                "🌱 Predict Crop"
              )}
            </button>
            <button
              type="button"
              className="flex items-center gap-2 bg-gray-200 text-green-700 py-3 px-6 rounded-xl hover:bg-gray-300 active:scale-95 font-semibold shadow transition-all"
              onClick={handleReset}
              disabled={loading}
            >
              <FaSyncAlt /> Reset
            </button>
          </div>
        </form>

        {/* Progress Bar */}
        {loading && (
          <div className="mt-6 flex flex-col items-center px-8">
            <div className="w-full bg-green-200 rounded-full h-2.5 mb-2">
              <div className="bg-green-500 h-2.5 rounded-full animate-progress w-3/4"></div>
            </div>
            <span className="text-green-700 font-medium">
              Processing your data...
            </span>
          </div>
        )}

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-10 p-6 bg-lime-100/80 border border-green-300 rounded-2xl shadow-inner text-center animate-fade-in">
            <h3 className="text-2xl font-bold text-green-800 mb-2 flex items-center justify-center gap-2">
              <FaLeaf className="text-green-600" />
              Recommended Crop:
              <FaSeedling className="text-lime-600" />
            </h3>
            <p className="text-3xl font-extrabold text-green-900 mb-2">
              {prediction}
            </p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <FaTractor className="text-yellow-600 text-2xl animate-pulse" />
              <FaCloudSunRain className="text-blue-400 text-2xl" />
              <FaWater className="text-blue-500 text-2xl" />
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex flex-col items-center">
                <FaSeedling className="text-green-600 text-2xl" />
                <span className="text-xs text-green-700">Healthy Soil</span>
              </div>
              <div className="flex flex-col items-center">
                <FaTractor className="text-yellow-600 text-2xl" />
                <span className="text-xs text-green-700">Modern Farming</span>
              </div>
              <div className="flex flex-col items-center">
                <FaCloudSunRain className="text-blue-400 text-2xl" />
                <span className="text-xs text-green-700">Weather</span>
              </div>
            </div>
            {image && (
              <>
                <img
                  src={image}
                  alt={prediction}
                  className="mt-6 w-full rounded-xl shadow-lg transition-all duration-500 scale-100 hover:scale-105 cursor-pointer"
                  onClick={() => setShowModal(true)}
                />
                {/* Modal for image zoom */}
                {showModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
                    <div className="relative bg-white rounded-xl shadow-2xl p-4 max-w-lg w-full">
                      <button
                        className="absolute top-2 right-2 text-green-700 hover:text-green-900 text-xl"
                        onClick={() => setShowModal(false)}
                      >
                        ×
                      </button>
                      <img src={image} alt={prediction} className="w-full rounded-lg" />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-xl text-center animate-fade-in">
            <h3 className="text-lg font-semibold text-red-700">Error:</h3>
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Agriculture Tips Section */}
        <div className="mt-10 p-6 bg-gradient-to-r from-lime-50 via-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-inner animate-fade-in">
          <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
            <FaRegSmileBeam className="text-green-500" />
            Agriculture Tips
          </h4>
          <ul className="list-disc list-inside space-y-2 text-green-900 text-base">
            <li>
              <FaSeedling className="inline mr-2 text-green-600" />
              Regularly test your soil for nutrients and pH.
            </li>
            <li>
              <FaWater className="inline mr-2 text-blue-500" />
              Ensure proper irrigation and drainage for healthy crops.
            </li>
            <li>
              <FaTractor className="inline mr-2 text-yellow-600" />
              Use modern farming equipment for efficiency.
            </li>
            <li>
              <FaCloudSunRain className="inline mr-2 text-blue-400" />
              Monitor weather forecasts for timely sowing and harvesting.
            </li>
            <li>
              <FaLeaf className="inline mr-2 text-green-600" />
              Practice crop rotation to maintain soil fertility.
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-xs text-green-700 text-center py-6 opacity-70 mt-12 border-t border-green-200">
        <span className="flex items-center justify-center gap-2">
          <FaLeaf className="text-green-600" />
          Powered by Green | Weather & AI by OpenWeather & HuggingFace
          <FaTractor className="text-yellow-600" />
        </span>
      </footer>

      {/* Animations & Glassmorphism */}
      <style>
        {`
          .glass-card {
            background: rgba(245,252,245,0.85);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.13);
            border: 1px solid rgba(255,255,255,0.18);
          }
          .animate-spin-slow {
            animation: spin 3s linear infinite;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.7s;
          }
          @keyframes progress {
            0% { width: 0; }
            100% { width: 75%; }
          }
          .animate-progress {
            animation: progress 1.2s ease-in-out;
          }
        `}
      </style>
    </div>
  );
}
