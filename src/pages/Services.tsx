import React, { useEffect, useState } from 'react';
import { Building, Home, PenTool, BarChart3, Wrench, Ruler, HardHat, Truck, ChevronDown, Info, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  benefits?: string[];
}

const ServiceCard: React.FC<ServiceProps> = ({ icon, title, description, features, benefits }) => {
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
      
      {benefits && benefits.length > 0 && (
        <>
          <h4 className="font-bold text-rcs-blue mb-3">Benefits</h4>
          <ul className="space-y-2 mb-6">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600">{benefit}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      
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

  const [activeCategory, setActiveCategory] = useState("all");
  
  const serviceCategories = [
    { id: "all", name: "All Services" },
    { id: "commercial", name: "Commercial" },
    { id: "residential", name: "Residential" }, 
    { id: "specialized", name: "Specialized Services" },
    { id: "management", name: "Management & Planning" }
  ];

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
      ],
      benefits: [
        "Increased property value",
        "Enhanced business operations and efficiency",
        "Modern, energy-efficient facilities",
        "Compliance with all commercial building codes"
      ],
      category: "commercial"
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
      ],
      benefits: [
        "Personalized living spaces tailored to your needs",
        "Energy-efficient designs that reduce utility costs",
        "Quality craftsmanship that stands the test of time",
        "Modern amenities that enhance comfort and convenience"
      ],
      category: "residential"
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
      ],
      benefits: [
        "Breathe new life into outdated spaces",
        "Increase property value and marketability",
        "Improve functionality and flow of spaces",
        "Incorporate modern amenities while preserving character"
      ],
      category: "specialized"
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
      ],
      benefits: [
        "Reduced project delays and cost overruns",
        "Single point of accountability",
        "Improved communication between all parties",
        "Expert handling of complex project requirements"
      ],
      category: "management"
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
      ],
      benefits: [
        "Streamlined project execution",
        "Adherence to project timelines",
        "Efficient resource allocation",
        "Consistent quality control across all aspects"
      ],
      category: "management"
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
      ],
      benefits: [
        "Faster project completion",
        "Reduced costs through efficiency",
        "Better communication between design and construction teams",
        "Greater innovation in problem-solving"
      ],
      category: "specialized"
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
      ],
      benefits: [
        "Improved community access and mobility",
        "Enhanced public safety and quality of life",
        "Support for economic growth and development",
        "Sustainable infrastructure solutions"
      ],
      category: "commercial"
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
      ],
      benefits: [
        "Properly prepared building sites for successful construction",
        "Effective management of water runoff and drainage",
        "Minimized environmental impact through careful planning",
        "Efficient utility connections ready for future construction"
      ],
      category: "commercial"
    }
  ];

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <>
      <div className="pt-24 pb-20 bg-gradient-to-r from-rcs-blue to-rcs-blue/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 shadow-text">Our Services</h1>
            <p className="text-xl text-white mb-8">
              We provide a comprehensive range of construction services to meet all your building needs.
            </p>
            <div className="flex justify-center">
              <Link
                to="/contact"
                className="bg-rcs-gold text-rcs-blue font-montserrat font-semibold px-8 py-3 rounded-md hover:bg-yellow-400 transition-colors duration-300 inline-flex items-center justify-center"
              >
                Get a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 bg-rcs-gray">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-rcs-blue mb-4">Construction Excellence</h2>
            <p className="text-gray-600">
              With over 20 years of industry experience, we have the expertise to handle projects of any size and complexity. Our team of skilled professionals is dedicated to delivering exceptional results that exceed your expectations.
            </p>
          </div>
          
          <div className="mb-12">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
              <TabsList className="w-full flex flex-wrap justify-center mb-8 bg-white p-1 rounded-lg shadow-sm">
                {serviceCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className={cn(
                      "flex-grow data-[state=active]:bg-rcs-blue data-[state=active]:text-white",
                      "max-w-[200px] my-1"
                    )}
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service, index) => (
                  <ServiceCard
                    key={index}
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    benefits={service.benefits}
                  />
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-rcs-blue mb-4">About Our Process</h2>
            <p className="text-gray-600">
              At Rodelas Construction Services, we've refined our construction process to ensure efficient, high-quality results on every project. Our approach is collaborative, transparent, and focused on your satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-rcs-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-rcs-blue" size={28} />
              </div>
              <h3 className="text-xl font-bold text-rcs-blue mb-2">Planning & Design</h3>
              <p className="text-gray-600">We work closely with you to understand your vision, needs, and budget, developing comprehensive plans that will guide the entire construction process.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-rcs-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HardHat className="text-rcs-blue" size={28} />
              </div>
              <h3 className="text-xl font-bold text-rcs-blue mb-2">Construction</h3>
              <p className="text-gray-600">Our skilled team executes the project with precision, adhering to the highest standards of quality and safety while keeping you informed throughout the process.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
              <div className="w-16 h-16 bg-rcs-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-rcs-blue" size={28} />
              </div>
              <h3 className="text-xl font-bold text-rcs-blue mb-2">Completion & Support</h3>
              <p className="text-gray-600">We conduct thorough inspections to ensure everything meets our high standards, and provide ongoing support to address any questions or needs that arise after project completion.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-rcs-blue mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">Find answers to common questions about our services and construction process.</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-rcs-blue font-medium">
                  How long does a typical construction project take?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Project timelines vary based on size, complexity, and scope. A small renovation might take a few weeks, while a custom home could take 6-12 months. Commercial projects typically range from 3-18 months. During our initial consultation, we'll provide a detailed timeline specific to your project.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-rcs-blue font-medium">
                  Do you handle permits and inspections?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes, we manage all necessary permits, approvals, and inspections as part of our comprehensive service. Our team has extensive experience navigating local building codes and regulatory requirements, ensuring your project proceeds smoothly and remains fully compliant.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-rcs-blue font-medium">
                  How do you ensure quality control during construction?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Quality control is integrated throughout our process. We employ experienced project managers who oversee daily operations, conduct regular inspections, and ensure adherence to plans and specifications. We also maintain stringent material standards and work with trusted subcontractors who share our commitment to excellence.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-rcs-blue font-medium">
                  What types of projects do you specialize in?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We specialize in a wide range of construction projects including custom homes, commercial buildings, renovations, additions, and infrastructure development. Our versatile expertise allows us to handle projects of various sizes and complexities, from small residential remodels to large commercial developments.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-rcs-blue font-medium">
                  How do you handle changes during the construction process?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  We understand that changes may arise during construction. We manage changes through a formal change order process that documents the requested modifications, associated costs, and potential timeline adjustments. This transparent approach ensures clear communication and prevents misunderstandings while accommodating your evolving needs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <div className="py-16 bg-rcs-blue">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Need a Custom Service?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            We understand that every project is unique. Contact us to discuss your specific requirements and how we can help create a tailored solution for your construction needs.
          </p>
          <Link
            to="/contact"
            className="bg-rcs-gold text-rcs-blue font-montserrat font-semibold px-8 py-3 rounded-md hover:bg-yellow-400 transition-colors duration-300 inline-flex items-center justify-center"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  );
};

export default Services;
