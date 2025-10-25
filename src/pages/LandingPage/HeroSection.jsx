import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css'; // Import the CSS

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="hero-section relative min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-white overflow-hidden">
      
      {/* Animated Bubbles */}
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${10 + Math.random() * 40}px`,
            height: `${10 + Math.random() * 40}px`,
            animationDuration: `${10 + Math.random() * 20}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <div
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-black leading-tight">
          Invest in the
          <span className="block text-black">Future</span>
        </h1>
        <p className="text-xl md:text-2xl text-black mb-12 leading-relaxed max-w-3xl mx-auto">
          Where ideas become startups, and startups find the capital they need — smartly.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="group px-8 py-4 font-bold bg-gradient-to-r from-yellow-300 via-amber-500 to-orange-600 
                       hover:from-black hover:via-black hover:to-black 
                       text-black hover:text-white rounded-full text-lg font-semibold 
                       hover:scale-105 transform transition-all duration-300 
                       shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center cursor-pointer">
              Start Your Journey
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-black" />
      </div>
    </section>
  );
};

export default HeroSection;
