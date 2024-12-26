import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUpload, FaSearch } from "react-icons/fa";
import HeroImage from "../assets/Heart.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#9cbca3] p-4 shadow-lg font-[Poppins]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-2xl font-bold flex items-center space-x-2"
        >
          <img src={HeroImage} alt="HeartCare AI Logo" className="h-8" />
          <span>HeartCare </span>
        </Link>

        {/* Navigation Links for Desktop */}
        <div className="space-x-8 hidden md:flex">
          <Link
            to="/"
            className="text-white hover:text-[#4e8b7c] flex items-center space-x-2 transition duration-300"
          >
            <FaHome />
            <span>Home</span>
          </Link>
          <Link
            to="/upload"
            className="text-white hover:text-[#4e8b7c] flex items-center space-x-2 transition duration-300"
          >
            <FaUpload />
            <span>Upload</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-[#9cbca3] p-4 space-y-4`}
      >
        <Link
          to="/"
          className="text-white hover:text-[#4e8b7c] flex items-center space-x-2 transition duration-300"
          onClick={toggleMobileMenu}
        >
          <FaHome />
          <span>Home</span>
        </Link>
        <Link
          to="/upload"
          className="text-white hover:text-[#4e8b7c] flex items-center space-x-2 transition duration-300"
          onClick={toggleMobileMenu}
        >
          <FaUpload />
          <span>Upload</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
