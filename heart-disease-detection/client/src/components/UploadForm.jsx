import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
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

      const results = response.data.results;
      const highestProbResult = results.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
      );

      setPrediction(results);
      setError(null);

      // Dynamically load images based on the class with the highest probability
      const folderName = highestProbResult.class;
      const imagePaths = Array.from({ length: 8 }, (_, i) => {
        const index = i + 1;
        const imagePath = `heart-disease-detection/client/src/assets/Segregated_Final/${folderName}/${folderName}(${index}).jpg`;
        return imagePath;
        console.log(imagePath);
      }).filter((path, index) => index < 8); // Limit to available images

      setRelatedImages(imagePaths);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
      setPrediction(null);
      setRelatedImages([]);
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

        {relatedImages.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#4c5c48] mb-4">
              Related Images
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {relatedImages.map((imagePath, index) => (
                <img
                  key={index}
                  src={imagePath}
                  alt={`Related ${index + 1}`}
                  className="rounded-md shadow-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;
