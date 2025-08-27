import React, { useState } from "react";
import axios from "axios";

const DiseasePredictor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResult(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://green-web-application-1.onrender.com/disease-predict", // your backend URL
        // "http://127.0.0.1:7000/disease-predict", // your backend URL
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while predicting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Disease Predictor</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          {loading ? "Predicting..." : "Predict Disease"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 max-w-2xl bg-white p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Disease Prediction Result
          </h2>

          <p className="mb-2">
            <span className="font-semibold">Crop:</span> {result.Crop}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Disease:</span> {result.Disease}
          </p>

          <div className="mb-4">
            <h3 className="font-semibold text-green-700 mb-2">Cause:</h3>
            <ul className="list-disc list-inside space-y-1">
              {result.Cause.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-green-700 mb-2">Prevention / Cure:</h3>
            <ul className="list-disc list-inside space-y-1">
              {result.Prevent_Cure.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseasePredictor;
