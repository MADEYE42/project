import React from "react";
import UploadForm from "../components/UploadForm";
import Footer from "../components/Footer";

const Upload = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6] font-[Poppins]">
      {/* Main Section */}
      <div className="flex-grow w-full px-4 md:px-12 lg:px-24 py-6 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 md:p-8">
          <UploadForm />
        </div>
      </div>

      {/* Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Upload;
