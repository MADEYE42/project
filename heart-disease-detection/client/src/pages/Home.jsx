import React from "react";
import { Heart, Users, FileText, LineChart } from "lucide-react";
import HeroImage from "../assets/Heart.png";
import BackgroundImage from "../assets/Background.png";
import { Link } from "react-router-dom";

export default function Home() {
  const FloatingIcon = ({ icon: Icon, position }) => (
    <div
      className={`absolute ${position} transition-transform duration-700 hover:scale-125`}
    >
      <div className="bg-white p-4 rounded-full shadow-lg backdrop-blur-md animate-float">
        <Icon className="w-8 h-8 text-pink-800" />
      </div>
    </div>
  );

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center text-pink-800">
          <h1 className="text-6xl font-extrabold mb-6 tracking-tight animate-fade-in">
            Fetal Heart Abnormalities
          </h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Empowering healthcare with AI-driven solutions for early detection
            and improved patient outcomes.
          </p>
          <div className="flex justify-center gap-8">
            <Link to="/upload">
              <button className="bg-pink-500 px-10 text-white py-4 text-lg rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-pink-600 transition-transform transform hover:scale-105">
                Get Started
              </button>
            </Link>
            <Link to="/research">
              <button className="bg-pink-100 px-10 py-4 text-lg text-pink-500 rounded-full font-medium shadow-lg hover:shadow-xl hover:bg-pink-200 transition-transform transform hover:scale-105">
                Learn More
              </button>
            </Link>
          </div>
        </section>

        {/* Hero Image */}
        <div className="relative flex items-center justify-center mt-16">
          <div className="w-80 h-80 sm:w-96 sm:h-96 bg-white rounded-full flex items-center justify-center shadow-xl animate-scale-up">
            <img
              src={HeroImage}
              alt="Fetal illustration"
              className="w-2/3 h-2/3 object-contain"
            />
          </div>

          {/* Floating Icons */}
          <FloatingIcon icon={Heart} position="top-[10%] left-[20%]" />
          <FloatingIcon icon={Users} position="top-[30%] right-[15%]" />
          <FloatingIcon icon={FileText} position="bottom-[30%] left-[15%]" />
          <FloatingIcon icon={LineChart} position="bottom-[10%] right-[20%]" />
        </div>

        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Research",
              description:
                "Stay informed with the latest research and breakthroughs.",
              icon: FileText,
              path: "/research",
            },
            {
              title: "Contact Us",
              description:
                "Reach out to our experts for personalized guidance and support.",
              icon: Users,
              path: "/contact-us",
            },
            {
              title: "Upload Scans",
              description:
                "Upload the Ultrasound image to get the predictions.",
              icon: Users,
              path: "/upload",
            },
          ].map((feature, index) => (
            <Link to={feature.path || "#"} key={index}>
              <div className="bg-white p-8 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl group transition-all duration-500 transform">
                <div className="bg-pink-200 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <feature.icon className="text-pink-800 w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-pink-800">
                  {feature.title}
                </h3>
                <p className="text-pink-600">{feature.description}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
