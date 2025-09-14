import React, { useState } from "react";
import { FaLeaf, FaExchangeAlt, FaRulerCombined } from "react-icons/fa";

// Conversion factors (to hectare as base)
const conversions = {
  bigha: 0.25,
  biswa: 0.0125,
  katha: 0.033,
  acre: 0.4047,
  gunta: 0.0101,
  sqyard: 0.0000836,
  sqft: 0.00000929,
  hectare: 1,
};

const unitLabels = {
  bigha: "Bigha (बिघा)",
  biswa: "Biswa (बिस्वा)",
  katha: "Katha (कठा)",
  acre: "Acre",
  gunta: "Gunta",
  sqyard: "Sq. Yard",
  sqft: "Sq. Ft.",
  hectare: "Hectare",
};

const LandConverterChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("bigha");
  const [result, setResult] = useState(null);

  const convert = () => {
    if (value && !isNaN(value)) {
      const converted = value * conversions[unit];
      setResult({
        input: value,
        unit,
        factor: conversions[unit],
        hectares: converted,
      });
    }
  };

  return (
    <div className="fixed bottom-2 right-6 z-50">
      {/* Floating toggle button with new icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-green-700 via-lime-500 to-emerald-500 text-white rounded-full shadow-xl flex items-center justify-center text-3xl hover:scale-110 transition-all border-4 border-green-300"
        aria-label="Open Land Converter"
        style={{ animation: "bounce 1.2s infinite alternate" }}
      >
        <FaRulerCombined />
      </button>

      {/* AI-style popup */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-[350px] max-w-full bg-gradient-to-br from-green-900 via-gray-900 to-black rounded-2xl shadow-2xl border border-green-700/40 animate-fadeIn z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="flex items-center gap-2">
              <FaLeaf className="text-green-400 text-xl animate-bounce" />
              <span className="text-lg font-bold bg-gradient-to-r from-green-300 to-teal-400 bg-clip-text text-transparent drop-shadow">
                Land Converter AI
              </span>
            </div>
            <button
              className="text-green-400 hover:text-red-500 text-xl font-bold"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mb-2">
            Instantly convert land units for agriculture!
          </p>

          {/* Body */}
          <div className="px-4 pb-4 space-y-4">
            <div className="flex gap-2">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/80"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/80"
              >
                {Object.keys(conversions).map((u) => (
                  <option key={u} value={u}>
                    {unitLabels[u]}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={convert}
              className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition flex items-center justify-center gap-2 shadow"
            >
              <FaExchangeAlt /> Convert
            </button>

            {/* AI-style result bubble */}
            {result && (
              <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-3 rounded-xl text-sm text-gray-800 border border-blue-200 space-y-1 shadow animate-fadeIn">
                <div className="flex items-center gap-2 mb-1">
                  <FaRulerCombined className="text-green-500" />
                  <span className="font-semibold">Result:</span>
                </div>
                <p>
                  ✅ <b>{result.input}</b> {unitLabels[result.unit]}
                </p>
                <p>
                  🔢 <b>Factor:</b> {result.factor}{" "}
                  <span className="text-xs">
                    (1 {unitLabels[result.unit]} = {result.factor} ha)
                  </span>
                </p>
                <p>
                  📐 <b>Calculation:</b> {result.input} × {result.factor} ={" "}
                  <b>{result.hectares.toFixed(4)}</b>
                </p>
                <p className="text-green-700 font-semibold">
                  🌿 <b>Final:</b> {result.input} {unitLabels[result.unit]} ={" "}
                  {result.hectares.toFixed(4)} hectares
                </p>
              </div>
            )}
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
    </div>
  );
};

export default LandConverterChat;

