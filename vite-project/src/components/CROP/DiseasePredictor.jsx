import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageToGemini } from "../../slices/geminiSlice";
import { Loader2, Leaf, AlertTriangle, ShieldCheck } from "lucide-react";

const DiseasePredictor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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
    <div className="min-h-screen flex flex-col items-center py-10 px-4 bg-gradient-to-br from-green-50 via-emerald-100 to-lime-100">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg px-6 py-4 mb-8 w-full max-w-3xl mx-auto flex items-center gap-2 animate-fade-in">
        <Leaf className="w-8 h-8 text-green-600" />
        <h1 className="text-4xl font-bold text-green-700 tracking-tight">
          Crop Disease Predictor
        </h1>
      </header>

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
            className="peer border border-green-300 bg-white/70 rounded-lg w-full p-4 pt-6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <label className="absolute left-4 top-2 text-green-800 text-base font-medium transition-all peer-focus:text-green-600 peer-focus:top-1 peer-valid:top-1 peer-valid:text-green-600 pointer-events-none">
            Upload Crop Image
          </label>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-700 via-emerald-500 to-lime-500 text-white py-3 rounded-xl font-semibold text-lg hover:scale-[1.03] active:scale-95 shadow-lg transition-all disabled:opacity-60"
          disabled={loading}
        >
          {loading && <Loader2 className="animate-spin w-5 h-5" />}
          {loading ? "Analyzing..." : "🌱 Predict Disease"}
        </button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>

      {/* Divider */}
      <div className="w-16 h-1 bg-green-300 rounded-full my-8 animate-fade-in" />

      {/* Backend Result */}
      {result && (
        <section className="mt-4 max-w-5xl w-full glass-card bg-white/80 p-8 rounded-2xl shadow-2xl border border-green-200 animate-fade-in">
          <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" /> Disease Prediction
          </h2>
          <div className="mb-2">
            <span className="font-semibold">🌾 Crop:</span> {result.Crop}
          </div>
          <div className="mb-4">
            <span className="font-semibold">🛑 Disease:</span> {result.Disease}
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-green-700 mb-2">🌍 Cause:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {result.Cause.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-green-700 mb-2 flex items-center gap-1">
              <ShieldCheck className="text-green-600" /> Prevention / Cure:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {result.Prevent_Cure.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
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
            <section className="mt-8 max-w-7xl w-full glass-card bg-white/80 p-8 rounded-2xl shadow-2xl border border-purple-200 animate-fade-in">
              <h2 className="text-2xl font-bold text-purple-700 mb-6">
                🌟 Gemini Explanation
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
      <footer className="text-xs text-green-700 text-center py-6 opacity-70 mt-12">
        Powered by Green | AI by Gemini & HuggingFace
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
            background: rgba(255,255,255,0.7);
            backdrop-filter: blur(8px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
            border: 1px solid rgba(255,255,255,0.18);
          }
        `}
      </style>
    </div>
  );
};

export default DiseasePredictor;
