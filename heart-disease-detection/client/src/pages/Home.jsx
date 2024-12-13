import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import HeroImage from "../assets/Heart.png"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const phrases = [
  "Your AI Partner for Heart Care.",
  "Smart Analysis for Better Health.",
  "Upload Scans. Get Instant Results.",
];

const Home = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#f8f8f8] flex flex-col  font-[Poppins]">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center flex-grow h-[80vh] p-6">
        {/* Left Side - Animated Text */}
        <div className="w-full md:w-1/2 text-center md:text-left p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4a5568] mb-6 leading-tight">
            Welcome to <span className="text-[#9cbca3]">HeartCare AI</span>
          </h1>
          <TransitionGroup>
            <CSSTransition
              key={phrases[currentPhraseIndex]}
              timeout={1000}
              classNames="fade"
            >
              <p className="text-lg md:text-2xl text-gray-600 transition-opacity ease-in-out duration-1000">
                {phrases[currentPhraseIndex]}
              </p>
            </CSSTransition>
          </TransitionGroup>
          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link to="/upload">
              <button className="bg-[#9cbca3] hover:bg-[#6b8c77] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Upload Scans
              </button>
            </Link>
            <Link to="/info">
              <button className="bg-transparent border-2 border-[#9cbca3] text-[#9cbca3] hover:bg-[#9cbca3] hover:text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side - Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={HeroImage}
            alt="Hero Heart Scan"
            className="max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl animate-pulse"
          />
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-white py-8 shadow-md">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-10">
          {/* Information Button */}
          <div className="flex items-center space-x-4 hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-full bg-[#9cbca3] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              i
            </div>
            <span className="text-gray-700 font-semibold">
              Information about the AI model
            </span>
          </div>

          {/* Results Button */}
          <div className="flex items-center space-x-4 hover:scale-105 transition-transform">
            <Link to="/upload">
              <div className="w-12 h-12 rounded-full bg-[#9cbca3] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                ✔
              </div>
            </Link>
            <span className="text-gray-700 font-semibold">
              Upload scans to get results
            </span>
          </div>
        </div>
      </section>
          <footer className="bg-gray-900 text-gray-200 py-12 font-[Poppins]">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold text-white mb-4">HeartCare AI</h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            At HeartCare AI, we utilize the latest in artificial intelligence
            to provide real-time heart health analysis. Helping you take charge
            of your health, one scan at a time.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/upload"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Upload Scans
              </a>
            </li>
            <li>
              <a
                href="/results"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Results
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="text-center md:text-right">
          <h3 className="text-2xl font-semibold text-white mb-4">Contact</h3>
          <p className="text-gray-400">Email: support@heartcareai.com</p>
          <p className="text-gray-400">Phone: +1 (800) 123-4567</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} <span className="text-white">HeartCare AI</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
    </div>
  );
};

export default Home;
