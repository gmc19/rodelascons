
import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";
import MosaicGallery from './about/MosaicGallery';
import ExcellenceBadge from './about/ExcellenceBadge';
import AboutContent from './about/AboutContent';

const AboutUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const excellenceYears = 13;

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Excellence badge - positioned top-right of the mosaic */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 z-10">
                <ExcellenceBadge years={excellenceYears} isVisible={isVisible} />
              </div>

              {/* Mosaic grid with project images */}
              <MosaicGallery isVisible={isVisible} />
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <AboutContent isVisible={isVisible} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
