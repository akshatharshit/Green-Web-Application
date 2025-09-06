import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageToGemini } from "../../slices/geminiSlice";
import { Loader2, Leaf, AlertTriangle, ShieldCheck } from "lucide-react";
import {
  FaSeedling,
  FaTractor,
  FaCloudSunRain,
  FaWater,
  FaRegSmileBeam,
  FaInfoCircle,
  FaRecycle,
  FaBug,
  FaHandsHelping,
  FaSun,
  FaCheckCircle,
} from "react-icons/fa";

const DiseasePredictor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showTips, setShowTips] = useState(false);

  const dispatch = useDispatch();
  const { messages, loading: giminiLoading, error: giminiError } =
    useSelector((state) => state.chat);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("📸 Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:7000/disease-predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(response.data);

      // 🚜 Farmer friendly Gemini prompt
      const prompt = `The backend predicted: 
Crop: ${response.data.Crop}, 
Disease: ${response.data.Disease}. 
Causes: ${response.data.Cause.join(", ")}. 
Prevention/Cure: ${response.data.Prevent_Cure.join(", ")}. 

Please provide a farmer-friendly explanation in **two parts**:
1. English explanation (easy words, simple guidance for farmers).
2. Hindi explanation (किसानों के लिए आसान भाषा में).`;

      dispatch(sendMessageToGemini(prompt));
    } catch (err) {
      console.error(err);
      setError("⚠️ Something went wrong while predicting.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Format Gemini text
  const formatGeminiText = (text) => {
    if (!text) return { english: [], hindi: [] };

    const cleaned = text.replace(/\*/g, "");
    let englishPart = cleaned;
    let hindiPart = "";

    const markers = [
      /Hindi explanation[:\-]?/i,
      /हिंदी विवरण[:\-]?/i,
      /Hindi[:\-]?/i,
    ];

    for (const marker of markers) {
      if (cleaned.match(marker)) {
        const parts = cleaned.split(marker);
        englishPart = parts[0];
        hindiPart = parts[1] || "";
        break;
      }
    }

    return {
      english: englishPart.split(/\n+/).map((line, idx) => (
        <p key={`en-${idx}`} className="mb-2">
          {line}
        </p>
      )),
      hindi: hindiPart.split(/\n+/).map((line, idx) => (
        <p key={`hi-${idx}`} className="mb-2">
          {line}
        </p>
      )),
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 bg-gradient-to-br from-[#f5fbe7] via-[#e7f6e7] to-[#f5fbe7]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gradient-to-r from-green-900 via-green-800 to-lime-700 rounded-2xl shadow-lg px-6 py-7 mb-8 w-full max-w-3xl mx-auto flex flex-col items-center gap-2 animate-fade-in border-b-2 border-green-200">
        <div className="flex items-center gap-3">
          <Leaf className="w-10 h-10 text-green-200 animate-bounce" />
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Crop Disease Predictor
          </h1>
          <FaTractor className="text-yellow-200 text-3xl animate-pulse" />
        </div>
        <div className="flex gap-4 mt-2">
          <FaSeedling className="text-green-300 text-2xl animate-bounce" />
          <FaCloudSunRain className="text-blue-200 text-2xl" />
          <FaWater className="text-blue-300 text-2xl animate-pulse" />
          <FaSun className="text-yellow-300 text-2xl animate-spin-slow" />
        </div>
        <div className="w-24 h-1 bg-lime-300 rounded-full mt-3" />
        <p className="text-green-100/90 mt-2 text-lg font-medium text-center">
          Upload a crop image and get instant disease analysis with AI-powered tips!
        </p>
      </header>

      {/* Agriculture Banner */}
      <div className="flex items-center justify-center gap-6 py-4 bg-gradient-to-r from-[#e7f6e7] via-[#f5fbe7] to-[#e7f6e7] border-b border-green-200 rounded-xl mb-8 shadow">
        <FaTractor className="text-yellow-600 text-2xl animate-pulse" />
        <span className="font-semibold text-green-700 text-lg">Healthy Crops</span>
        <FaSeedling className="text-green-600 text-2xl animate-bounce" />
        <span className="font-semibold text-green-700 text-lg">Soil Care</span>
        <FaWater className="text-blue-500 text-2xl animate-pulse" />
        <span className="font-semibold text-green-700 text-lg">Irrigation</span>
        <FaRecycle className="text-green-400 text-2xl animate-spin-slow" />
        <span className="font-semibold text-green-700 text-lg">Crop Rotation</span>
      </div>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full max-w-md glass-card p-8 rounded-2xl shadow-2xl border border-green-200 animate-fade-in"
      >
        <div className="relative w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="peer border border-green-300 bg-white/80 rounded-lg w-full p-4 pt-6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-lime-400 shadow"
          />
          <label className="absolute left-4 top-2 text-green-800 text-base font-semibold transition-all peer-focus:text-lime-700 peer-focus:top-1 peer-valid:top-1 peer-valid:text-lime-700 flex items-center gap-2 pointer-events-none">
            <FaInfoCircle className="text-green-500" />
            Upload Crop Image
          </label>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-700 via-lime-600 to-green-500 text-white py-3 rounded-xl font-semibold text-lg hover:scale-[1.03] active:scale-95 shadow-lg transition-all disabled:opacity-60"
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin w-5 h-5" />}
          {loading ? "Analyzing..." : "🌱 Predict Disease"}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>

      {/* Divider */}
      <div className="w-20 h-1 bg-lime-300 rounded-full my-8 animate-fade-in" />

      {/* Backend Result */}
      {result && (
        <section className="mt-4 max-w-5xl w-full glass-card bg-white/90 p-8 rounded-2xl shadow-2xl border border-green-200 animate-fade-in">
          <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" /> Disease Prediction
          </h2>
          <div className="mb-2 flex items-center gap-2">
            <FaSeedling className="text-green-600" />
            <span className="font-semibold">Crop:</span> {result.Crop}
          </div>
          <div className="mb-4 flex items-center gap-2">
            <FaBug className="text-red-500" />
            <span className="font-semibold">Disease:</span> {result.Disease}
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
              <FaCloudSunRain className="text-blue-400" />
              Cause:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {result.Cause.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
              <ShieldCheck className="text-green-600" /> Prevention / Cure:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {result.Prevent_Cure.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex items-center gap-4 justify-center">
            <FaHandsHelping className="text-green-600 text-2xl" />
            <span className="text-green-700 font-semibold">
              For best results, follow the prevention tips and consult your local agricultural expert!
            </span>
            <FaCheckCircle className="text-green-500 text-2xl" />
          </div>
        </section>
      )}

      {/* Gemini Explanation */}
      {giminiLoading && (
        <p className="text-blue-600 mt-6 font-medium animate-fade-in">
          ✨ Refining with Gemini...
        </p>
      )}
      {giminiError && <p className="text-red-600 mt-4">{giminiError}</p>}
      {messages?.length > 0 &&
        (() => {
          const { english, hindi } = formatGeminiText(
            messages[messages.length - 1].text
          );
          return (
            <section className="mt-8 max-w-7xl w-full glass-card bg-white/90 p-8 rounded-2xl shadow-2xl border border-purple-200 animate-fade-in">
              <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
                <FaRegSmileBeam className="text-green-500" />
                Gemini Explanation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-700 mb-2">🌍 English</h3>
                  <div className="text-gray-700 leading-relaxed">{english}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-700 mb-2">🇮🇳 हिंदी</h3>
                  <div className="text-gray-700 leading-relaxed">{hindi}</div>
                </div>
              </div>
            </section>
          );
        })()}

      {/* Agriculture Tips Section */}
      <div className="mt-10 mx-8 p-6 bg-gradient-to-r from-lime-50 via-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-inner animate-fade-in max-w-3xl w-full">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-bold text-green-700 flex items-center gap-2">
            <FaRegSmileBeam className="text-green-500" />
            Agriculture Tips
          </h4>
          <button
            className="text-green-600 hover:text-green-800 font-semibold flex items-center gap-1"
            onClick={() => setShowTips((prev) => !prev)}
          >
            {showTips ? "Hide Tips" : "Show More"}
          </button>
        </div>
        <ul className="list-disc list-inside space-y-2 text-green-900 text-base">
          <li>
            <FaSeedling className="inline mr-2 text-green-600" />
            Regularly check crops for disease symptoms.
          </li>
          <li>
            <FaWater className="inline mr-2 text-blue-500" />
            Use clean water for irrigation to prevent fungal infections.
          </li>
          <li>
            <FaTractor className="inline mr-2 text-yellow-600" />
            Remove and destroy infected plants to stop spread.
          </li>
          <li>
            <FaCloudSunRain className="inline mr-2 text-blue-400" />
            Monitor weather and adjust care accordingly.
          </li>
          <li>
            <Leaf className="inline mr-2 text-green-600" />
            Rotate crops to maintain healthy soil.
          </li>
          {showTips && (
            <>
              <li>
                <FaRecycle className="inline mr-2 text-green-400" />
                Compost organic waste to enrich soil naturally.
              </li>
              <li>
                <FaBug className="inline mr-2 text-red-500" />
                Use natural pest control methods to reduce chemical usage.
              </li>
              <li>
                <FaHandsHelping className="inline mr-2 text-green-600" />
                Connect with local farming communities for shared knowledge.
              </li>
              <li>
                <FaSun className="inline mr-2 text-yellow-400" />
                Ensure crops get enough sunlight for healthy growth.
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Raw Backend JSON */}
      {result && (
        <section className="mt-6 max-w-7xl w-full bg-gray-100/80 p-4 rounded-xl shadow border border-gray-200 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            🔍 Raw Backend JSON
          </h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-3 rounded border">
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>
      )}

      {/* Raw Gemini */}
      {messages?.length > 0 && (
        <section className="mt-6 max-w-7xl w-full bg-gray-100/80 p-4 rounded-xl shadow border border-gray-200 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            🔍 Raw Gemini Response
          </h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 p-3 rounded border">
            {messages[messages.length - 1].text}
          </pre>
        </section>
      )}

      {/* Footer */}
      <footer className="text-xs text-green-700 text-center py-6 opacity-70 mt-12 border-t border-green-200">
        <span className="flex items-center justify-center gap-2">
          <Leaf className="text-green-600" />
          Powered by Green | AI by Gemini & HuggingFace
          <FaTractor className="text-yellow-600" />
        </span>
      </footer>

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
          .glass-card {
            background: rgba(245,252,245,0.85);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.13);
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

export default DiseasePredictor;

