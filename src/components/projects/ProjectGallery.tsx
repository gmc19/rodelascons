
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowLeft, ArrowRight, X, ZoomIn } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, title }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group"
            onClick={() => handleThumbnailClick(index)}
          >
            <AspectRatio ratio={4/3}>
              <img 
                src={image} 
                alt={`${title} - image ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <ZoomIn className="text-white" size={24} />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-full bg-black/90 border-gray-800 p-1 sm:p-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 z-10 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <X size={18} />
          </Button>
          
          <div className="relative flex items-center justify-center w-full h-full">
            <div className="relative w-full">
              <AspectRatio ratio={16/9} className="overflow-hidden">
                <img 
                  src={images[currentIndex]} 
                  alt={`${title} - full view`} 
                  className="w-full h-full object-contain"
                />
              </AspectRatio>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                <div className="bg-black/70 py-1 px-3 rounded-full text-xs text-white">
                  {currentIndex + 1} / {images.length}
                </div>
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
                  <ArrowLeft size={18} />
                </Button>
                <Button 
                  variant="outline"
                  size="icon" 
                  onClick={handleNext} 
                  className="absolute right-2 z-10 rounded-full bg-black/50 text-white border-none hover:bg-black/70"
                >
                  <ArrowRight size={18} />
                </Button>
              </>
            )}
          </div>
          
          {images.length > 1 && (
            <div className="flex overflow-x-auto gap-2 pb-2 px-2 mt-2">
              {images.map((thumb, idx) => (
                <div 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden cursor-pointer border-2 ${
                    currentIndex === idx ? 'border-rcs-gold' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={thumb} 
                    alt={`Thumbnail ${idx + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectGallery;
