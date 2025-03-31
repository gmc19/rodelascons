
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { ExternalLink, CalendarDays, MapPin } from 'lucide-react';

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

const projects: Project[] = [
  {
    id: "project-1",
    title: "Modern Office Building",
    category: "Commercial",
    location: "Downtown Business District, CA",
    completionDate: "June 2022",
    description: "A state-of-the-art 12-story office building featuring energy-efficient design, collaborative workspaces, and a stunning glass facade. This project was completed on time and within budget, meeting all sustainability requirements.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "project-2",
    title: "Luxury Residential Complex",
    category: "Residential",
    location: "Oceanview Heights, CA",
    completionDate: "September 2021",
    description: "A luxury residential complex comprising 50 high-end apartments, featuring amenities such as a swimming pool, fitness center, and rooftop garden. This project showcases our commitment to quality and attention to detail.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "project-3",
    title: "Shopping Mall Renovation",
    category: "Renovation",
    location: "Central Mall, CA",
    completionDate: "January 2023",
    description: "Complete renovation of a 25-year-old shopping mall, including modernization of interiors, expansion of retail spaces, and implementation of energy-efficient systems. The project was completed while maintaining partial operation of the facility.",
    image: "https://images.unsplash.com/photo-1555443805-658637491dd4?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610904303847-701fec48d80b?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "project-4",
    title: "Industrial Warehouse",
    category: "Industrial",
    location: "Manufacturing District, CA",
    completionDate: "March 2022",
    description: "A 100,000 square foot industrial warehouse with advanced logistics systems, sustainable materials, and energy-efficient design. This project demonstrates our capabilities in large-scale industrial construction.",
    image: "https://images.unsplash.com/photo-1616832880334-b1904551ccdd?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598257006463-7c64a5bb0928?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "project-5",
    title: "Corporate Headquarters",
    category: "Commercial",
    location: "Tech Valley, CA",
    completionDate: "November 2022",
    description: "A modern corporate headquarters for a leading tech company, featuring innovative design, collaborative spaces, and cutting-edge technology integration. This project showcases our ability to create inspiring work environments.",
    image: "https://images.unsplash.com/photo-1545079968-1feb95494244?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "project-6",
    title: "Luxury Villa",
    category: "Residential",
    location: "Hillside Estates, CA",
    completionDate: "July 2021",
    description: "A custom-designed luxury villa featuring high-end finishes, smart home integration, infinity pool, and panoramic views. This project highlights our expertise in luxury residential construction.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const categories = ["All", ...Array.from(new Set(projects.map(project => project.category)))];

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if there's a hash in the URL to open a specific project
    const hash = window.location.hash.substring(1);
    if (hash) {
      const project = projects.find(p => p.id === hash);
      if (project) {
        setSelectedProject(project);
        setIsModalOpen(true);
      }
    }
  }, []);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    // Update URL hash without scrolling
    window.history.pushState(null, '', `#${project.id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    // Remove hash from URL
    window.history.pushState(null, '', window.location.pathname);
  };

  // Listen for back/forward navigation to handle modal state
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.substring(1);
      if (!hash) {
        setIsModalOpen(false);
        setSelectedProject(null);
      } else {
        const project = projects.find(p => p.id === hash);
        if (project) {
          setSelectedProject(project);
          setIsModalOpen(true);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Layout>
      <div className="pt-24 pb-20 bg-rcs-blue/90">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Projects</h1>
            <p className="text-xl text-white/80">
              Explore our portfolio of successful construction projects that demonstrate our expertise and commitment to excellence.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-rcs-blue text-white'
                      : 'bg-white text-rcs-blue hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={project.id}
                className="project-card bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => openProject(project)}
              >
                <div className="relative h-64">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="project-overlay absolute inset-0 bg-rcs-blue/70 flex items-center justify-center">
                    <div className="text-center p-4">
                      <span className="text-rcs-gold text-sm font-medium">{project.category}</span>
                      <h3 className="text-white text-xl font-bold mt-1">{project.title}</h3>
                      <button
                        className="mt-4 inline-flex items-center text-white bg-rcs-gold/20 backdrop-blur-sm px-4 py-2 rounded-md hover:bg-rcs-gold/40 transition-colors duration-200"
                      >
                        View Details <ExternalLink size={16} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-rcs-blue mb-2">{project.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{project.description}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <MapPin size={16} className="mr-1" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={closeModal}></div>
          <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white rounded-full p-1 text-gray-500 hover:text-gray-800 focus:outline-none z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="p-6">
              <div className="mb-6">
                <span className="inline-block bg-rcs-blue text-white text-sm px-3 py-1 rounded-md mb-2">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-rcs-blue">{selectedProject.title}</h2>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays size={16} className="mr-1" />
                    <span>Completed: {selectedProject.completionDate}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-rcs-blue mb-2">Project Description</h3>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-rcs-blue mb-4">Project Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedProject.galleryImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedProject.title} gallery image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Projects;
