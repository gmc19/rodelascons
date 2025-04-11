
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Clock, CheckCircle, Play } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

const AboutUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);
  
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

  // Project images for the mosaic - expanded to 16 images with consistent naming
  const projectImages = [{
    src: "/images/projects/residential/cassasis_residential/main.jpg",
    alt: "Cassasis Residential",
    category: "Residential",
    description: "Luxury residential project showcasing modern architectural design"
  }, {
    src: "/images/projects/residential/racha_project/1.jpg",
    alt: "Racha Project Exterior",
    category: "Residential",
    description: "Contemporary home featuring elegant exterior design"
  }, {
    src: "/images/projects/commercial/jezelle_fashion/1.jpg",
    alt: "Jezelle Fashion Store",
    category: "Commercial",
    description: "Stylish retail space with innovative layout"
  }, {
    src: "/images/projects/renovation/southforbes/1.jpg",
    alt: "South Forbes Exterior",
    category: "Renovation",
    description: "Complete exterior renovation with modern aesthetic"
  }, {
    src: "/images/projects/residential/racha_project/5.jpg",
    alt: "Racha Living Room",
    category: "Interior",
    description: "Spacious living area with premium finishes"
  }, {
    src: "/images/projects/commercial/jezelle_fashion/3.jpg",
    alt: "Jezelle Fashion Interior",
    category: "Commercial",
    description: "Custom retail fixtures and specialized lighting"
  }, {
    src: "/images/projects/renovation/southforbes/4.jpg",
    alt: "South Forbes Kitchen",
    category: "Interior",
    description: "Modern kitchen renovation with high-end appliances"
  }, {
    src: "/images/projects/residential/cassasis_residential/gallery2.jpg",
    alt: "Cassasis Interior",
    category: "Interior",
    description: "Elegant interior design with attention to detail"
  }, {
    src: "/images/projects/residential/racha_project/9.jpg",
    alt: "Racha Detail",
    category: "Detail",
    description: "Custom architectural elements highlighting craftsmanship"
  }, {
    src: "/images/projects/commercial/jezelle_fashion/5.jpg",
    alt: "Jezelle Display Area",
    category: "Commercial",
    description: "Innovative display solutions for retail environment"
  }, {
    src: "/images/projects/renovation/southforbes/2.jpg",
    alt: "South Forbes Living",
    category: "Interior",
    description: "Transformed living space with contemporary design"
  }, {
    src: "/images/projects/residential/racha_project/2.jpg",
    alt: "Racha Front View",
    category: "Exterior",
    description: "Striking facade with premium materials"
  }, {
    src: "/images/projects/commercial/jezelle_fashion/2.jpg",
    alt: "Jezelle Entrance",
    category: "Commercial",
    description: "Eye-catching storefront design with brand identity"
  }, {
    src: "/images/projects/residential/racha_project/4.jpg",
    alt: "Racha Kitchen",
    category: "Interior",
    description: "Gourmet kitchen with custom cabinetry"
  }, {
    src: "/images/projects/renovation/southforbes/3.jpg",
    alt: "South Forbes Bathroom",
    category: "Interior",
    description: "Spa-inspired bathroom renovation"
  }, {
    src: "/images/projects/residential/cassasis_residential/gallery3.jpg",
    alt: "Cassasis Detail",
    category: "Detail",
    description: "Fine architectural detailing showcasing precision"
  }];

  // Animation variants for mosaic items
  const mosaicVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };
  
  // Animation for the wave effect on hover
  const getWaveEffect = (index: number) => {
    if (hoveredIndex === null) return {};
    
    const distance = Math.abs(hoveredIndex - index);
    const maxDistance = 3; // How far the wave effect reaches
    
    if (distance > maxDistance) return { scale: 1 };
    
    const scaleEffect = 1 + (0.05 * (maxDistance - distance) / maxDistance);
    const delay = distance * 0.05;
    
    return {
      scale: scaleEffect,
      transition: {
        delay,
        duration: 0.3
      }
    };
  };
  
  const excellenceYears = 13;

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Excellence badge - positioned top-right of the mosaic */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 z-10">
                <motion.div 
                  initial={{ scale: 0, rotate: -10 }}
                  animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
                  transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
                  className="bg-rcs-gold text-rcs-blue font-bold rounded-full h-24 w-24 flex flex-col items-center justify-center transform -rotate-12 shadow-lg border-4 border-white"
                >
                  <span className="text-2xl font-bold">{excellenceYears}+</span>
                  <span className="text-xs leading-tight text-center">Years of<br />Excellence</span>
                </motion.div>
              </div>

              {/* Mosaic grid with uniform sizing and improved hover effects */}
              <div 
                ref={mosaicRef} 
                className="grid grid-cols-4 gap-2 md:gap-2 relative p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-inner"
              >
                {projectImages.map((image, index) => (
                  <motion.div 
                    key={index}
                    custom={index}
                    variants={mosaicVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    whileHover="hover"
                    style={{ height: '120px' }}
                    animate={getWaveEffect(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative overflow-hidden rounded-lg transition-all duration-300 shadow-md hover:shadow-xl hover:z-10 group ${hoveredIndex === index ? 'ring-2 ring-rcs-gold' : ''}`}
                  >
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="w-full h-full overflow-hidden cursor-pointer">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-2 left-2 text-white text-xs font-medium p-1">
                              <span className="bg-black/40 px-2 py-1 rounded-sm backdrop-blur-sm">
                                {image.alt}
                              </span>
                            </div>
                            {index % 5 === 0 && (
                              <div className="absolute top-2 right-2">
                                <motion.div 
                                  whileHover={{ scale: 1.2 }}
                                  className="bg-rcs-gold/90 rounded-full p-1"
                                >
                                  <Play size={12} className="text-rcs-blue" fill="currentColor" />
                                </motion.div>
                              </div>
                            )}
                          </div>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <AspectRatio ratio={16 / 9}>
                            <motion.img 
                              src={image.src} 
                              alt={image.alt} 
                              className="rounded-md object-cover w-full h-full"
                              initial={{ scale: 1.05, opacity: 0.8 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </AspectRatio>
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold">{image.alt}</h4>
                            <span className="text-xs bg-rcs-blue/10 text-rcs-blue px-2 py-0.5 rounded-full">
                              {image.category}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{image.description}</p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-rcs-blue mb-6">About Rodelas Construction Services</h2>
            
              <motion.p 
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-gray-700 mb-6 text-lg"
              >
                Since 2010, Rodelas Construction Services has been delivering exceptional construction solutions across residential, commercial, and industrial sectors. We combine technical expertise with innovative approaches to create buildings that stand the test of time.
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  icon: <Award className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />,
                  title: "Quality Excellence",
                  desc: "Committed to the highest standards in every project"
                },
                {
                  icon: <Users className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />,
                  title: "Expert Team",
                  desc: "Skilled professionals with decades of combined experience"
                },
                {
                  icon: <Clock className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />,
                  title: "On-Time Delivery",
                  desc: "We value your time and adhere to strict schedules"
                },
                {
                  icon: <CheckCircle className="text-rcs-gold mr-3 mt-1 flex-shrink-0" size={24} />,
                  title: "Client Satisfaction",
                  desc: "Your vision and satisfaction are our top priorities"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  {item.icon}
                  <div>
                    <h3 className="font-bold text-rcs-blue text-lg">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="inline-block"
            >
              <Link to="/contact" className="inline-flex items-center text-white bg-rcs-blue px-6 py-3 rounded-md hover:bg-rcs-blue/90 transition-all duration-300 font-semibold group overflow-hidden relative shadow-lg">
                <span className="relative z-10 flex items-center">
                  Learn More About Us 
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-rcs-gold transition-all duration-300 group-hover:h-full -z-0"></span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
