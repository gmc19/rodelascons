import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion, AnimatePresence } from "framer-motion";

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
  
  // All available project images combined into one array
  const allProjectImages: ProjectImage[] = [
    // Original project images
    {
      src: "/images/projects/residential/cassasis_residential/main.jpg",
      alt: "Cassasis Residential",
      category: "Residential",
      description: "Luxury residential project showcasing modern architectural design"
    },
    {
      src: "/images/projects/residential/racha_project/1.jpg",
      alt: "Racha Project Exterior",
      category: "Residential",
      description: "Contemporary home featuring elegant exterior design"
    },
    {
      src: "/images/projects/commercial/jezelle_fashion/1.jpg",
      alt: "Jezelle Fashion Store",
      category: "Commercial",
      description: "Stylish retail space with innovative layout"
    },
    {
      src: "/images/projects/renovation/southforbes/1.jpg",
      alt: "South Forbes Exterior",
      category: "Renovation",
      description: "Complete exterior renovation with modern aesthetic"
    },
    {
      src: "/images/projects/residential/racha_project/5.jpg",
      alt: "Racha Living Room",
      category: "Interior",
      description: "Spacious living area with premium finishes"
    },
    {
      src: "/images/projects/commercial/jezelle_fashion/3.jpg",
      alt: "Jezelle Fashion Interior",
      category: "Commercial",
      description: "Custom retail fixtures and specialized lighting"
    },
    {
      src: "/images/projects/renovation/southforbes/4.jpg",
      alt: "South Forbes Kitchen",
      category: "Interior",
      description: "Modern kitchen renovation with high-end appliances"
    },
    {
      src: "/images/projects/residential/cassasis_residential/gallery2.jpg",
      alt: "Cassasis Interior",
      category: "Interior",
      description: "Elegant interior design with attention to detail"
    },
    {
      src: "/images/projects/residential/racha_project/9.jpg",
      alt: "Racha Detail",
      category: "Detail",
      description: "Custom architectural elements highlighting craftsmanship"
    },
    {
      src: "/images/projects/commercial/jezelle_fashion/5.jpg",
      alt: "Jezelle Display Area",
      category: "Commercial",
      description: "Innovative display solutions for retail environment"
    },
    {
      src: "/images/projects/renovation/southforbes/2.jpg",
      alt: "South Forbes Living",
      category: "Interior",
      description: "Transformed living space with contemporary design"
    },
    {
      src: "/images/projects/residential/racha_project/2.jpg",
      alt: "Racha Front View",
      category: "Exterior",
      description: "Striking facade with premium materials"
    },
    {
      src: "/images/projects/commercial/jezelle_fashion/2.jpg",
      alt: "Jezelle Entrance",
      category: "Commercial",
      description: "Eye-catching storefront design with brand identity"
    },
    {
      src: "/images/projects/residential/racha_project/4.jpg",
      alt: "Racha Kitchen",
      category: "Interior",
      description: "Gourmet kitchen with custom cabinetry"
    },
    {
      src: "/images/projects/renovation/southforbes/3.jpg",
      alt: "South Forbes Bathroom",
      category: "Interior",
      description: "Spa-inspired bathroom renovation"
    },
    {
      src: "/images/projects/residential/cassasis_residential/gallery3.jpg",
      alt: "Cassasis Detail",
      category: "Detail",
      description: "Fine architectural detailing showcasing precision"
    },
    // Alternative images
    {
      src: "/images/projects/residential/cassasis_residential/gallery1.jpg",
      alt: "Cassasis Additional View",
      category: "Residential",
      description: "Alternative angle of luxury residential project"
    },
    {
      src: "/images/projects/residential/racha_project/3.jpg",
      alt: "Racha Bedroom",
      category: "Interior",
      description: "Serene bedroom with custom lighting features"
    },
    {
      src: "/images/projects/residential/racha_project/6.jpg",
      alt: "Racha Dining",
      category: "Interior",
      description: "Elegant dining area with designer fixtures"
    },
    {
      src: "/images/projects/residential/racha_project/7.jpg",
      alt: "Racha Bathroom",
      category: "Interior",
      description: "Luxury bathroom with premium finishes"
    },
    {
      src: "/images/projects/residential/racha_project/8.jpg",
      alt: "Racha Study",
      category: "Interior",
      description: "Functional study room with built-in storage"
    },
    {
      src: "/images/projects/commercial/jezelle_fashion/4.jpg",
      alt: "Jezelle Counter",
      category: "Commercial",
      description: "Custom checkout counter with integrated lighting"
    },
    {
      src: "/images/projects/commercial/jezelle_fashion/6.jpg",
      alt: "Jezelle Displays",
      category: "Commercial",
      description: "Specialized retail fixtures for optimal product display"
    },
    {
      src: "/images/projects/renovation/southforbes/5.jpg",
      alt: "South Forbes Exterior Angle",
      category: "Renovation", 
      description: "Alternative view of renovated exterior facade"
    },
    // Ayala Project Images
    {
      src: "/images/projects/residential/ayala/a.jpg",
      alt: "Ayala Alabang Facade",
      category: "Residential",
      description: "Modern facade of 2-storey residential build in Ayala Alabang"
    },
    {
      src: "/images/projects/residential/ayala/b.jpg",
      alt: "Ayala Alabang Exterior View",
      category: "Residential",
      description: "Elegant exterior with premium architectural details"
    },
    {
      src: "/images/projects/residential/ayala/c.jpg",
      alt: "Ayala Alabang Interior",
      category: "Residential",
      description: "Beautifully designed interior space with premium finishes"
    },
    {
      src: "/images/projects/residential/ayala/d.jpg",
      alt: "Ayala Alabang Living Space",
      category: "Residential",
      description: "Elegant living area with custom design elements"
    },
    {
      src: "/images/projects/residential/ayala/e.jpg",
      alt: "Ayala Alabang Detail",
      category: "Residential",
      description: "Fine architectural detailing showcasing craftsmanship"
    },
    // Additional real project images
    {
      src: "/images/projects/renovation/southforbes/6.jpg",
      alt: "South Forbes Garden",
      category: "Exterior",
      description: "Beautifully landscaped garden space"
    },
    {
      src: "/images/projects/renovation/southforbes/7.jpg",
      alt: "South Forbes Entrance",
      category: "Exterior",
      description: "Redesigned entrance with architectural details"
    },
    {
      src: "/images/projects/commercial/jezelle_fashion/7.jpg",
      alt: "Jezelle Fitting Room",
      category: "Commercial",
      description: "Elegantly designed fitting room area"
    }
  ];

  // Number of mosaic grid cells
  const gridCellCount = 16;
  
  // State to track what image is displayed in each cell
  const [cellImages, setCellImages] = useState<{[key: number]: {image: ProjectImage, transitioning: boolean, id: string}}>({});
  
  // Helper function to get a random image that's not currently displayed
  const getUniqueRandomImage = (currentImages: {[key: number]: {image: ProjectImage, transitioning: boolean, id: string}}) => {
    // Get all currently displayed image sources
    const usedSources = Object.values(currentImages).map(item => item.image.src);
    
    // Filter out images that are already being displayed
    const availableImages = allProjectImages.filter(img => !usedSources.includes(img.src));
    
    // If we've used all images (unlikely given our large set), just pick a random one
    if (availableImages.length === 0) {
      return allProjectImages[Math.floor(Math.random() * allProjectImages.length)];
    }
    
    // Return a random image from the available ones
    return availableImages[Math.floor(Math.random() * availableImages.length)];
  };

  // Initialize and manage the image rotation
  useEffect(() => {
    if (isVisible) {
      // Initialize each cell with a unique random image
      const initialCellImages: {[key: number]: {image: ProjectImage, transitioning: boolean, id: string}} = {};
      
      // Create a copy we can modify as we go to maintain uniqueness
      const availableImagesForInit = [...allProjectImages];
      
      for (let i = 0; i < gridCellCount; i++) {
        if (availableImagesForInit.length > 0) {
          // Pick a random index from remaining available images
          const randomIndex = Math.floor(Math.random() * availableImagesForInit.length);
          
          // Use that image and remove it from available ones
          initialCellImages[i] = {
            image: availableImagesForInit[randomIndex],
            transitioning: false,
            id: `init-${i}-${Date.now()}` // Unique ID for AnimatePresence
          };
          
          // Remove this image so it's not used again in initial setup
          availableImagesForInit.splice(randomIndex, 1);
        } else {
          // If we've used all images, just pick a random one (this is fallback)
          initialCellImages[i] = {
            image: allProjectImages[Math.floor(Math.random() * allProjectImages.length)],
            transitioning: false,
            id: `init-${i}-${Date.now()}`
          };
        }
      }
      
      setCellImages(initialCellImages);
      
      // Set up the interval for the continuous animation
      const animationInterval = setInterval(() => {
        // Select 1-4 random cells to change
        const numCellsToChange = Math.floor(Math.random() * 4) + 1;
        const cellsToChange: number[] = [];
        
        while (cellsToChange.length < numCellsToChange) {
          const randomCell = Math.floor(Math.random() * gridCellCount);
          if (!cellsToChange.includes(randomCell)) {
            cellsToChange.push(randomCell);
          }
        }
        
        // First set these cells to transitioning state (fading out)
        setCellImages(prev => {
          const newState = { ...prev };
          cellsToChange.forEach(cellIndex => {
            if (newState[cellIndex]) {
              newState[cellIndex] = {
                ...newState[cellIndex],
                transitioning: true
              };
            }
          });
          return newState;
        });
        
        // After the fade-out completes, update with new images
        setTimeout(() => {
          setCellImages(prev => {
            const newState = { ...prev };
            
            cellsToChange.forEach(cellIndex => {
              // Get a unique random image
              const newImage = getUniqueRandomImage(newState);
              
              newState[cellIndex] = {
                image: newImage,
                transitioning: false,
                id: `cell-${cellIndex}-${Date.now()}` // Unique id for animation keying
              };
            });
            
            return newState;
          });
        }, 800); // Longer fade-out for smoother transition
        
      }, 4000); // Longer interval between changes for a less frantic pace
      
      // Clean up on component unmount
      return () => clearInterval(animationInterval);
    }
  }, [isVisible]);

  const mosaicVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.8, // Longer animation for initial appearance
        ease: "easeInOut" // Smoother easing function
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.5 } // Slower hover effect
    }
  };
  
  const getWaveEffect = (index: number) => {
    if (hoveredIndex === null) return {};
    
    const distance = Math.abs(hoveredIndex - index);
    const maxDistance = 4; // Increased range of wave effect
    
    if (distance > maxDistance) return { scale: 1 };
    
    const scaleEffect = 1 + (0.05 * (maxDistance - distance) / maxDistance);
    const delay = distance * 0.08; // Slower propagation
    
    return {
      scale: scaleEffect,
      transition: {
        delay,
        duration: 0.5 // Slower transition for wave effect
      }
    };
  };

  const getCombinedAnimation = (index: number) => {
    if (!isVisible) return "hidden";
    
    const baseAnimation = mosaicVariants.visible(index);
    
    if (hoveredIndex !== null) {
      const waveEffect = getWaveEffect(index);
      return {
        ...baseAnimation,
        ...waveEffect
      };
    }
    
    return baseAnimation;
  };
  
  // Generate a grid of the desired number of cells
  const gridCells = Array.from({ length: gridCellCount }, (_, index) => index);
  
  return (
    <div 
      className="grid grid-cols-4 gap-2 md:gap-3 relative p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-inner"
    >
      {gridCells.map((index) => {
        const cellData = cellImages[index] || {
          image: allProjectImages[0],
          transitioning: false,
          id: `default-${index}`
        };
        
        return (
          <motion.div 
            key={index}
            custom={index}
            variants={mosaicVariants}
            initial="hidden"
            animate={getCombinedAnimation(index)}
            whileHover="hover"
            style={{ height: '120px' }}
            className={`relative overflow-hidden rounded-lg transition-all duration-500 shadow-md hover:shadow-xl hover:z-10 group ${hoveredIndex === index ? 'ring-2 ring-rcs-gold' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="wait">
              <motion.div 
                key={cellData.id}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: cellData.transitioning ? 0 : 1,
                  scale: cellData.transitioning ? 1.05 : 1
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 1.2, // Longer duration for smoother fades
                  ease: "easeInOut" // Smoother easing function
                }}
                className="w-full h-full"
              >
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="w-full h-full overflow-hidden cursor-pointer">
                      <img 
                        src={cellData.image.src} 
                        alt={cellData.image.alt} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-2 left-2 text-white text-xs font-medium p-1">
                          <span className="bg-black/40 px-2 py-1 rounded-sm backdrop-blur-sm">
                            {cellData.image.alt}
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
                          src={cellData.image.src} 
                          alt={cellData.image.alt} 
                          className="rounded-md object-cover w-full h-full"
                          initial={{ scale: 1.05, opacity: 0.8 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </AspectRatio>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold">{cellData.image.alt}</h4>
                        <span className="text-xs bg-rcs-blue/10 text-rcs-blue px-2 py-0.5 rounded-full">
                          {cellData.image.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{cellData.image.description}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MosaicGallery;
