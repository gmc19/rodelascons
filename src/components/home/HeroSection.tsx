
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative h-screen">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div 
            className="max-w-3xl" 
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 1s ease-out'
            }}
          >
            <h1 className="text-5xl md:text-6xl text-white mb-6 leading-tight text-shadow lg:text-6xl font-bold">
              Building Tomorrow's Landmarks Today
            </h1>
            <p className="text-xl text-white mb-10 text-shadow md:text-2xl font-normal">
              Rodelas Construction Services - Excellence in construction, renovation, and engineering since 2010.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/services" 
                className="bg-rcs-gold text-rcs-blue font-montserrat font-bold px-8 py-4 rounded-md hover:bg-yellow-400 transition-colors duration-300 inline-flex items-center justify-center text-lg"
              >
                Our Services
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link 
                to="/contact" 
                className="bg-white text-rcs-blue font-montserrat font-bold px-8 py-4 rounded-md hover:bg-gray-100 transition-colors duration-300 inline-flex items-center justify-center text-lg"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
