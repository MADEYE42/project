import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPredictions(null);

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

      // Debugging: Log the response
      console.log("Response from backend:", response.data);

      // Ensure predictions and annotations exist in the response
      if (response.data.predictions) {
        setPredictions(response.data.predictions);
      } else {
        setError("Predictions are missing in the response.");
      }

      if (response.data.annotations) {
        setAnnotations(response.data.annotations);
      } else {
        setError("Annotations are missing in the response.");
      }

      // If the segmented image URL exists
      if (response.data.segmented_image) {
        setImageUrl(response.data.segmented_image);
        console.log("Segmented Image URL:", response.data.segmented_image);
      }
    } catch (err) {
      // Log error response for better debugging
      console.error("Error during upload:", err);
      setError(
        err.response?.data?.error || "An error occurred during the upload"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#9cbca3] min-h-screen flex justify-center items-center">
      <div className="bg-[#d8e2d1] p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6 text-[#3b3f2e]">
          Upload Files
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-[#3b3f2e]">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full p-2 border border-[#a4b89b] rounded-md bg-[#f0f3e2] text-[#3b3f2e] focus:outline-none focus:border-[#9cbca3]"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-[#3b3f2e]">
              Upload JSON File
            </label>
            <input
              type="file"
              accept=".json"
              onChange={(e) => setJsonFile(e.target.files[0])}
              required
              className="w-full p-2 border border-[#a4b89b] rounded-md bg-[#f0f3e2] text-[#3b3f2e] focus:outline-none focus:border-[#9cbca3]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md bg-[#9cbca3] text-white font-semibold ${
              loading ? "opacity-50" : "hover:bg-[#7d9b7b]"
            } transition`}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>

        {predictions && (
          <div className="mt-6">
            <h3 className="font-semibold text-[#3b3f2e]">Predictions:</h3>
            <ul className="list-disc pl-5 text-[#3b3f2e]">
              {predictions.map((pred, index) => (
                <li key={index}>
                  {pred.class}: {pred.probability.toFixed(2)}%
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
