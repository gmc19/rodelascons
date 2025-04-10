
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Home, PenTool, BarChart3, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  features?: string[];
  benefits?: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay, features = [], benefits = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
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
    <>
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
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/services"
            className="text-rcs-blue font-medium hover:text-rcs-gold transition-colors duration-200"
          >
            Learn More →
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2 mt-2 sm:mt-0"
            onClick={() => setShowDetails(true)}
          >
            <Info size={16} /> Service Details
          </Button>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-rcs-blue">{icon}</span>
              {title}
            </DialogTitle>
            <DialogDescription>
              Comprehensive details about our {title.toLowerCase()} services
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-gray-600">{description}</p>
            
            {features.length > 0 && (
              <div>
                <h4 className="font-bold text-rcs-blue mb-2">Key Features</h4>
                <ul className="space-y-2 mb-4 pl-5">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-rcs-gold mr-2">•</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {benefits && benefits.length > 0 && (
              <div>
                <h4 className="font-bold text-rcs-blue mb-2">Benefits</h4>
                <ul className="space-y-2 mb-4 pl-5">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="font-bold text-rcs-blue mb-2">Why Choose Us for {title}</h4>
              <p className="text-gray-600">
                Our team brings years of specialized experience in {title.toLowerCase()}. 
                We use industry-leading techniques and materials to ensure the highest quality results. 
                Our clients consistently praise our attention to detail, communication, and ability to 
                complete projects on time and within budget.
              </p>
            </div>
            
            <div className="flex justify-end items-center pt-4 border-t">
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </Button>
                <Link to="/services">
                  <Button className="bg-rcs-blue hover:bg-blue-800">
                    View All Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ServicesSection = () => {
  const serviceFeatures = {
    "Commercial Construction": [
      "Custom office buildings and retail spaces",
      "Industrial and manufacturing facilities",
      "Healthcare and institutional buildings",
      "Restaurant and hospitality construction"
    ],
    "Residential Construction": [
      "Custom home design and construction",
      "Multi-family residential projects",
      "Residential community development",
      "Luxury home construction"
    ],
    "Renovation & Remodeling": [
      "Kitchen and bathroom renovations",
      "Office and commercial space remodeling",
      "Home additions and expansions",
      "Historic building restoration"
    ],
    "Construction Management": [
      "Project planning and scheduling",
      "Budget development and management",
      "Quality control and assurance",
      "Risk assessment and mitigation"
    ]
  };
  
  const serviceBenefits = {
    "Commercial Construction": [
      "Increased property value",
      "Enhanced business operations and efficiency",
      "Modern, energy-efficient facilities",
      "Compliance with all commercial building codes"
    ],
    "Residential Construction": [
      "Personalized living spaces tailored to your needs",
      "Energy-efficient designs that reduce utility costs",
      "Quality craftsmanship that stands the test of time",
      "Modern amenities that enhance comfort and convenience"
    ],
    "Renovation & Remodeling": [
      "Breathe new life into outdated spaces",
      "Increase property value and marketability",
      "Improve functionality and flow of spaces",
      "Incorporate modern amenities while preserving character"
    ],
    "Construction Management": [
      "Reduced project delays and cost overruns",
      "Single point of accountability",
      "Improved communication between all parties",
      "Expert handling of complex project requirements"
    ]
  };

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
            features={serviceFeatures["Commercial Construction"]}
            benefits={serviceBenefits["Commercial Construction"]}
          />
          <ServiceCard
            icon={<Home size={32} />}
            title="Residential Construction"
            description="Quality home building services, from custom homes to multi-family residential projects."
            delay={200}
            features={serviceFeatures["Residential Construction"]}
            benefits={serviceBenefits["Residential Construction"]}
          />
          <ServiceCard
            icon={<PenTool size={32} />}
            title="Renovation & Remodeling"
            description="Transform your existing spaces with our expert renovation and remodeling services."
            delay={300}
            features={serviceFeatures["Renovation & Remodeling"]}
            benefits={serviceBenefits["Renovation & Remodeling"]}
          />
          <ServiceCard
            icon={<BarChart3 size={32} />}
            title="Construction Management"
            description="Professional management of your construction project from start to finish."
            delay={400}
            features={serviceFeatures["Construction Management"]}
            benefits={serviceBenefits["Construction Management"]}
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
