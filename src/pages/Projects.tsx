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
    id: "project-1",
    title: "Modern Office Building",
    category: "Commercial",
    location: "Downtown Business District, CA",
    completionDate: "June 2022",
    description: "A state-of-the-art 12-story office building featuring energy-efficient design, collaborative workspaces, and a stunning glass facade. This project was completed on time and within budget, meeting all sustainability requirements.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"],
    features: [
      { title: "Energy Efficiency", description: "LEED Gold certified with advanced energy management systems" },
      { title: "Smart Building Technology", description: "Integrated IoT sensors for climate and usage optimization" },
      { title: "Sustainable Materials", description: "Over 60% recycled or locally sourced building materials" }
    ],
    client: "TechCorp Innovations",
    highlights: ["Completed 2 months ahead of schedule", "Zero safety incidents", "14% under budget"],
    tags: ["Office", "Glass Facade", "LEED Certified", "Smart Building"]
  }, {
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
    id: "project-3",
    title: "Shopping Mall Renovation",
    category: "Renovation",
    location: "Central Mall, CA",
    completionDate: "January 2023",
    description: "Complete renovation of a 25-year-old shopping mall, including modernization of interiors, expansion of retail spaces, and implementation of energy-efficient systems. The project was completed while maintaining partial operation of the facility.",
    image: "https://images.unsplash.com/photo-1555443805-658637491dd4?auto=format&fit=crop&w=800&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1610904303847-701fec48d80b?auto=format&fit=crop&w=800&q=80"]
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
    id: "project-5",
    title: "Corporate Headquarters",
    category: "Commercial",
    location: "Tech Valley, CA",
    completionDate: "November 2022",
    description: "A modern corporate headquarters for a leading tech company, featuring innovative design, collaborative spaces, and cutting-edge technology integration. This project showcases our ability to create inspiring work environments.",
    image: "https://images.unsplash.com/photo-1545079968-1feb95494244?auto=format&fit=crop&w=800&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&w=800&q=80"]
  }, {
    id: "project-6",
    title: "Luxury Villa",
    category: "Residential",
    location: "Hillside Estates, CA",
    completionDate: "July 2021",
    description: "A custom-designed luxury villa featuring high-end finishes, smart home integration, infinity pool, and panoramic views. This project highlights our expertise in luxury residential construction.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    galleryImages: ["https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80"]
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
            <h1 className="text-5xl text-white mb-6 shadow-text md:text-5xl font-bold">Our Projects</h1>
            <p className="text-xl text-white/90 shadow-text md:text-xl font-normal">
              Explore our portfolio of successful construction projects that demonstrate our expertise and commitment to excellence.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Button 
                  key={category} 
                  onClick={() => setSelectedCategory(category)} 
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`px-5 py-6 rounded-md transition-all duration-300 font-bold text-lg ${
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

          <div className="space-y-12 mt-8">
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
                    
                    <CardContent className="p-6 lg:p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-rcs-blue mb-3">{project.title}</h3>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1 text-rcs-gold" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center">
                            <CalendarDays size={16} className="mr-1 text-rcs-gold" />
                            <span>Completed: {project.completionDate}</span>
                          </div>
                          {project.client && (
                            <div className="flex items-center">
                              <Award size={16} className="mr-1 text-rcs-gold" />
                              <span>Client: {project.client}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-gray-700 mb-6">
                          {expandedProject === project.id ? project.description : `${project.description.substring(0, 150)}${project.description.length > 150 ? '...' : ''}`}
                        </p>
                        
                        {project.tags && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                                <Tag size={12} className="mr-1" />
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
                            <TabsList className="grid w-full grid-cols-3 mb-8">
                              <TabsTrigger value="gallery" className="text-lg">Project Gallery</TabsTrigger>
                              <TabsTrigger value="details" className="text-lg">Project Details</TabsTrigger>
                              <TabsTrigger value="features" className="text-lg">Features & Highlights</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="gallery" className="mt-0">
                              <ProjectGallery 
                                images={[project.image, ...project.galleryImages]} 
                                title={project.title} 
                              />
                            </TabsContent>
                            
                            <TabsContent value="details" className="mt-0">
                              <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
                                <h4 className="text-xl font-bold text-rcs-blue mb-4">About This Project</h4>
                                <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                                  <div className="bg-white rounded-lg p-5 shadow-sm">
                                    <h5 className="font-bold text-lg mb-3 text-rcs-blue">Project Information</h5>
                                    <ul className="space-y-3">
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
                                    <div className="bg-white rounded-lg p-5 shadow-sm">
                                      <h5 className="font-bold text-lg mb-3 text-rcs-blue">Project Tags</h5>
                                      <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag, index) => (
                                          <Badge key={index} className="bg-gray-100 text-gray-700 hover:bg-gray-200">
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
                                  <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
                                    <h4 className="text-xl font-bold text-rcs-blue mb-4">Key Features</h4>
                                    <ul className="space-y-4">
                                      {project.features.map((feature, index) => (
                                        <li key={index} className="bg-white rounded-md p-4 shadow-sm">
                                          <h5 className="font-bold text-rcs-blue">{feature.title}</h5>
                                          <p className="text-gray-700">{feature.description}</p>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                {project.highlights && (
                                  <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
                                    <h4 className="text-xl font-bold text-rcs-blue mb-4">Project Highlights</h4>
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
