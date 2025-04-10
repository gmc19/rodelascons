
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "project-1",
    title: "Modern Office Building",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-2",
    title: "Cassasis Residential Building",
    category: "Residential",
    image: "/images/projects/residential/cassasis_residential/main.jpg"
  },
  {
    id: "project-3",
    title: "Shopping Mall Renovation",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1555443805-658637491dd4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-4",
    title: "Industrial Warehouse",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1616832880334-b1904551ccdd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-5",
    title: "Corporate Headquarters",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1545079968-1feb95494244?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "project-6",
    title: "Luxury Villa",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
  }
];

interface ProjectCardProps {
  project: Project;
  delay: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
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
    <div
      ref={cardRef}
      className={`project-card relative rounded-lg overflow-hidden shadow-lg transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-64 object-cover"
      />
      <div className="project-overlay absolute inset-0 bg-rcs-blue/70 opacity-0 group-hover:opacity-100 flex items-center justify-center">
        <div className="text-center p-4">
          <span className="text-rcs-gold text-sm font-medium">{project.category}</span>
          <h3 className="text-white text-xl font-bold mt-1">{project.title}</h3>
          <Link
            to={`/projects#${project.id}`}
            className="mt-4 inline-flex items-center text-white bg-rcs-gold/20 backdrop-blur-sm px-4 py-2 rounded-md hover:bg-rcs-gold/40 transition-colors duration-200"
          >
            View Project <ExternalLink size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProjectShowcase = () => {
  return (
    <section className="py-20 bg-rcs-blue/5">
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
                    {projects.slice(slideIndex * 3, slideIndex * 3 + 3).map((project, index) => (
                      <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-rcs-blue/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-center p-4">
                            <span className="text-rcs-gold text-sm font-medium">{project.category}</span>
                            <h3 className="text-white text-xl font-bold mt-1">{project.title}</h3>
                            <Link
                              to={`/projects#${project.id}`}
                              className="mt-4 inline-flex items-center text-white bg-rcs-gold/20 backdrop-blur-sm px-4 py-2 rounded-md hover:bg-rcs-gold/40 transition-colors duration-200"
                            >
                              View Project <ExternalLink size={16} className="ml-2" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-4">
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
            className="bg-rcs-blue text-white font-montserrat font-semibold px-8 py-3 rounded-md hover:bg-blue-900 transition-colors duration-300 inline-flex items-center justify-center"
          >
            View All Projects <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
