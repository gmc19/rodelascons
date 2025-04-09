import React, { useEffect, useState } from 'react';
import { CalendarDays, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  completionDate: string;
  description: string;
  image: string;
  galleryImages: string[];
}
const projects: Project[] = [{
  id: "project-1",
  title: "Modern Office Building",
  category: "Commercial",
  location: "Downtown Business District, CA",
  completionDate: "June 2022",
  description: "A state-of-the-art 12-story office building featuring energy-efficient design, collaborative workspaces, and a stunning glass facade. This project was completed on time and within budget, meeting all sustainability requirements.",
  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
  galleryImages: ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"]
}, {
  id: "project-2",
  title: "Luxury Residential Complex",
  category: "Residential",
  location: "Oceanview Heights, CA",
  completionDate: "September 2021",
  description: "A luxury residential complex comprising 50 high-end apartments, featuring amenities such as a swimming pool, fitness center, and rooftop garden. This project showcases our commitment to quality and attention to detail.",
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  galleryImages: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"]
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
}];
const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
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
      // Remove hash from URL
      window.history.pushState(null, '', window.location.pathname);
    } else {
      setExpandedProject(projectId);
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

      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-5 py-3 rounded-md transition-colors duration-200 font-bold text-lg ${selectedCategory === category ? 'bg-rcs-blue text-white shadow-md' : 'bg-white text-rcs-blue hover:bg-gray-100 border border-gray-200'}`}>
                  {category}
                </button>)}
            </div>
          </div>

          <div className="space-y-12 mt-8">
            {filteredProjects.map(project => <Card key={project.id} id={project.id} className="bg-white rounded-lg overflow-hidden shadow-lg border-0 transition-all duration-300 hover:shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative h-[300px] lg:h-auto">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-rcs-gold text-rcs-blue text-sm font-bold px-3 py-1 rounded-full">
                        {project.category}
                      </span>
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
                      </div>
                      
                      <p className="text-gray-700 mb-6">
                        {expandedProject === project.id ? project.description : `${project.description.substring(0, 150)}...`}
                      </p>
                    </div>
                    
                    <button onClick={() => toggleProject(project.id)} className="text-rcs-blue bg-rcs-gold/20 border border-rcs-gold px-5 py-2 rounded-md hover:bg-rcs-gold hover:text-rcs-blue transition-colors duration-300 font-semibold inline-flex items-center justify-center w-full md:w-auto">
                      {expandedProject === project.id ? <>View Less <ArrowLeft size={18} className="ml-2" /></> : <>View Details <ArrowRight size={18} className="ml-2" /></>}
                    </button>
                  </CardContent>
                </div>
                
                {expandedProject === project.id && <div className="p-6 pt-0 lg:p-8 lg:pt-0 animate-fade-in">
                    <hr className="my-6 border-gray-200" />
                    
                    <h4 className="text-xl font-bold text-rcs-blue mb-4">Project Gallery</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {project.galleryImages.map((image, index) => <div key={index} className="overflow-hidden rounded-lg shadow-md">
                          <img src={image} alt={`${project.title} gallery image ${index + 1}`} className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110" />
                        </div>)}
                    </div>
                    
                    <h4 className="text-xl font-bold text-rcs-blue mb-4">Project Details</h4>
                    <p className="text-gray-700 mb-6">{project.description}</p>
                    
                    <div className="flex justify-center">
                      <button onClick={() => toggleProject(project.id)} className="text-rcs-blue bg-rcs-gold px-6 py-3 rounded-md hover:bg-yellow-400 transition-colors duration-300 font-semibold inline-flex items-center">
                        Close Details <ArrowLeft size={18} className="ml-2" />
                      </button>
                    </div>
                  </div>}
              </Card>)}
          </div>
        </div>
      </div>
    </>
  );
};
export default Projects;