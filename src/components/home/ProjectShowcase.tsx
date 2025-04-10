import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "south-forbes-villas",
    title: "South Forbes Villas",
    category: "Renovation",
    image: "/images/projects/renovation/southforbes/1.jpg"
  },
  {
    id: "jezelle-fashion",
    title: "Jezelle HauteAmorado Fashion Boutique",
    category: "Commercial",
    image: "/images/projects/commercial/jezelle_fashion/4.jpg"
  },
  {
    id: "racha-project",
    title: "The Racha Project",
    category: "Residential",
    image: "/images/projects/residential/racha_project/1.jpg"
  },
  {
    id: "cassasis-residential",
    title: "Cassasis Residential Building",
    category: "Residential",
    image: "/images/projects/residential/cassasis_residential/main.jpg"
  },
  {
    id: "ayala-alabang",
    title: "Ayala Alabang 2-Storey Residential Build",
    category: "Residential",
    image: "/images/projects/residential/ayala/a.jpg"
  },
];

interface ProjectCardProps {
  project: Project;
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Validate image path to prevent malicious URLs
  const validateImagePath = (path: string): string => {
    // Only allow local images from the /images directory
    if (path.startsWith('/images/') && !path.includes('..')) {
      return path;
    }
    // Return a default image if validation fails
    return '/images/fallback-image.svg';
  };

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

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="group relative rounded-lg overflow-hidden shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={imageError ? '/images/fallback-image.svg' : validateImagePath(project.image)} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      
      <div className="absolute top-4 left-4">
        <Badge className="bg-rcs-gold/90 text-rcs-blue font-medium">
          {project.category}
        </Badge>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6">
        <div className="text-center">
          <h3 className="text-white text-xl font-bold mb-3">{project.title}</h3>
          <Link
            to={`/projects#${project.id}`}
            className="inline-flex items-center bg-white/90 text-rcs-blue px-4 py-2 rounded-md hover:bg-white transition-colors duration-200"
          >
            View Details <ExternalLink size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectShowcase = () => {
  // Validate image path to prevent malicious URLs
  const validateImagePath = (path: string): string => {
    // Only allow local images from the /images directory
    if (path.startsWith('/images/') && !path.includes('..')) {
      return path;
    }
    // Return a default image if validation fails
    return '/images/fallback-image.svg';
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/fallback-image.svg';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-rcs-blue mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through some of our most notable projects that demonstrate our expertise and commitment to excellence.
          </p>
        </div>

        <div className="hidden lg:block">
          <Carousel className="w-full">
            <CarouselContent>
              {[...Array(Math.ceil(projects.length / 3))].map((_, slideIndex) => (
                <CarouselItem key={slideIndex} className="basis-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-1">
                    {projects.slice(slideIndex * 3, slideIndex * 3 + 3).map((project) => (
                      <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img 
                            src={validateImagePath(project.image)} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={handleImageError}
                            loading="lazy"
                          />
                        </div>
                        
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-rcs-gold/90 text-rcs-blue font-medium">
                            {project.category}
                          </Badge>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6">
                          <div className="text-center">
                            <h3 className="text-white text-xl font-bold mb-3">{project.title}</h3>
                            <Link
                              to={`/projects#${project.id}`}
                              className="inline-flex items-center bg-white/90 text-rcs-blue px-4 py-2 rounded-md hover:bg-white transition-colors duration-200"
                            >
                              View Details <ExternalLink size={16} className="ml-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static translate-y-0 left-0 h-10 w-10" />
              <CarouselNext className="static translate-y-0 right-0 h-10 w-10" />
            </div>
          </Carousel>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6">
          {projects.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.id} project={project} delay={index * 100} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="bg-rcs-blue text-white font-montserrat font-semibold px-8 py-3 rounded-md hover:bg-blue-900 transition-colors duration-300 inline-flex items-center justify-center group"
          >
            View All Projects <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
