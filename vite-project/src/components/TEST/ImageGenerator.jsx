import { useState } from "react";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImage(null);

    try {
      const response = await fetch(
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

      const result = await response.json();

      if (result?.data?.[0]?.b64_json) {
        setImage(`data:image/png;base64,${result.data[0].b64_json}`);
      } else {
        console.error("Unexpected API response:", result);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }

    setLoading(false);
  };

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = `${prompt || "generated-nature"}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-emerald-100 to-lime-200 p-6">
      <div className="backdrop-blur-xl bg-white/40 border border-green-300 shadow-2xl rounded-3xl p-8 w-full max-w-xl space-y-8 text-center glass-card">
        <h2 className="text-4xl font-extrabold text-green-800 drop-shadow flex items-center justify-center gap-2">
          🌿 Nature Image Generator
        </h2>
        <div className="w-16 h-1 bg-green-300 rounded-full mx-auto mb-2" />
        <p className="text-green-700/80 text-sm mb-2">
          Describe the beauty of nature and let AI bring it to life 🌱
        </p>

        <div className="relative mb-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder=" "
            className="peer border border-green-300 bg-white/70 rounded-lg w-full p-4 pt-6 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <label className="absolute left-4 top-2 text-green-800 text-base font-medium transition-all peer-focus:text-green-600 peer-focus:top-1 peer-valid:top-1 peer-valid:text-green-600 pointer-events-none">
            Nature Description
          </label>
        </div>

        <button
          onClick={generateImage}
          disabled={loading}
          className={`w-full py-3 font-semibold rounded-lg bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 text-white shadow-lg hover:scale-[1.03] active:scale-95 transform transition-all disabled:opacity-50`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Growing your image...
            </span>
          ) : (
            "🌱 Generate Nature Image"
          )}
        </button>

        {image && (
          <div className="space-y-4 animate-fade-in">
            <div
              className="rounded-xl overflow-hidden shadow-2xl border border-green-300 transform hover:scale-[1.02] transition-all duration-300 bg-white/60 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <img
                src={image}
                alt="Generated"
                className="w-full object-cover"
              />
            </div>
            <button
              onClick={downloadImage}
              className="w-full py-2 bg-green-600 hover:bg-green-700 active:scale-95 text-white font-semibold rounded-lg shadow-md flex items-center justify-center gap-2 transition-all"
            >
              🍃 Download Image
            </button>
            {/* Modal for zoom */}
            {showModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
                <div className="relative bg-white rounded-xl shadow-2xl p-4 max-w-lg w-full">
                  <button
                    className="absolute top-2 right-2 text-green-700 hover:text-green-900 text-xl"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                  <img src={image} alt="Zoomed" className="w-full rounded-lg" />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-green-700 text-center pt-4 opacity-70 border-t border-green-200 mt-6">
          Powered by HuggingFace AI | Green Project
        </div>
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
    </div>
  );
}
