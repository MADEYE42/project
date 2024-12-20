import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
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
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
      setPrediction(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Upload JSON File:</label>
          <input
            type="file"
            accept=".json"
            onChange={(e) => setJsonFile(e.target.files[0])}
            required
            className="mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {error && <div className="mt-4 text-red-500">{error}</div>}

      {prediction && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">Prediction Results</h3>
          <ul className="text-sm">
            {prediction.map((result, index) => (
              <li key={index}>
                {index + 1}. {result.class}: {result.probability.toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
