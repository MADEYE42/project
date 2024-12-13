import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 font-[Poppins]">
      {/* Container */}
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: About */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-white mb-4">HeartCare AI</h3>
          <p className="text-gray-400 leading-relaxed">
            Empowering lives through AI-driven heart care solutions. Analyze,
            predict, and improve your heart health effortlessly with our
            state-of-the-art AI technology.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-gray-100 transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-gray-100 transition duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/upload"
                className="hover:text-gray-100 transition duration-300"
              >
                Upload Scans
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-gray-100 transition duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact Info */}
        <div className="text-center md:text-right">
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <p className="text-gray-400">Email: support@heartcareai.com</p>
          <p className="text-gray-400">Phone: +1 (800) 123-4567</p>
          <div className="flex justify-center md:justify-end mt-4 space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition duration-300"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition duration-300"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition duration-300"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-100 transition duration-300"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} <span className="text-white">HeartCare AI</span>. 
          All Rights Reserved. Your Heart, Our Priority.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
