import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("File uploaded successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto font-[Poppins]"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Upload Your Heart Scan</h2>
      <label className="block mb-4 text-gray-600">
        Select Image File:
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 block w-full border border-gray-300 rounded p-2"
        />
      </label>
      <button
        type="submit"
        className="w-full bg-[#9cbca3] text-white py-2 rounded hover:bg-[#87a091] transition"
      >
        Upload
      </button>
      {file && (
        <p className="text-sm text-gray-500 mt-2">Selected File: {file.name}</p>
      )}
    </form>
  );
};

export default UploadForm;
