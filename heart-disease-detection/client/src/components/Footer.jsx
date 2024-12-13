import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-6 text-center text-sm font-[Poppins]">
      <p>
        &copy; {new Date().getFullYear()} HeartCare AI. Your Heart, Our
        Priority.
      </p>
    </footer>
  );
};

export default Footer;
