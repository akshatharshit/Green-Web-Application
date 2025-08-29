import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaLeaf,
  FaCloudSunRain,
  FaSyncAlt,
  FaInfoCircle,
  FaTractor,
  FaSeedling,
  FaWater,
  FaTemperatureHigh,
  FaTint,
  FaBalanceScale,
  FaUmbrella,
  FaRegSun,
  FaRegSnowflake,
  FaRegSmileBeam,
} from "react-icons/fa";

const fieldIcons = {
  nitrogen: <FaSeedling className="text-green-500" />,
  phosphorous: <FaSeedling className="text-orange-500" />,
  pottasium: <FaSeedling className="text-yellow-500" />,
  temperature: <FaTemperatureHigh className="text-red-400" />,
  humidity: <FaTint className="text-blue-400" />,
  ph: <FaBalanceScale className="text-purple-400" />,
  rainfall: <FaUmbrella className="text-blue-600" />,
};

const fieldHelp = {
  nitrogen: "Essential for plant growth and leaf development.",
  phosphorous: "Promotes root and flower growth.",
  pottasium: "Improves overall plant health and disease resistance.",
  temperature: "Ambient temperature in Celsius.",
  humidity: "Relative humidity percentage.",
  ph: "Soil acidity/alkalinity (6.5 is neutral).",
  rainfall: "Rainfall in millimeters.",
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
          console.error("Weather fetch error:", err);
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
          } else {
            console.error("Unexpected API response:", result);
          }
        } catch (imgErr) {
          console.error("Image generation error:", imgErr);
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
    <div className="max-w-4xl mx-auto mt-10 p-0 rounded-2xl shadow-2xl bg-gradient-to-b from-green-50 to-green-100 relative overflow-hidden glass-card">
      {/* Header */}
      <div className="bg-green-700/90 py-7 px-8 rounded-t-2xl flex flex-col items-center justify-center gap-2 shadow-lg">
        <div className="flex items-center gap-3">
          <FaLeaf className="text-green-200 text-4xl animate-bounce" />
          <h2 className="text-4xl font-extrabold text-white drop-shadow flex items-center gap-2">
            Crop Predictor
            <FaTractor className="text-yellow-200 text-3xl ml-2 animate-pulse" />
          </h2>
          <FaCloudSunRain className="text-blue-200 text-3xl" />
        </div>
        <div className="w-20 h-1 bg-green-300 rounded-full mt-3" />
        <p className="text-green-100/90 mt-2 text-lg font-medium text-center">
          Enter your field details and let AI recommend the best crop for your soil and weather!
        </p>
        <div className="flex gap-4 mt-4">
          <FaRegSun className="text-yellow-300 text-2xl" title="Sunny Weather" />
          <FaRegSnowflake className="text-blue-300 text-2xl" title="Cool Weather" />
          <FaRegSmileBeam className="text-green-200 text-2xl" title="Happy Farming" />
        </div>
      </div>

      {/* Agriculture Banner */}
      <div className="flex items-center justify-center gap-6 py-4 bg-gradient-to-r from-green-100 via-lime-100 to-emerald-100 border-b border-green-200">
        <FaTractor className="text-yellow-600 text-2xl animate-pulse" />
        <span className="font-semibold text-green-700 text-lg">Smart Farming</span>
        <FaSeedling className="text-green-500 text-2xl animate-bounce" />
        <span className="font-semibold text-green-700 text-lg">Soil Health</span>
        <FaWater className="text-blue-500 text-2xl animate-pulse" />
        <span className="font-semibold text-green-700 text-lg">Irrigation</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 py-10">
        {[
          { name: "nitrogen", label: "Nitrogen (N)" },
          { name: "phosphorous", label: "Phosphorous (P)" },
          { name: "pottasium", label: "Pottasium (K)" },
          { name: "temperature", label: "Temperature (°C)" },
          { name: "humidity", label: "Humidity (%)" },
          { name: "ph", label: "Soil pH" },
          { name: "rainfall", label: "Rainfall (mm)" },
        ].map((field) => (
          <div key={field.name} className="relative">
            <div className="relative">
              <input
                type="number"
                step="any"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="peer w-full border bg-white/70 px-4 pt-7 pb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner transition-all duration-200 text-lg"
              />
              <label className="absolute left-4 top-2 text-green-800 text-base font-semibold transition-all peer-focus:text-green-600 peer-focus:top-1 peer-valid:top-1 peer-valid:text-green-600 flex items-center gap-2 pointer-events-none">
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
            </div>
            {showHelp[field.name] && (
              <div className="absolute z-10 left-0 top-full mt-1 bg-green-50 border border-green-300 rounded p-2 text-xs text-green-900 shadow-lg animate-fade-in">
                {fieldHelp[field.name]}
              </div>
            )}
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 flex gap-2 mt-2">
          <button
            type="submit"
            className={`flex-1 bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-60`}
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
          <span className="text-green-700 font-medium">Processing your data...</span>
        </div>
      )}

      {/* Prediction Result */}
      {prediction && (
        <div className="mt-10 p-6 bg-green-100/80 border border-green-300 rounded-2xl shadow-inner text-center animate-fade-in mx-8">
          <h3 className="text-2xl font-bold text-green-800 mb-2 flex items-center justify-center gap-2">
            <FaLeaf className="text-green-600" />
            Recommended Crop:
            <FaSeedling className="text-green-500" />
          </h3>
          <p className="text-3xl font-extrabold text-green-900 mb-2">{prediction}</p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <FaTractor className="text-yellow-600 text-2xl animate-pulse" />
            <FaCloudSunRain className="text-blue-400 text-2xl" />
            <FaWater className="text-blue-500 text-2xl" />
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex flex-col items-center">
              <FaSeedling className="text-green-500 text-2xl" />
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
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-xl text-center animate-fade-in mx-8">
          <h3 className="text-lg font-semibold text-red-700">Error:</h3>
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Agriculture Tips Section */}
      <div className="mt-10 mx-8 p-6 bg-gradient-to-r from-lime-50 via-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-inner animate-fade-in">
        <h4 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
          <FaRegSmileBeam className="text-green-500" />
          Agriculture Tips
        </h4>
        <ul className="list-disc list-inside space-y-2 text-green-900 text-base">
          <li>
            <FaSeedling className="inline mr-2 text-green-500" />
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

      {/* Footer */}
      <div className="text-xs text-green-700 text-center py-6 opacity-70 border-t border-green-200 mt-12">
        <span className="flex items-center justify-center gap-2">
          <FaLeaf className="text-green-600" />
          Powered by Green | Weather & AI by OpenWeather & HuggingFace
          <FaTractor className="text-yellow-600" />
        </span>
      </div>

      {/* Animations & Glassmorphism */}
      <style>
        {`
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
          .glass-card {
            background: rgba(255,255,255,0.7);
            backdrop-filter: blur(8px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
            border: 1px solid rgba(255,255,255,0.18);
          }
        `}
      </style>
    </div>
  );
}
