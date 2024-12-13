import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#9cbca3] p-4 shadow-md font-[Poppins]">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          HeartCare AI
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/upload" className="text-white hover:underline">
            Upload
          </Link>
          <Link to="/results" className="text-white hover:underline">
            Results
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
