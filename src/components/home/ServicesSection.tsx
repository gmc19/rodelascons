
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Home, PenTool, BarChart3 } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`service-card bg-white p-6 rounded-lg shadow-md transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="bg-rcs-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
        <div className="text-rcs-blue">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-rcs-blue mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to="/services"
        className="text-rcs-blue font-medium hover:text-rcs-gold transition-colors duration-200"
      >
        Learn More →
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section className="py-20 bg-rcs-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-rcs-blue mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of construction services tailored to meet your specific needs and requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            icon={<Building size={32} />}
            title="Commercial Construction"
            description="Full-service commercial construction for retail spaces, offices, and industrial facilities."
            delay={100}
          />
          <ServiceCard
            icon={<Home size={32} />}
            title="Residential Construction"
            description="Quality home building services, from custom homes to multi-family residential projects."
            delay={200}
          />
          <ServiceCard
            icon={<PenTool size={32} />}
            title="Renovation & Remodeling"
            description="Transform your existing spaces with our expert renovation and remodeling services."
            delay={300}
          />
          <ServiceCard
            icon={<BarChart3 size={32} />}
            title="Construction Management"
            description="Professional management of your construction project from start to finish."
            delay={400}
          />
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="bg-rcs-blue text-white font-montserrat font-semibold px-8 py-3 rounded-md hover:bg-blue-900 transition-colors duration-300 inline-flex items-center justify-center"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
