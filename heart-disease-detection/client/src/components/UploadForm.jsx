import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);
    setRelatedImages([]);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("json", jsonFile);

    try {
      console.log("Sending request to server...");
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 30000,
        }
      );

      console.log("Received response:", response.data);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      if (!response.data.results || !Array.isArray(response.data.results)) {
        throw new Error("Invalid response format from server");
      }

      setPrediction(response.data.results);
      console.log("Set prediction:", response.data.results);

      if (
        response.data.related_images &&
        response.data.related_images.length > 0
      ) {
        setRelatedImages(response.data.related_images);
      }
    } catch (err) {
      console.error("Error details:", err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "An error occurred during prediction"
      );
    } finally {
      setLoading(false);
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
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-[#4c5c48] hover:bg-[#2a3924]"
              } text-white px-6 py-3 rounded-md transition duration-200 ease-in-out`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>

        {error && <div>{error}</div>}

        {prediction && (
          <div className="mt-6 bg-[#f5f7f2] p-4 rounded-lg shadow-md">
            <h3>Predictions:</h3>
            {prediction.map((p, idx) => (
              <p key={idx}>
                {p.class}: {p.probability.toFixed(2)}%
              </p>
            ))}
          </div>
        )}

        {relatedImages.length > 0 &&
          relatedImages.map((img, idx) => (
            <img key={idx} src={img} alt={`Related ${idx + 1}`} />
          ))}
      </div>
    </div>
  );
};

export default UploadForm;
