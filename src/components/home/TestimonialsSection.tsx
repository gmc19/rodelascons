import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  stars: number;
  image?: string;
  project?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jezelle HauteAmorado",
    role: "Business Owner",
    company: "Jezelle HauteAmorado Fashion Boutique",
    quote: "Rodelas Construction Services transformed our commercial space into a stunning fashion boutique. Their attention to detail in the glass partitions and interior design perfectly captures our brand's essence.",
    stars: 5,
    project: "Commercial Interior Fit-Out"
  },
  {
    id: 2,
    name: "Racha Family",
    role: "Homeowner",
    company: "",
    quote: "We are extremely satisfied with how RCS brought our vision to life. Every detail of our home, from the structure to the finishes, was thoughtfully designed and executed with precision.",
    stars: 5,
    project: "The Racha Project"
  },
  {
    id: 3,
    name: "South Forbes Resident",
    role: "Property Owner",
    company: "South Forbes Villas",
    quote: "The renovation work by RCS has completely transformed our property. Their expertise in surface preparation and attention to detail in the repainting has given our home a fresh, modern look while preserving its classic character.",
    stars: 5,
    project: "Renovation & Repaint Project"
  },
  {
    id: 4,
    name: "Cassasis Family",
    role: "Homeowner",
    company: "",
    quote: "From blueprints to reality, RCS has exceeded our expectations. Their ability to deliver quality craftsmanship and attention to detail has resulted in a beautiful home we're proud of. Glory to God!",
    stars: 5,
    project: "Cassasis Residential Building"
  }
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const TestimonialsSection = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Calculate current testimonial index
  const testimonialIndex = Math.abs(page % testimonials.length);

  // Navigation functions
  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    if (isAutoplay) setIsAutoplay(false);
  }, [page, isAutoplay]);

  // Autoplay
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [paginate, isAutoplay]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-rcs-blue mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto overflow-hidden">
          <div className="h-[500px] md:h-[400px] relative">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full h-full"
              >
                <div className="bg-rcs-gray rounded-xl p-6 md:p-10 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex text-rcs-gold mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={20}
                            fill={i < testimonials[testimonialIndex].stars ? "currentColor" : "none"}
                            className={i < testimonials[testimonialIndex].stars ? "text-rcs-gold" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      
                      <blockquote className="text-gray-700 italic text-lg mb-6 leading-relaxed">
                        "{testimonials[testimonialIndex].quote}"
                      </blockquote>
                      
                      {testimonials[testimonialIndex].project && (
                        <div className="mb-4">
                          <span className="bg-rcs-blue/10 text-rcs-blue px-3 py-1 rounded-full text-sm font-medium">
                            {testimonials[testimonialIndex].project}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-4">
                      {testimonials[testimonialIndex].image ? (
                        <img 
                          src={testimonials[testimonialIndex].image} 
                          alt={testimonials[testimonialIndex].name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-rcs-blue"
                        />
                      ) : (
                        <div className="bg-rcs-blue text-white rounded-full w-12 h-12 flex items-center justify-center font-montserrat font-bold">
                          {testimonials[testimonialIndex].name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <div className="ml-4">
                        <p className="font-bold text-rcs-blue">{testimonials[testimonialIndex].name}</p>
                        <p className="text-sm text-gray-500">
                          {testimonials[testimonialIndex].role}
                          {testimonials[testimonialIndex].company && `, ${testimonials[testimonialIndex].company}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center bg-rcs-blue/10 rounded-lg overflow-hidden">
                    <div className="relative w-full h-full p-6 flex flex-col justify-center items-center text-center">
                      <div className="absolute inset-0 bg-rcs-blue/5 backdrop-blur-sm"></div>
                      <div className="relative z-10">
                        <h3 className="text-rcs-blue font-bold text-2xl mb-3">Ready to Transform Your Space?</h3>
                        <p className="text-gray-600 mb-6">Join our satisfied clients and experience exceptional construction services.</p>
                        <a href="/contact" className="bg-rcs-blue text-white px-6 py-2 rounded-md flex items-center justify-center w-max mx-auto hover:bg-blue-800 transition duration-300">
                          Get in Touch <ArrowRight size={16} className="ml-2" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation controls */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 md:px-10">
            <button 
              onClick={() => paginate(-1)}
              className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md text-rcs-blue hover:text-rcs-gold focus:outline-none transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => paginate(1)}
              className="bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md text-rcs-blue hover:text-rcs-gold focus:outline-none transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Dots indicators */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const direction = index > testimonialIndex ? 1 : -1;
                  setPage([index, direction]);
                  setIsAutoplay(false);
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === testimonialIndex ? 'bg-rcs-gold' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
