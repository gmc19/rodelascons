import React, { useEffect, useState } from 'react';
import { Building, Home, PenTool, BarChart3, Wrench, Ruler, HardHat, Truck, ChevronDown, Info, Clock, Users, Search, CheckSquare, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";

interface ServiceProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  benefits?: string[];
  category: string;
}

const ServiceCard: React.FC<ServiceProps> = ({ icon, title, description, features, benefits }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
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
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link
            to="/contact"
            className="inline-block bg-rcs-gold text-rcs-blue font-medium px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors duration-200 text-center"
          >
            Request a Quote
          </Link>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowDetails(true)}
          >
            <Info size={16} /> Service Details
          </Button>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
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
            
            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-sm text-gray-500">
                Contact us for more information about our {title.toLowerCase()} services.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowDetails(false)}>Close</Button>
                <Link to="/contact">
                  <Button className="bg-rcs-blue hover:bg-blue-800">Request Quote</Button>
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const QuickServiceRequestForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this data to a backend
    toast({
      title: "Request Submitted",
      description: "We'll contact you shortly about your service request.",
    });
    
    // Clear form fields
    setName('');
    setEmail('');
    setPhone('');
    setServiceType('');
    setMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-rcs-blue mb-4">Quick Service Request</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
          <select
            id="serviceType"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select a service</option>
            <option value="commercial">Commercial Construction</option>
            <option value="residential">Residential Construction</option>
            <option value="renovation">Renovation & Remodeling</option>
            <option value="management">Construction Management</option>
            <option value="contracting">General Contracting</option>
            <option value="design">Design-Build Services</option>
            <option value="infrastructure">Infrastructure Development</option>
            <option value="site">Site Development</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 h-24"
          ></textarea>
        </div>
        <Button type="submit" className="w-full bg-rcs-blue hover:bg-blue-800">
          Submit Request
        </Button>
      </form>
    </div>
  );
};

