import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setError("");
    } else {
      setError("Please upload a valid image file.");
    }
  };

  const handleJsonChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/json") {
      setJsonFile(file);
      setError("");
    } else {
      setError("Please upload a valid JSON file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile || !jsonFile) {
      setError("Both image and JSON files are required.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("json", jsonFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setPrediction(response.data.results);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Prediction failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-[#9cbca3] p-8 rounded-lg shadow-lg mx-auto"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-semibold">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div>
          <label className="block text-lg font-semibold">
            Upload JSON File
          </label>
          <input
            type="file"
            accept="application/json"
            onChange={handleJsonChange}
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-[#617f6d] text-white font-semibold rounded-lg"
        >
          Submit
        </button>
      </div>

      {prediction && (
        <div className="mt-6 p-4 bg-[#f1f7f3] rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Prediction Result</h3>
          <p>Class: {prediction.class}</p>
          <p>Confidence: {prediction.confidence.toFixed(2)}%</p>
        </div>
      )}
    </form>
  );
};

export default UploadForm;
