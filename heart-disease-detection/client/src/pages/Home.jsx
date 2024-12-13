import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import HeroImage from "../assets/Heart.png"

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
    <div className="bg-[#f8f8f8] flex flex-col h-screen font-[Poppins]">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center flex-grow p-6">
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
    </div>
  );
};

export default Home;
