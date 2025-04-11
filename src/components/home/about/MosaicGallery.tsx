
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

interface ProjectImage {
  src: string;
  alt: string;
  category: string;
  description: string;
}

interface MosaicGalleryProps {
  isVisible: boolean;
}

const MosaicGallery = ({ isVisible }: MosaicGalleryProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
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
  
  return (
    <div 
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
  );
};

export default MosaicGallery;