const ServiceComparisonTable = ({ services }: { services: ServiceProps[] }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const isMobile = useIsMobile();
  
  const toggleService = (title: string) => {
    if (selectedServices.includes(title)) {
      setSelectedServices(selectedServices.filter(service => service !== title));
    } else {
      if (selectedServices.length < 3) {
        setSelectedServices([...selectedServices, title]);
      } else {
        setSelectedServices([...selectedServices.slice(1), title]);
      }
    }
  };
  
  const filteredServices = services.filter(service => 
    selectedServices.includes(service.title)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-2xl font-bold text-rcs-blue mb-4">Service Comparison</h3>
      <p className="text-gray-600 mb-4">Select up to 3 services to compare their features side by side.</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {services.map((service) => (
          <Button
            key={service.title}
            variant={selectedServices.includes(service.title) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleService(service.title)}
            className={`flex items-center gap-1 ${selectedServices.includes(service.title) ? 'bg-rcs-blue' : ''}`}
          >
            {selectedServices.includes(service.title) ? (
              <CheckSquare size={16} />
            ) : null}
            {service.title}
          </Button>
        ))}
      </div>
      
      {filteredServices.length > 0 ? (
        <div className={`overflow-x-auto ${isMobile ? 'pb-4' : ''}`}>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left font-bold text-rcs-blue border-b"></th>
                {filteredServices.map(service => (
                  <th key={service.title} className="p-3 text-left font-bold text-rcs-blue border-b min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <div className="text-rcs-blue">{service.icon}</div>
                      {service.title}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b font-semibold">Description</td>
                {filteredServices.map(service => (
                  <td key={service.title} className="p-3 border-b">{service.description}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border-b font-semibold">Features</td>
                {filteredServices.map(service => (
                  <td key={service.title} className="p-3 border-b">
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border-b font-semibold">Benefits</td>
                {filteredServices.map(service => (
                  <td key={service.title} className="p-3 border-b">
                    {service.benefits && (
                      <ul className="space-y-1">
                        {service.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3"></td>
                {filteredServices.map(service => (
                  <td key={service.title} className="p-3">
                    <Link
                      to="/contact"
                      className="inline-block bg-rcs-gold text-rcs-blue font-medium px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors duration-200 text-center text-sm"
                    >
                      Request Quote
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 border rounded-md bg-gray-50">
          <p className="text-gray-500">Select services to compare them</p>
        </div>
      )}
    </div>
  );
};

const RelatedServices = ({ currentCategory, services }: { currentCategory: string, services: ServiceProps[] }) => {
  const [selectedService, setSelectedService] = useState<ServiceProps | null>(null);
  
  const relatedServices = services
    .filter(service => service.category === currentCategory)
    .slice(0, 3);
    
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-xl font-bold text-rcs-blue mb-4">Related Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedServices.map((service, index) => (
          <div key={index} className="p-4 border rounded-md hover:shadow-md transition-all">
            <div className="flex items-center mb-2">
              <div className="bg-rcs-blue/10 p-2 rounded-full mr-3">
                <div className="text-rcs-blue">{service.icon}</div>
              </div>
              <h4 className="font-bold text-rcs-blue">{service.title}</h4>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
            <Button 
              variant="link" 
              size="sm" 
              className="text-rcs-blue p-0 flex items-center gap-1"
              onClick={() => setSelectedService(service)}
            >
              Learn more <ArrowRight size={14} />
            </Button>
          </div>
        ))}
      </div>
      
      {selectedService && (
        <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="text-rcs-blue">{selectedService.icon}</span>
                {selectedService.title}
              </DialogTitle>
              <DialogDescription>
                Comprehensive details about our {selectedService.title.toLowerCase()} services
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-gray-600">{selectedService.description}</p>
              
              <div>
                <h4 className="font-bold text-rcs-blue mb-2">Key Features</h4>
                <ul className="space-y-2 mb-4 pl-5">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-rcs-gold mr-2">•</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {selectedService.benefits && selectedService.benefits.length > 0 && (
                <div>
                  <h4 className="font-bold text-rcs-blue mb-2">Benefits</h4>
                  <ul className="space-y-2 mb-4 pl-5">
                    {selectedService.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="p-4 bg-gray-50 rounded-md">
                <h4 className="font-bold text-rcs-blue mb-2">Why Choose Us for {selectedService.title}</h4>
                <p className="text-gray-600">
                  Our team brings years of specialized experience in {selectedService.title.toLowerCase()}. 
                  We use industry-leading techniques and materials to ensure the highest quality results. 
                  Our clients consistently praise our attention to detail, communication, and ability to 
                  complete projects on time and within budget.
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Contact us for more information about our {selectedService.title.toLowerCase()} services.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setSelectedService(null)}>Close</Button>
                  <Link to="/contact">
                    <Button className="bg-rcs-blue hover:bg-blue-800">Request Quote</Button>
                  </Link>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const ServiceDetails = ({ service }: { service: ServiceProps }) => {
  return (
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <span className="text-rcs-blue">{service.icon}</span>
          {service.title}
        </DialogTitle>
        <DialogDescription>
          Comprehensive details about our {service.title.toLowerCase()} services
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <p className="text-gray-600">{service.description}</p>
        
        <div>
          <h4 className="font-bold text-rcs-blue mb-2">Key Features</h4>
          <ul className="space-y-2 mb-4 pl-5">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-rcs-gold mr-2">•</span>
                <span className="text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {service.benefits && service.benefits.length > 0 && (
          <div>
            <h4 className="font-bold text-rcs-blue mb-2">Benefits</h4>
            <ul className="space-y-2 mb-4 pl-5">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="p-4 bg-gray-50 rounded-md">
          <h4 className="font-bold text-rcs-blue mb-2">Why Choose Us for {service.title}</h4>
          <p className="text-gray-600">
            Our team brings years of specialized experience in {service.title.toLowerCase()}. 
            We use industry-leading techniques and materials to ensure the highest quality results. 
            Our clients consistently praise our attention to detail, communication, and ability to 
            complete projects on time and within budget.
          </p>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-gray-500">
            Contact us for more information about our {service.title.toLowerCase()} services.
          </p>
          <div className="flex gap-3">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Link to="/contact">
              <Button className="bg-rcs-blue hover:bg-blue-800">Request Quote</Button>
            </Link>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceProps | null>(null);
  const isMobile = useIsMobile();
  
  const serviceCategories = [
    { id: "all", name: "All Services" },
    { id: "commercial", name: "Commercial" },
    { id: "residential", name: "Residential" }, 
    { id: "specialized", name: "Specialized Services" },
    { id: "management", name: "Management & Planning" }
  ];

  const services: ServiceProps[] = [
    {
      icon: <Building size={24} />,
      title: "Commercial Construction",
      description: "Full-service commercial construction for retail spaces, offices, and industrial facilities.",
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
      icon: <Home size={24} />,
      title: "Residential Construction",
      description: "Quality home building services, from custom homes to multi-family residential projects.",
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
      icon: <PenTool size={24} />,
      title: "Renovation & Remodeling",
      description: "Transform your existing spaces with our expert renovation and remodeling services.",
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
      icon: <BarChart3 size={24} />,
      title: "Construction Management",
      description: "Professional management of your construction project from start to finish.",
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
      icon: <Building size={24} />,
      title: "House Construction",
      description: "Complete construction services for residential properties, including 2-storey houses in premium locations like South Forbes, Silang Cavite. We handle everything from foundation to finishing touches.",
      features: [
        "Custom house design and planning",
        "Quality materials and workmanship",
        "Strict adherence to building codes",
        "Timely project completion",
        "Regular progress updates"
      ],
      benefits: [
        "Expert project management",
        "Skilled workforce",
        "Modern construction techniques",
        "Comprehensive warranty",
        "After-construction support"
      ],
      category: "residential"
    },
    {
      icon: <Wrench size={24} />,
      title: "Carpentry",
      description: "Professional carpentry services for both structural and decorative elements, ensuring precision and durability in every project.",
      features: [
        "Custom furniture and cabinetry",
        "Wooden flooring installation",
        "Door and window framing",
        "Staircase construction",
        "Wooden decking and pergolas"
      ],
      benefits: [
        "High-quality materials",
        "Precision craftsmanship",
        "Custom designs",
        "Durable finishes",
        "Maintenance guidance"
      ],
      category: "specialized"
    },
    {
      icon: <HardHat size={24} />,
      title: "Masonry",
      description: "Expert masonry work for foundations, walls, and other structural elements using high-quality materials and proven techniques.",
      features: [
        "Concrete work and foundations",
        "Brick and block laying",
        "Stone masonry",
        "Retaining walls",
        "Concrete finishing"
      ],
      benefits: [
        "Structural integrity",
        "Weather resistance",
        "Long-lasting durability",
        "Professional finishing",
        "Code compliance"
      ],
      category: "commercial"
    },
    {
      icon: <Ruler size={24} />,
      title: "Steel Works",
      description: "Comprehensive steel fabrication and installation services for structural and architectural applications.",
      features: [
        "Structural steel framing",
        "Metal roofing",
        "Steel reinforcement",
        "Metal fabrication",
        "Steel finishing"
      ],
      benefits: [
        "High strength-to-weight ratio",
        "Durability and longevity",
        "Fire resistance",
        "Design flexibility",
        "Low maintenance"
      ],
      category: "commercial"
    },
    {
      icon: <Home size={24} />,
      title: "Renovation",
      description: "Transform your existing space with our professional renovation services, from minor updates to complete makeovers.",
      features: [
        "Interior remodeling",
        "Exterior upgrades",
        "Space optimization",
        "Modernization",
        "Structural improvements"
      ],
      benefits: [
        "Enhanced functionality",
        "Improved aesthetics",
        "Increased property value",
        "Energy efficiency",
        "Custom solutions"
      ],
      category: "specialized"
    },
    {
      icon: <PenTool size={24} />,
      title: "Painting",
      description: "Professional painting services for both interior and exterior surfaces, using high-quality paints and techniques.",
      features: [
        "Interior painting",
        "Exterior painting",
        "Surface preparation",
        "Color consultation",
        "Special finishes"
      ],
      benefits: [
        "Enhanced aesthetics",
        "Protection from elements",
        "Long-lasting finish",
        "Professional application",
        "Clean work environment"
      ],
      category: "specialized"
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Building Ventilation",
      description: "Expert installation and maintenance of ventilation systems to ensure optimal air quality and comfort.",
      features: [
        "Ventilation system design",
        "Installation and maintenance",
        "Air quality solutions",
        "Energy-efficient systems",
        "Regular maintenance"
      ],
      benefits: [
        "Improved air quality",
        "Energy efficiency",
        "Reduced humidity",
        "Better comfort",
        "Health benefits"
      ],
      category: "specialized"
    },
    {
      icon: <Wrench size={24} />,
      title: "Plumbing",
      description: "Comprehensive plumbing services for residential and commercial properties, ensuring reliable water supply and drainage systems.",
      features: [
        "Pipe installation and repair",
        "Fixture installation",
        "Water heater services",
        "Drain cleaning",
        "Emergency repairs"
      ],
      benefits: [
        "Reliable water supply",
        "Efficient drainage",
        "Water conservation",
        "Professional installation",
        "24/7 emergency service"
      ],
      category: "specialized"
    },
    {
      icon: <HardHat size={24} />,
      title: "Demolition",
      description: "Safe and efficient demolition services for structures of all sizes, with proper waste management and site preparation.",
      features: [
        "Structural demolition",
        "Interior demolition",
        "Debris removal",
        "Site preparation",
        "Safety compliance"
      ],
      benefits: [
        "Safe execution",
        "Efficient process",
        "Proper waste disposal",
        "Site preparation",
        "Minimal disruption"
      ],
      category: "specialized"
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Electrical Works",
      description: "Professional electrical installation and maintenance services, ensuring safe and efficient power distribution.",
      features: [
        "Wiring installation",
        "Panel upgrades",
        "Lighting installation",
        "Safety inspections",
        "Emergency repairs"
      ],
      benefits: [
        "Safe installation",
        "Energy efficiency",
        "Code compliance",
        "Reliable power supply",
        "Professional maintenance"
      ],
      category: "specialized"
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Air-Conditioning",
      description: "Expert installation and maintenance of air conditioning systems for optimal comfort and energy efficiency.",
      features: [
        "AC installation",
        "System maintenance",
        "Repair services",
        "Energy-efficient solutions",
        "Regular check-ups"
      ],
      benefits: [
        "Optimal comfort",
        "Energy savings",
        "Improved air quality",
        "Professional service",
        "Extended system life"
      ],
      category: "specialized"
    },
    {
      icon: <Building size={24} />,
      title: "Project Planning",
      description: "Comprehensive project planning services to ensure your construction project starts on the right foundation.",
      features: [
        "Site analysis and feasibility studies",
        "Budget planning and cost estimation",
        "Timeline development",
        "Resource allocation",
        "Risk assessment"
      ],
      benefits: [
        "Clear project roadmap",
        "Optimized resource utilization",
        "Early identification of potential issues",
        "Realistic budget expectations",
        "Better decision-making"
      ],
      category: "management"
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Quality Assurance",
      description: "Rigorous quality control and assurance services to maintain the highest standards throughout your construction project.",
      features: [
        "Materials testing and inspection",
        "Workmanship evaluation",
        "Code compliance verification",
        "Regular quality audits",
        "Documentation and reporting"
      ],
      benefits: [
        "Consistent quality standards",
        "Reduced rework and corrections",
        "Compliance with regulations",
        "Long-term durability",
        "Better return on investment"
      ],
      category: "management"
    }
  ];

  const filteredServices = services
    .filter(service => activeCategory === "all" || service.category === activeCategory)
    .filter(service => 
      searchQuery === "" || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Dialog>
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
          
          <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search services..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-3 top-3"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Tabs defaultValue="all" className="w-full" onValueChange={setActiveCategory}>
                <div className="overflow-x-auto pb-4 mb-4">
                  <TabsList className="flex w-full min-w-max bg-white p-1 rounded-lg shadow-sm">
                    {serviceCategories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className={cn(
                          "flex-grow data-[state=active]:bg-rcs-blue data-[state=active]:text-white",
                          "my-1 whitespace-nowrap px-4",
                          isMobile ? "text-sm" : ""
                        )}
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {filteredServices.length > 0 ? (
                  <div className="grid grid-cols-1 gap-8">
                    {filteredServices.map((service, index) => (
                      <ServiceCard
                        key={index}
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                        features={service.features}
                        benefits={service.benefits}
                        category={service.category}
                      />
                    ))}
                    {selectedService && <ServiceDetails service={selectedService} />}
                  </div>
                ) : (
                  <div className="text-center p-12 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600 mb-4">No services found matching your search criteria.</p>
                    <Button onClick={() => setSearchQuery("")} variant="outline">Clear Search</Button>
                  </div>
                )}
              </Tabs>
              
              {filteredServices.length > 0 && (
                <ServiceComparisonTable services={filteredServices} />
              )}
              
              {activeCategory !== "all" && filteredServices.length > 0 && (
                <RelatedServices currentCategory={activeCategory} services={services} />
              )}
            </div>
            
            <div className="lg:col-span-1 h-fit sticky top-24">
              <QuickServiceRequestForm />
            </div>
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
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
              <div className="w-16 h-16 bg-rcs-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-rcs-blue" size={28} />
              </div>
              <h3 className="text-xl font-bold text-rcs-blue mb-2">Planning & Design</h3>
              <p className="text-gray-600">We work closely with you to understand your vision, needs, and budget, developing comprehensive plans that will guide the entire construction process.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
              <div className="w-16 h-16 bg-rcs-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HardHat className="text-rcs-blue" size={28} />
              </div>
              <h3 className="text-xl font-bold text-rcs-blue mb-2">Construction</h3>
              <p className="text-gray-600">Our skilled team executes the project with precision, adhering to the highest standards of quality and safety while keeping you informed throughout the process.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
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
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-rcs-blue font-medium">
                  Do you offer warranties on your construction work?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes, we stand behind our work with comprehensive warranties. Typically, we offer a 1-year warranty on workmanship and materials, while many installed systems come with manufacturers' warranties of up to 10 years or more. We'll explain the specific warranty terms for your project before work begins.
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
    </Dialog>
  );
};

export default Services;
