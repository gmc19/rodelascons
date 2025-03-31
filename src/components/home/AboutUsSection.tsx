import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Clock, CheckCircle } from 'lucide-react';
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
  return <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" alt="Rodelas Construction Team" className="rounded-lg shadow-xl z-10 relative" />
              <div className="absolute -bottom-6 -right-6 bg-rcs-gold p-6 shadow-lg rounded-lg px-50 px-[240px] py-[185px]">
                <div className="text-rcs-blue font-montserrat">
                  <div className="text-4xl font-bold">13+</div>
                  <div className="font-medium">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-rcs-blue mb-6">About Rodelas Construction Services</h2>
            
            <p className="text-gray-700 mb-6 text-lg">
              Since 2010, Rodelas Construction Services has been delivering exceptional construction solutions across residential, commercial, and industrial sectors. We combine technical expertise with innovative approaches to create buildings that stand the test of time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <Award className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-rcs-blue text-lg">Quality Excellence</h3>
                  <p className="text-gray-600">Committed to the highest standards in every project</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-rcs-blue text-lg">Expert Team</h3>
                  <p className="text-gray-600">Skilled professionals with decades of combined experience</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-rcs-blue text-lg">On-Time Delivery</h3>
                  <p className="text-gray-600">We value your time and adhere to strict schedules</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-rcs-blue text-lg">Client Satisfaction</h3>
                  <p className="text-gray-600">Your vision and satisfaction are our top priorities</p>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="inline-flex items-center text-rcs-blue bg-rcs-gold px-6 py-3 rounded-md hover:bg-yellow-400 transition-colors duration-300 font-semibold">
              Learn More About Us <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutUsSection;