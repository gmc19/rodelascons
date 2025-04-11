import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Clock, CheckCircle } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const AboutUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Project images for the mosaic - expanded to 12 images with consistent naming
  const projectImages = [{
    src: "/images/projects/residential/cassasis_residential/main.jpg",
    alt: "Cassasis Residential"
  }, {
    src: "/images/projects/residential/racha_project/1.jpg",
    alt: "Racha Project Exterior"
  }, {
    src: "/images/projects/commercial/jezelle_fashion/1.jpg",
    alt: "Jezelle Fashion Store"
  }, {
    src: "/images/projects/renovation/southforbes/1.jpg",
    alt: "South Forbes Exterior"
  }, {
    src: "/images/projects/residential/racha_project/5.jpg",
    alt: "Racha Living Room"
  }, {
    src: "/images/projects/commercial/jezelle_fashion/3.jpg",
    alt: "Jezelle Fashion Interior"
  }, {
    src: "/images/projects/renovation/southforbes/4.jpg",
    alt: "South Forbes Kitchen"
  }, {
    src: "/images/projects/residential/cassasis_residential/gallery2.jpg",
    alt: "Cassasis Interior"
  }, {
    src: "/images/projects/residential/racha_project/9.jpg",
    alt: "Racha Detail"
  }, {
    src: "/images/projects/commercial/jezelle_fashion/5.jpg",
    alt: "Jezelle Display Area"
  }, {
    src: "/images/projects/renovation/southforbes/2.jpg",
    alt: "South Forbes Living"
  }, {
    src: "/images/projects/residential/racha_project/2.jpg",
    alt: "Racha Front View"
  }, {
    src: "/images/projects/commercial/jezelle_fashion/2.jpg",
    alt: "Jezelle Entrance"
  }, {
    src: "/images/projects/residential/racha_project/4.jpg",
    alt: "Racha Kitchen"
  }, {
    src: "/images/projects/renovation/southforbes/3.jpg",
    alt: "South Forbes Bathroom"
  }, {
    src: "/images/projects/residential/cassasis_residential/gallery3.jpg",
    alt: "Cassasis Detail"
  }];
  return <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Mosaic grid with uniform sizing and improved hover effects */}
            <div className="grid grid-cols-4 gap-2 md:gap-2 relative">
              {projectImages.map((image, index) => <div key={index} className="relative overflow-hidden rounded-lg group transition-all duration-300 shadow-md hover:shadow-xl hover:z-10 hover:scale-105" style={{
              height: '120px',
              // Uniform height for all images
              transition: 'all 0.5s ease'
            }}>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="w-full h-full overflow-hidden">
                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-2 left-2 text-white text-xs font-medium p-1">
                            {image.alt}
                          </div>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <AspectRatio ratio={16 / 9}>
                          <img src={image.src} alt={image.alt} className="rounded-md object-cover w-full h-full" />
                        </AspectRatio>
                        <h4 className="text-sm font-semibold">{image.alt}</h4>
                        <p className="text-xs text-muted-foreground">Part of our exceptional construction portfolio showcasing our craftsmanship and attention to detail.</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>)}
            </div>
            
            {/* Years of Excellence badge - separated from the mosaic and aligned with text */}
            
          </div>
          
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-rcs-blue mb-6">About Rodelas Construction Services</h2>
            
            <p className="text-gray-700 mb-6 text-lg">
              Since 2010, Rodelas Construction Services has been delivering exceptional construction solutions across residential, commercial, and industrial sectors. We combine technical expertise with innovative approaches to create buildings that stand the test of time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <Award className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-rcs-blue text-lg">Quality Excellence</h3>
                  <p className="text-gray-600">Committed to the highest standards in every project</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-rcs-blue text-lg">Expert Team</h3>
                  <p className="text-gray-600">Skilled professionals with decades of combined experience</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-rcs-blue text-lg">On-Time Delivery</h3>
                  <p className="text-gray-600">We value your time and adhere to strict schedules</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="font-bold text-rcs-blue text-lg">Client Satisfaction</h3>
                  <p className="text-gray-600">Your vision and satisfaction are our top priorities</p>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="inline-flex items-center text-rcs-blue bg-rcs-gold px-6 py-3 rounded-md hover:bg-yellow-400 transition-colors duration-300 font-semibold">
              Learn More About Us <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutUsSection;