import React, { useState } from 'react';
import { Home, Upload, Database, User, LogIn, Menu, X, ChevronRight, Activity, Layers3 as Layers3D, FileImage, FileJson } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Architecture from './components/Architecture';
import Workflow from './components/Workflow';
import Footer from './components/Footer';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      <main>
        <Hero />
        <Features />
        <Architecture />
        <Workflow />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;