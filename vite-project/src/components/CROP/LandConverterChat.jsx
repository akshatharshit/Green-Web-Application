import React, { useState } from "react";

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
    <div>
      {/* Floating round toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-green-700 transition transform hover:scale-110"
      >
        🌱
      </button>

      {/* Chat-like popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white shadow-2xl rounded-2xl border border-gray-200 animate-slide-up overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-green-600 text-white rounded-t-2xl">
            <h2 className="text-sm font-semibold">🌾 Land Converter</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg hover:text-gray-200"
            >
              ✖
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {Object.keys(conversions).map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>

            <button
              onClick={convert}
              className="w-full bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition"
            >
              Convert
            </button>

            {/* Conversion steps */}
            {result && (
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border border-gray-200 space-y-1">
                <p>
                  ✅ Input: <b>{result.input}</b> {result.unit}
                </p>
                <p>
                  🔢 Conversion Factor: <b>{result.factor}</b> (1 {result.unit} =
                  {` ${result.factor}`} hectares)
                </p>
                <p>
                  📐 Calculation: {result.input} × {result.factor} ={" "}
                  <b>{result.hectares.toFixed(4)}</b>
                </p>
                <p className="text-green-700 font-semibold">
                  🌿 Final: {result.input} {result.unit} ={" "}
                  {result.hectares.toFixed(4)} hectares
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandConverterChat;
