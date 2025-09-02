import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ImageGallery = ({ images = [], title = "Property Images" }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  if (images.length === 0) {
    return (
      <div className="bg-slate-100 rounded-xl h-96 flex items-center justify-center">
        <div className="text-center text-slate-500">
          <ApperIcon name="ImageOff" size={48} className="mx-auto mb-2" />
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative group">
          <motion.img
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[selectedImage]}
            alt={`${title} - Image ${selectedImage + 1}`}
            className="w-full h-96 object-cover rounded-xl cursor-pointer"
            onClick={openFullscreen}
          />
          
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ApperIcon name="ChevronLeft" size={20} className="text-slate-700" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <ApperIcon name="ChevronRight" size={20} className="text-slate-700" />
              </button>
            </>
          )}
          
          <button
            onClick={openFullscreen}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          >
            <ApperIcon name="Expand" size={20} className="text-slate-700" />
          </button>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
        
        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-6 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === selectedImage
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent hover:border-slate-300"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === selectedImage && (
                  <div className="absolute inset-0 bg-primary/20" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeFullscreen}
          >
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            >
              <ApperIcon name="X" size={32} />
            </button>
            
            <div className="relative max-w-7xl max-h-full">
              <img
                src={images[selectedImage]}
                alt={`${title} - Image ${selectedImage + 1}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 p-2 rounded-full"
                  >
                    <ApperIcon name="ChevronLeft" size={24} />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 p-2 rounded-full"
                  >
                    <ApperIcon name="ChevronRight" size={24} />
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;