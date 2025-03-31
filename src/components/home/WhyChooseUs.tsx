
import React, { useEffect, useRef, useState } from 'react';
import { Shield, Clock, Award, Users } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const featureRef = useRef<HTMLDivElement>(null);

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

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={featureRef}
      className={`flex flex-col items-center text-center transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="bg-rcs-gold p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
        <div className="text-rcs-blue">{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-rcs-blue mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-rcs-blue mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            With over a decade of experience in the construction industry, we've earned the trust of our clients through quality craftsmanship and reliable service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<Shield size={32} />}
            title="Quality Guaranteed"
            description="We never compromise on quality. Every project we undertake meets the highest standards in the industry."
            delay={100}
          />
          <Feature
            icon={<Clock size={32} />}
            title="On-Time Delivery"
            description="We understand the importance of timelines. Our projects are completed on schedule without sacrificing quality."
            delay={200}
          />
          <Feature
            icon={<Award size={32} />}
            title="Experienced Team"
            description="Our team consists of highly skilled professionals with years of experience in the construction industry."
            delay={300}
          />
          <Feature
            icon={<Users size={32} />}
            title="Customer Satisfaction"
            description="Customer satisfaction is our top priority. We work closely with our clients to ensure their vision becomes reality."
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
