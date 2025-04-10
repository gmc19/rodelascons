
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowLeft, ArrowRight, X, ZoomIn, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, title }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    else if (e.key === 'ArrowLeft') handlePrevious();
    else if (e.key === 'Escape') setOpen(false);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-image-${currentIndex+1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {images.map((image, index) => (
          <motion.div 
            key={index} 
            className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
            onClick={() => handleThumbnailClick(index)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <AspectRatio ratio={4/3}>
              <img 
                src={image} 
                alt={`${title} - image ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                <ZoomIn className="mx-auto mb-1" size={24} />
                <span className="text-xs font-medium">{index + 1} / {images.length}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent 
          className={`${isFullscreen ? 'max-w-none w-screen h-screen m-0 p-0 rounded-none' : 'max-w-4xl w-full bg-black/90 border-gray-800 p-1 sm:p-2'}`}
          onKeyDown={handleKeyDown}
          onInteractOutside={(e) => e.preventDefault()} // Prevent closing on outside click
        >
          <div className={`${isFullscreen ? 'absolute right-4 top-4' : 'absolute right-2 top-2'} z-20 flex gap-2`}>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="rounded-full bg-black/50 text-white hover:bg-black/70 border-none"
            >
              <ZoomIn size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={downloadImage}
              className="rounded-full bg-black/50 text-white hover:bg-black/70 border-none"
            >
              <Download size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setOpen(false)}
              className="rounded-full bg-black/50 text-white hover:bg-black/70 border-none"
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className={`relative flex items-center justify-center w-full ${isFullscreen ? 'h-full' : 'h-full'}`}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img 
                  src={images[currentIndex]} 
                  alt={`${title} - full view`} 
                  className={`max-w-full max-h-full object-contain ${isFullscreen ? 'p-8' : ''}`}
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 z-10">
              <div className="bg-black/70 py-1 px-3 rounded-full text-xs text-white">
                {currentIndex + 1} / {images.length}
              </div>
            </div>

            {images.length > 1 && (
              <>
                <Button 
                  variant="outline"
                  size="icon" 
                  onClick={handlePrevious} 
                  className="absolute left-2 z-10 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                >
                  <ChevronLeft size={24} />
                </Button>
                <Button 
                  variant="outline"
                  size="icon" 
                  onClick={handleNext} 
                  className="absolute right-2 z-10 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                >
                  <ChevronRight size={24} />
                </Button>
              </>
            )}
          </div>
          
          {images.length > 1 && !isFullscreen && (
            <div className="flex overflow-x-auto gap-2 pb-2 px-2 mt-2 bg-black/80 rounded-lg">
              {images.map((thumb, idx) => (
                <motion.div 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden cursor-pointer border-2 ${
                    currentIndex === idx ? 'border-rcs-gold' : 'border-transparent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img 
                    src={thumb} 
                    alt={`Thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectGallery;
