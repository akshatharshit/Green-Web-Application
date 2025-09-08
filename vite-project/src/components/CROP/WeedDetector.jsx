import React, { useState, useRef } from "react";
import axios from "axios";

const WeedDetector = () => {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const canvasRef = useRef(null);

  // Convert file to Base64
  const loadImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await loadImageBase64(file);
    setImage(base64);

    try {
      const response = await axios({
        method: "POST",
        url: "https://serverless.roboflow.com/weeds-nxe1w/1",
        params: {
          api_key: import.meta.env.REACT_APP_ROBOFLOW_API_KEY, // Use env key
        },
        data: base64,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setPredictions(response.data.predictions);
    } catch (error) {
      console.error("Error detecting weeds:", error.message);
    }
  };

  // Draw bounding boxes
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = image;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      predictions.forEach((pred) => {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.strokeRect(
          pred.x - pred.width / 2,
          pred.y - pred.height / 2,
          pred.width,
          pred.height
        );

        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        ctx.fillText(
          `${pred.class} (${(pred.confidence * 100).toFixed(1)}%)`,
          pred.x - pred.width / 2,
          pred.y - pred.height / 2 - 10
        );
      });
    };
  };

  React.useEffect(() => {
    if (image && predictions.length > 0) {
      drawCanvas();
    }
  }, [image, predictions]);

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {image && (
        <canvas
          ref={canvasRef}
          style={{ border: "2px solid #ddd", maxWidth: "100%" }}
        />
      )}
    </div>
  );
};

export default WeedDetector;
