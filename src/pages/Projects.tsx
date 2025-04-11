import React, { useEffect, useState, useRef } from 'react';
import { CalendarDays, MapPin, ArrowLeft, ArrowRight, Tag, CircleDot, ExternalLink, Award, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ProjectGallery from '../components/projects/ProjectGallery';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectFeature {
  title: string;
  description: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  completionDate: string;
  description: string;
  image: string;
  galleryImages: string[];
  features?: ProjectFeature[];
  client?: string;
  highlights?: string[];
  tags?: string[];
}

const projects: Project[] = [
  {
    id: "jezelle-fashion",
    title: "Jezelle HauteAmorado Fashion Boutique",
    category: "Commercial",
    location: "Chino Roces, Makati",
    completionDate: "2024",
    description: "We proudly present the successful completion of the Jezelle HauteAmorado Fashion Boutique, located at Chino Roces, Makati. This project involved a full commercial interior fit-out tailored to the brand identity and functionality of a fashion design business. With a clean glass façade, modern branding integration, and strategic layout design, the boutique was designed to elevate the client's professional presence while providing a functional workspace for creative expression.",
    image: "/images/projects/commercial/jezelle_fashion/4.jpg",
    galleryImages: [
      "/images/projects/commercial/jezelle_fashion/2.jpg",
      "/images/projects/commercial/jezelle_fashion/3.jpg",
      "/images/projects/commercial/jezelle_fashion/4.jpg",
      "/images/projects/commercial/jezelle_fashion/5.jpg",
      "/images/projects/commercial/jezelle_fashion/6.jpg",
      "/images/projects/commercial/jezelle_fashion/7.jpg"
    ],
    features: [
      { title: "Commercial Interior Design", description: "Full commercial space interior design and build implementation" },
      { title: "Glass Installation", description: "Glass partition installation with custom branding decals" },
      { title: "Structural Work", description: "Professional structural framing and finishing" },
      { title: "Custom Fixtures", description: "Custom lighting and flooring adjustments for optimal retail environment" },
      { title: "Display Setup", description: "Boutique display-ready preparation for immediate business use" }
    ],
    client: "Jezelle HauteAmorado",
    highlights: [
      "Modern glass façade design",
      "Brand-integrated interior layout",
      "Functional retail workspace",
      "Professional business environment"
    ],
    tags: ["Commercial", "Interior Fit-Out", "Retail Space", "Boutique"]
  },
  {
    id: "racha-project",
    title: "The Racha Project",
    category: "Residential",
    location: "Silang, Cavite",
    completionDate: "2024",
    description: "At Rodelas Construction Services, we turn your vision into reality. The Racha Project is one of our most refined residential builds — combining modern elegance with functionality. Every detail, from the structure to the finishes, was thoughtfully designed and constructed to reflect the lifestyle and comfort of its future homeowners.",
    image: "/images/projects/residential/racha_project/1.jpg",
    galleryImages: [
      "/images/projects/residential/racha_project/2.jpg",
      "/images/projects/residential/racha_project/3.jpg",
      "/images/projects/residential/racha_project/4.jpg",
      "/images/projects/residential/racha_project/5.jpg",
      "/images/projects/residential/racha_project/6.jpg",
      "/images/projects/residential/racha_project/7.jpg",
      "/images/projects/residential/racha_project/8.jpg",
      "/images/projects/residential/racha_project/9.jpg",
      "/images/projects/residential/racha_project/10.jpg",
      "/images/projects/residential/racha_project/11.jpg",
      "/images/projects/residential/racha_project/12.jpg",
      "/images/projects/residential/racha_project/13.jpg",
      "/images/projects/residential/racha_project/14.jpg",
      "/images/projects/residential/racha_project/15.jpg",
      "/images/projects/residential/racha_project/16.jpg",
      "/images/projects/residential/racha_project/17.jpg",
      "/images/projects/residential/racha_project/18.jpg"
    ],
    features: [
      { title: "Full Residential Construction", description: "Complete turnkey construction from foundation to finishing" },
      { title: "Architectural Design", description: "Custom architectural and structural design implementation" },
      { title: "Systems Integration", description: "Comprehensive electrical and plumbing systems installation" },
      { title: "Premium Finishes", description: "High-quality interior and exterior finishing touches" }
    ],
    client: "Racha Family",
    highlights: ["Modern elegant design", "Functional living spaces", "Premium quality finishes"],
    tags: ["Residential", "Custom Home", "Modern Design", "Luxury Finishes"]
  },
  {
    id: "project-2",
    title: "Cassasis Residential Building",
    category: "Residential",
    location: "Chateux de Paris, Silang, Cavite",
    completionDate: "2024",
    description: "From Blueprints to Reality: Our Cassasis Residential Building at Chateux de Paris, Silang, Cavite is finished. Our sincere gratitude for Cassasis Family for trusting the ability and craftmanship of Rodelas Construction Services, where form meets function in a masterpiece built to endure. Glory to God!",
    image: "/images/projects/residential/cassasis_residential/main.jpg",
    galleryImages: [
      "/images/projects/residential/cassasis_residential/gallery1.jpg",
      "/images/projects/residential/cassasis_residential/gallery2.jpg",
      "/images/projects/residential/cassasis_residential/gallery3.jpg"
    ],
    features: [
      { title: "Custom Finishes", description: "Premium materials and craftsmanship throughout" },
      { title: "Architectural Excellence", description: "Unique design that balances aesthetics and functionality" },
      { title: "Energy Efficiency", description: "Smart home features for optimal energy consumption" }
    ],
    client: "Cassasis Family",
    highlights: ["Turnkey project delivery", "Custom design elements", "Satisfied homeowner testimonial"],
    tags: ["Residential", "Custom Home", "Luxury Finishes", "Modern Design"]
  }, {
    
    id: "project-4",
    title: "Industrial Warehouse",
    category: "Industrial",
    location: "Manufacturing District, CA",
    completionDate: "March 2022",
    description: "A 100,000 square foot industrial warehouse with advanced logistics systems, sustainable materials, and energy-efficient design. This project demonstrates our capabilities in large-scale industrial construction.",
    image: "https://images.unsplash.com/photo-1616832880334-b1904551ccdd?auto=format&fit=crop&w=800&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1598257006463-7c64a5bb0928?auto=format&fit=crop&w=800&q=80"]
  }, {
    id: "ayala-alabang-residential",
    title: "Ayala Alabang – 2-Storey Residential Build",
    category: "Residential",
    location: "Ayala Alabang",
    completionDate: "2021",
    description: "We're proud to share the completion of a two-storey residential building located in the prestigious Ayala, Alabang area. This project combined elegant design with functionality, featuring high-end finishes and modern interiors that reflect the client's refined taste.",
    image: "/images/projects/residential/ayala/a.jpg",
    galleryImages: [
      "/images/projects/residential/ayala/b.jpg",
      "/images/projects/residential/ayala/c.jpg",
      "/images/projects/residential/ayala/d.jpg",
      "/images/projects/residential/ayala/e.jpg",
      "/images/projects/residential/ayala/f.jpg",
      "/images/projects/residential/ayala/g.jpg",
      "/images/projects/residential/ayala/h.jpg",
      "/images/projects/residential/ayala/i.jpg",
      "/images/projects/residential/ayala/j.jpg"
    ],
    features: [
      { title: "Full Construction", description: "Full construction and finishing of a 2-storey residence" },
      { title: "Custom Cabinetry", description: "Custom cabinetry and lighting throughout the home" },
      { title: "Modern Installations", description: "Modern kitchen and bathroom installations" },
      { title: "Ceiling Treatments", description: "Elegant ceiling treatments and lighting fixtures" },
      { title: "Turnkey Completion", description: "Turnover-ready completion with attention to detail" }
    ],
    highlights: [
      "Luxurious and livable home design",
      "High-end finishes and materials",
      "Architectural excellence",
      "Interior styling and detailing"
    ],
    tags: ["Residential", "High-End Residential", "New Build", "Luxury Home"]
  }, {

    id: "south-forbes-villas",
    title: "South Forbes Villas",
    category: "Renovation",
    location: "South Forbes Villas",
    completionDate: "2024",
    description: "We've successfully completed a full residential renovation and repaint project in the elegant community of South Forbes Villas. This project focused on refreshing the exterior and interior of the home, giving it a clean, modern, and revitalized look while maintaining its classic architectural character. Careful attention was given to surface preparation, paint application, and detail finishing to ensure high-quality results and long-term durability.",
    image: "/images/projects/renovation/southforbes/1.jpg",
    galleryImages: [
      "/images/projects/renovation/southforbes/2.jpg",
      "/images/projects/renovation/southforbes/3.jpg",
      "/images/projects/renovation/southforbes/4.jpg",
      "/images/projects/renovation/southforbes/5.jpg",
      "/images/projects/renovation/southforbes/6.jpg",
      "/images/projects/renovation/southforbes/7.jpg",
      "/images/projects/renovation/southforbes/8.jpg"
    ],
    features: [
      { title: "Complete Repainting", description: "Full interior and exterior repainting service" },
      { title: "Surface Restoration", description: "Thorough surface preparation and repair work" },
      { title: "Detail Finishing", description: "Meticulous work on trims and moldings" },
      { title: "Interior Enhancement", description: "Comprehensive ceiling and wall touch-ups" },
      { title: "General Refurbishment", description: "Overall interior improvement and renovation" }
    ],
    client: "South Forbes Villas Residence",
    highlights: [
      "Modern and revitalized look",
      "High-quality paint application",
      "Long-term durability focus",
      "Classic character preservation"
    ],
    tags: ["Renovation", "Residential", "Home Improvement", "Repainting"]
  }
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [activeSectionTab, setActiveSectionTab] = useState("gallery");
  const projectRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  const categories = ["All", ...Array.from(new Set(projects.map(project => project.category)))];
  const filteredProjects = selectedCategory === "All" ? projects : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Check if there's a hash in the URL to expand a specific project
    const hash = window.location.hash.substring(1);
    if (hash) {
      setExpandedProject(hash);
      // Scroll to the project after a short delay to allow rendering
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    }
  }, []);

  const toggleProject = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
      setActiveSectionTab("gallery"); // Reset to gallery tab when closing
      // Remove hash from URL
      window.history.pushState(null, '', window.location.pathname);
    } else {
      setExpandedProject(projectId);
      setActiveSectionTab("gallery"); // Reset to gallery tab when opening
      // Update URL hash without scrolling
      window.history.pushState(null, '', `#${projectId}`);
      // Scroll to the project
      setTimeout(() => {
        const element = document.getElementById(projectId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    }
  };

  // Listen for back/forward navigation to handle expanded state
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setExpandedProject(hash);
      } else {
        setExpandedProject(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      <div className="pt-24 pb-20 bg-gradient-to-r from-rcs-blue to-rcs-blue/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl text-white mb-4 md:mb-6 shadow-text font-bold">Our Projects</h1>
            <p className="text-base md:text-xl text-white/90 shadow-text font-normal">
              Explore our portfolio of successful construction projects that demonstrate our expertise and commitment to excellence.
            </p>
          </div>
        </div>
      </div>

      <div className="py-8 md:py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Button 
                  key={category} 
                  onClick={() => setSelectedCategory(category)} 
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`px-3 md:px-5 py-4 md:py-6 rounded-md transition-all duration-300 font-bold text-sm md:text-lg ${
                    selectedCategory === category 
                      ? 'bg-rcs-blue text-white shadow-md scale-105' 
                      : 'bg-white text-rcs-blue hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-8 md:space-y-12 mt-6 md:mt-8">
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                id={project.id}
                ref={el => projectRefs.current[project.id] = el}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white rounded-lg overflow-hidden shadow-lg border-0 transition-all duration-300 hover:shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="relative h-[300px] lg:h-auto overflow-hidden group">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-rcs-gold text-rcs-blue text-sm font-bold px-3 py-1">
                          {project.category}
                        </Badge>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-6 w-full">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleProject(project.id);
                            }} 
                            className="bg-white/90 hover:bg-white text-rcs-blue font-medium rounded-md px-4 py-2 transition-colors duration-200 inline-flex items-center"
                          >
                            <ExternalLink size={16} className="mr-2" /> View Project Details
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 md:p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl md:text-3xl font-bold text-rcs-blue mb-2 md:mb-3">{project.title}</h3>
                        
                        <div className="flex flex-wrap gap-3 text-xs md:text-sm text-gray-500 mb-3 md:mb-4">
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1 text-rcs-gold" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center">
                            <CalendarDays size={14} className="mr-1 text-rcs-gold" />
                            <span>Completed: {project.completionDate}</span>
                          </div>
                          {project.client && (
                            <div className="flex items-center">
                              <Award size={14} className="mr-1 text-rcs-gold" />
                              <span>Client: {project.client}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
                          {expandedProject === project.id ? project.description : `${project.description.substring(0, 150)}${project.description.length > 150 ? '...' : ''}`}
                        </p>
                        
                        {project.tags && (
                          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                            {project.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs md:text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">
                                <Tag size={10} className="mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        onClick={() => toggleProject(project.id)} 
                        variant="outline"
                        className="text-rcs-blue border border-rcs-gold/80 hover:bg-rcs-gold hover:text-rcs-blue transition-all duration-300 font-semibold group w-full md:w-auto"
                      >
                        {expandedProject === project.id ? (
                          <>View Less <ArrowLeft size={18} className="ml-2 transition-transform group-hover:-translate-x-1" /></>
                        ) : (
                          <>View Details <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" /></>
                        )}
                      </Button>
                    </CardContent>
                  </div>
                  
                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 lg:p-8 lg:pt-0">
                          <hr className="my-6 border-gray-200" />
                          
                          <Tabs value={activeSectionTab} onValueChange={setActiveSectionTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8">
                              <TabsTrigger value="gallery" className="text-sm md:text-lg">Gallery</TabsTrigger>
                              <TabsTrigger value="details" className="text-sm md:text-lg">Details</TabsTrigger>
                                <TabsTrigger value="features" className="text-sm md:text-lg">Features</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="gallery" className="mt-0">
                              <ProjectGallery 
                                images={[project.image, ...project.galleryImages]} 
                                title={project.title} 
                              />
                            </TabsContent>
                            
                            <TabsContent value="details" className="mt-0">
                              <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-inner">
                                <h4 className="text-lg md:text-xl font-bold text-rcs-blue mb-3 md:mb-4">About This Project</h4>
                                <p className="text-sm md:text-base text-gray-700 whitespace-pre-line">{project.description}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
                                  <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm">
                                    <h5 className="font-bold text-base md:text-lg mb-3 text-rcs-blue">Project Information</h5>
                                    <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                                      <li className="flex items-center">
                                        <CircleDot size={16} className="text-rcs-gold mr-2" />
                                        <span className="font-semibold">Category:</span>
                                        <span className="ml-2">{project.category}</span>
                                      </li>
                                      <li className="flex items-center">
                                        <CircleDot size={16} className="text-rcs-gold mr-2" />
                                        <span className="font-semibold">Location:</span>
                                        <span className="ml-2">{project.location}</span>
                                      </li>
                                      <li className="flex items-center">
                                        <CircleDot size={16} className="text-rcs-gold mr-2" />
                                        <span className="font-semibold">Completion:</span>
                                        <span className="ml-2">{project.completionDate}</span>
                                      </li>
                                      {project.client && (
                                        <li className="flex items-center">
                                          <CircleDot size={16} className="text-rcs-gold mr-2" />
                                          <span className="font-semibold">Client:</span>
                                          <span className="ml-2">{project.client}</span>
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                  
                                  {project.tags && (
                                    <div className="bg-white rounded-lg p-4 md:p-5 shadow-sm">
                                      <h5 className="font-bold text-base md:text-lg mb-3 text-rcs-blue">Project Tags</h5>
                                      <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, index) => (
                                          <Badge key={index} className="text-xs md:text-sm bg-gray-100 text-gray-700 hover:bg-gray-200">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="features" className="mt-0">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {project.features && (
                                  <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-inner">
                                    <h4 className="text-lg md:text-xl font-bold text-rcs-blue mb-3 md:mb-4">Key Features</h4>
                                    <ul className="space-y-3 md:space-y-4">
                                      {project.features.map((feature, index) => (
                                        <li key={index} className="bg-white rounded-md p-3 md:p-4 shadow-sm">
                                          <h5 className="font-bold text-base md:text-lg text-rcs-blue mb-1">{feature.title}</h5>
                                          <p className="text-sm md:text-base text-gray-700">{feature.description}</p>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                {project.highlights && (
                                  <div className="bg-gray-50 rounded-lg p-4 md:p-6 shadow-inner">
                                    <h4 className="text-lg md:text-xl font-bold text-rcs-blue mb-3 md:mb-4">Project Highlights</h4>
                                    <ul className="space-y-2">
                                      {project.highlights.map((highlight, index) => (
                                        <li key={index} className="flex items-start">
                                          <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                          <span>{highlight}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </TabsContent>
                          </Tabs>
                          
                          <div className="flex justify-center mt-8">
                            <Button 
                              onClick={() => toggleProject(project.id)} 
                              className="bg-rcs-gold text-rcs-blue hover:bg-yellow-400 transition-colors duration-300 font-semibold"
                            >
                              Close Details <ArrowLeft size={18} className="ml-2" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
