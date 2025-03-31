
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { Building, Home, PenTool, BarChart3, Wrench, Ruler, HardHat, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceProps> = ({ icon, title, description, features }) => {
  return (
    <div className="service-card bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <div className="bg-rcs-blue/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
        <div className="text-rcs-blue">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-rcs-blue mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <h4 className="font-bold text-rcs-blue mb-3">Key Features</h4>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-rcs-gold mr-2">•</span>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link
        to="/contact"
        className="inline-block bg-rcs-gold text-rcs-blue font-medium px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors duration-200"
      >
        Request a Quote
      </Link>
    </div>
  );
};

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Building size={32} />,
      title: "Commercial Construction",
      description: "Comprehensive commercial construction services for businesses of all sizes, from small retail spaces to large office buildings.",
      features: [
        "Custom office buildings and retail spaces",
        "Industrial and manufacturing facilities",
        "Healthcare and institutional buildings",
        "Restaurant and hospitality construction"
      ]
    },
    {
      icon: <Home size={32} />,
      title: "Residential Construction",
      description: "Quality residential construction services for custom homes, multi-family developments, and residential communities.",
      features: [
        "Custom home design and construction",
        "Multi-family residential projects",
        "Residential community development",
        "Luxury home construction"
      ]
    },
    {
      icon: <PenTool size={32} />,
      title: "Renovation & Remodeling",
      description: "Transform your existing spaces with our expert renovation and remodeling services for both residential and commercial properties.",
      features: [
        "Kitchen and bathroom renovations",
        "Office and commercial space remodeling",
        "Home additions and expansions",
        "Historic building restoration"
      ]
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Construction Management",
      description: "Professional management of your construction project from conception to completion, ensuring quality, timeliness, and cost efficiency.",
      features: [
        "Project planning and scheduling",
        "Budget development and management",
        "Quality control and assurance",
        "Risk assessment and mitigation"
      ]
    },
    {
      icon: <Wrench size={32} />,
      title: "General Contracting",
      description: "Comprehensive general contracting services with a focus on quality craftsmanship and attention to detail.",
      features: [
        "Subcontractor coordination and management",
        "Permit acquisition and code compliance",
        "Material procurement and management",
        "Site preparation and cleanup"
      ]
    },
    {
      icon: <Ruler size={32} />,
      title: "Design-Build Services",
      description: "Integrated design-build services that streamline the construction process and ensure cohesive project execution.",
      features: [
        "Collaborative design process",
        "Streamlined project delivery",
        "Single-source responsibility",
        "Cost and schedule optimization"
      ]
    },
    {
      icon: <HardHat size={32} />,
      title: "Infrastructure Development",
      description: "Development of essential infrastructure including roads, bridges, utilities, and public facilities.",
      features: [
        "Road and highway construction",
        "Utility installation and upgrades",
        "Site development and preparation",
        "Environmental compliance"
      ]
    },
    {
      icon: <Truck size={32} />,
      title: "Site Development",
      description: "Comprehensive site development services including land clearing, grading, and utility installation.",
      features: [
        "Land clearing and preparation",
        "Grading and excavation",
        "Drainage system installation",
        "Utility connection and setup"
      ]
    }
  ];

  return (
    <Layout>
      <div className="pt-24 pb-20 bg-rcs-blue/90">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h1>
            <p className="text-xl text-white/80">
              We provide a comprehensive range of construction services to meet all your building needs.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-rcs-blue">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Need a Custom Service?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            We understand that every project is unique. Contact us to discuss your specific requirements and how we can help.
          </p>
          <Link
            to="/contact"
            className="bg-rcs-gold text-rcs-blue font-montserrat font-semibold px-8 py-3 rounded-md hover:bg-yellow-400 transition-colors duration-300 inline-flex items-center justify-center"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
