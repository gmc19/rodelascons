
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO",
    company: "Smith Enterprises",
    quote: "Rodelas Construction Services delivered our office building renovation project on time and within budget. Their attention to detail and quality of work exceeded our expectations.",
    stars: 5
  },
  {
    id: 2,
    name: "Emily Johnson",
    role: "Property Developer",
    company: "Johnson Properties",
    quote: "We've worked with RCS on multiple residential projects, and they've consistently proven their expertise and reliability. Highly recommended for any construction needs.",
    stars: 5
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Director",
    company: "City Development Corp",
    quote: "The team at Rodelas Construction Services are true professionals. From planning to execution, they managed our commercial project with precision and excellence.",
    stars: 4
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-rcs-blue mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about working with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="transition-transform duration-500 ease-in-out flex"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
                    <div className="flex text-rcs-gold mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          size={20}
                          fill={i < testimonial.stars ? "currentColor" : "none"}
                          className={i < testimonial.stars ? "text-rcs-gold" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <blockquote className="text-gray-600 italic mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="bg-rcs-blue text-white rounded-full w-12 h-12 flex items-center justify-center font-montserrat font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <p className="font-bold text-rcs-blue">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={goToPrev}
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-rcs-blue hover:text-rcs-gold focus:outline-none transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={goToNext}
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-rcs-blue hover:text-rcs-gold focus:outline-none transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-rcs-gold' : 'bg-gray-300'
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
