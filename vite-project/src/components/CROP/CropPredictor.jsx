import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLeaf, FaCloudSunRain, FaSyncAlt, FaInfoCircle } from "react-icons/fa";

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
    <div className="max-w-5xl mx-auto mt-10 p-6 border rounded-2xl shadow-2xl bg-gradient-to-b from-green-50 to-green-100 animate-fade-in">
      <div className="flex items-center justify-center mb-4 gap-2">
        <FaLeaf className="text-green-700 text-3xl animate-bounce" />
        <h2 className="text-3xl font-bold text-green-700">Crop Predictor</h2>
        <FaCloudSunRain className="text-blue-400 text-2xl" />
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block font-medium mb-1 text-green-800 flex items-center gap-1">
              {field.label}
              <button
                type="button"
                className="ml-1 text-green-500 hover:text-green-700 focus:outline-none"
                onClick={() => handleHelpToggle(field.name)}
                aria-label={`Help for ${field.label}`}
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
              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner transition-all duration-200"
            />
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
            className="flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition font-semibold shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></span>
                Predicting...
              </span>
            ) : (
              "Predict Crop"
            )}
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-gray-200 text-green-700 py-2 px-4 rounded-xl hover:bg-gray-300 transition font-semibold shadow"
            onClick={handleReset}
            disabled={loading}
          >
            <FaSyncAlt /> Reset
          </button>
        </div>
      </form>

      {loading && (
        <div className="mt-6 flex flex-col items-center">
          <div className="w-full bg-green-200 rounded-full h-2.5 mb-2">
            <div className="bg-green-500 h-2.5 rounded-full animate-progress w-3/4"></div>
          </div>
          <span className="text-green-700 font-medium">Processing your data...</span>
        </div>
      )}

      {prediction && (
        <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-xl shadow-inner text-center animate-fade-in">
          <h3 className="text-xl font-semibold text-green-800 mb-2 flex items-center justify-center gap-2">
            <FaLeaf className="text-green-600" />
            Recommended Crop:
          </h3>
          <p className="text-2xl font-bold text-green-900">{prediction}</p>
          {image && (
            <img
              src={image}
              alt={prediction}
              className="mt-4 w-full rounded-xl shadow-lg transition-all duration-500 scale-100 hover:scale-105"
            />
          )}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-xl text-center animate-fade-in">
          <h3 className="text-lg font-semibold text-red-700">Error:</h3>
          <p className="text-red-800">{error}</p>
        </div>
      )}

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
