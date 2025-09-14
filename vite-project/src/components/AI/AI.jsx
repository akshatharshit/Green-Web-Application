import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaStop, FaLeaf, FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

function AI() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const messageEndRef = useRef(null);
  const stopRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleUserInputChange = (e) => setUserInput(e.target.value);

  const handleSendClick = async () => {
    if (!userInput.trim()) return;
    const newMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput("");
    setLoading(true);
    stopRef.current = false;

    try {
      const wantsDetails = /detail|explain|full/i.test(userInput);

      const prompt = `Language: ${lang}.
You are an agriculture expert assistant for farmers.
Give practical, friendly advice in 2-3 lines unless the user asks for details.
User: ${userInput}
Response style: ${wantsDetails ? "detailed" : "concise"}.`;

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": GEMINI_API_KEY, // ✅ must be lowercase x
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",              // ✅ REQUIRED
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: wantsDetails ? 512 : 80, // ✅ short vs detailed
            },
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        console.error("Gemini API error:", err);
        throw new Error(err.error?.message || "Gemini request failed");
      }

      const data = await response.json();
      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";


      let i = 0;
      const typingInterval = setInterval(() => {
        if (stopRef.current) {
          clearInterval(typingInterval);
          setLoading(false);
          return;
        }
        if (i < botReply.length) {
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.sender === "bot") {
              return [
                ...prev.slice(0, -1),
                { sender: "bot", text: last.text + botReply[i] },
              ];
            } else {
              return [...prev, { sender: "bot", text: botReply[i] }];
            }
          });
          i++;
        } else {
          clearInterval(typingInterval);
          setLoading(false);
        }
      }, 18);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error: " + err.message },
      ]);
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && userInput.trim()) {
      handleSendClick();
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const handleStop = () => {
    stopRef.current = true;
  };

  // Floating toggle button
  return (
    <>
      <button
        className="fixed bottom-22 right-6 z-50 bg-gradient-to-br from-green-700 via-lime-500 to-emerald-500 text-white rounded-full shadow-xl w-14 h-14 flex items-center justify-center text-3xl hover:scale-110 transition-all border-4 border-green-300"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI Chat" : "Open AI Chat"}
        style={{ animation: "bounce 1.2s infinite alternate" }}
      >
        <FaRobot />
      </button>

      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-[350px] max-w-full bg-gradient-to-br from-green-900 via-gray-900 to-black rounded-2xl shadow-2xl border border-green-700/40 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <FaLeaf className="text-green-400 text-xl animate-bounce" />
              <span className="text-lg font-bold bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent drop-shadow">
                Agri AI Chat
              </span>
            </div>
            <button
              className="text-green-400 hover:text-red-500 text-xl font-bold"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mb-2">
            Ask about crops, soil, fertilizer, or farming!
          </p>

          {/* Language Selector */}
          <div className="absolute top-5 right-8 flex gap-1">
            {["en", "hi", "or"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded text-xs font-medium shadow transition ${lang === l
                  ? "bg-green-600 text-white"
                  : "bg-white/70 text-gray-800 hover:bg-green-200"
                  }`}
              >
                {l === "en" ? "EN" : l === "hi" ? "हि" : "ଓ"}
              </button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto bg-white/90 rounded-xl p-3 shadow-inner space-y-2 scroll-smooth border border-gray-200 mx-4 mt-2">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FaLeaf className="text-green-400 text-2xl mb-1 animate-bounce" />
                <span className="text-base font-semibold">Welcome! 🌱</span>
                <span className="text-xs mt-1">
                  Type your farming question below.
                </span>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl text-sm shadow animate-fadeIn ${msg.sender === "user"
                    ? "bg-gradient-to-r from-green-200 to-green-100 text-gray-800 rounded-br-none"
                    : "bg-gradient-to-r from-blue-200 to-blue-100 text-gray-800 rounded-bl-none"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-center text-xs text-gray-500 italic animate-pulse">
                AI is typing...
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          {/* Input + Stop Button */}
          <div className="mt-3 flex items-center gap-2 bg-white/30 backdrop-blur-lg p-2 rounded-xl shadow border border-green-500/20 mx-4 mb-4">
            <input
              type="text"
              value={userInput}
              onChange={handleUserInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask about farming..."
              className="flex-1 px-3 py-2 rounded-lg bg-white/80 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <div className="w-10 h-10 flex items-center justify-center">
              {loading ? (
                <button
                  onClick={handleStop}
                  className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 active:scale-95 transition shadow"
                  aria-label="Stop response"
                >
                  <FaStop size={15} />
                </button>
              ) : (
                <button
                  onClick={handleSendClick}
                  className="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 active:scale-95 transition shadow"
                  aria-label="Send message"
                >
                  <FaPaperPlane size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Crop Tools Navigation */}
          <div className="mb-4 flex flex-wrap justify-center gap-2 mx-4">
            <ToolBtn
              label="Crop Diseases"
              color="bg-green-600 hover:bg-green-700"
              onClick={() => navigate("/disease")}
            />
            <ToolBtn
              label="Crop Recommendation"
              color="bg-teal-600 hover:bg-teal-700"
              onClick={() => navigate("/crop")}
            />
            <ToolBtn
              label="Fertilizer"
              color="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/FertilizerPredictor")}
            />
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s;
          }
          @keyframes bounce {
            from { transform: translateY(0);}
            to { transform: translateY(-8px);}
          }
        `}
      </style>
    </>
  );
}

// Crop tool button
function ToolBtn({ label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs font-semibold rounded-lg text-white transition shadow ${color}`}
    >
      {label}
    </button>
  );
}

export default AI;
