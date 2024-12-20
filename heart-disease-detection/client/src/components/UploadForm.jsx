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
    <div className="p-8 bg-[#9cbca3] min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-semibold text-center text-[#4c5c48] mb-6">
          Upload Files for Prediction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#4c5c48]">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full border border-[#4c5c48] bg-[#f5f7f2] text-[#4c5c48] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9cbca3]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#4c5c48]">
              Upload JSON File
            </label>
            <input
              type="file"
              accept=".json"
              onChange={(e) => setJsonFile(e.target.files[0])}
              required
              className="w-full border border-[#4c5c48] bg-[#f5f7f2] text-[#4c5c48] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9cbca3]"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#4c5c48] text-white px-6 py-3 rounded-md hover:bg-[#2a3924] transition duration-200 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

        {prediction && (
          <div className="mt-6 bg-[#f5f7f2] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#4c5c48]">
              Prediction Results
            </h3>
            <ul className="mt-3 text-sm text-[#4c5c48]">
              {prediction.map((result, index) => (
                <li key={index} className="py-1">
                  {index + 1}.{" "}
                  <span className="font-semibold">{result.class}</span>:{" "}
                  <span className="font-light">
                    {result.probability.toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
