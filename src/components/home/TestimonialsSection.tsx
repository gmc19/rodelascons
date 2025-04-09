
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
    name: "John Smith",
    role: "CEO",
    company: "Smith Enterprises",
    quote: "Rodelas Construction Services delivered our office building renovation project on time and within budget. Their attention to detail and quality of work exceeded our expectations.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    project: "Office Building Renovation"
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Property Developer",
    company: "Johnson Properties",
    quote: "We've worked with RCS on multiple residential projects, and they've consistently proven their expertise and reliability. Highly recommended for any construction needs.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    project: "Luxury Apartment Complex"
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Director",
    company: "City Development Corp",
    quote: "The team at Rodelas Construction Services are true professionals. From planning to execution, they managed our commercial project with precision and excellence.",
    stars: 4,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    project: "Commercial Mall Construction"
  },
  {
    id: 4,
    name: "Sandra Martinez",
    role: "Homeowner",
    company: "",
    quote: "We hired RCS for our home renovation and couldn't be happier with the results. Their team was courteous, professional, and delivered exceptional quality work.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    project: "Home Renovation"
  },
  {
    id: 5,
    name: "Robert Chen",
    role: "Operations Manager",
    company: "Pacific Industries",
    quote: "The industrial facility RCS built for us has been functioning flawlessly. Their understanding of specialized construction requirements made all the difference.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    project: "Industrial Facility Construction"
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
