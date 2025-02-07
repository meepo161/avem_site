import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageError = (image: string) => {
    setImageError(prev => ({ ...prev, [image]: true }));
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const currentImageIndex = images.findIndex(img => img === selectedImage);
  
  const selectPreviousImage = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setSelectedImage(images[newIndex]);
  };

  const selectNextImage = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setSelectedImage(images[newIndex]);
  };

  return (
    <div className="w-full">
      {/* Основное изображение */}
      <div className="relative bg-white h-[600px] group">
        <AnimatePresence mode="wait">
          {!imageError[selectedImage] ? (
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full cursor-zoom-in"
              onClick={toggleZoom}
            >
              <Image
                src={selectedImage}
                alt={title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                onError={() => handleImageError(selectedImage)}
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="bg-white/90 p-3 rounded-full"
                >
                  <svg 
                    className="w-6 h-6 text-primary-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
              <div className="text-center">
                <svg 
                  className="w-16 h-16 mx-auto mb-4 text-gray-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
                <p className="text-lg">Изображение недоступно</p>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Кнопки навигации и счетчик */}
        {images.length > 1 && (
          <>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 font-medium">
              {currentImageIndex + 1} / {images.length}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={selectPreviousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full text-gray-700 hover:text-primary-600 transition-all"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={selectNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full text-gray-700 hover:text-primary-600 transition-all"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}
      </div>

      {/* Модальное окно с увеличенным изображением */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={toggleZoom}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-full"
              >
                <Image
                  src={selectedImage}
                  alt={title}
                  fill
                  className="object-contain p-8"
                  onError={() => handleImageError(selectedImage)}
                  sizes="100vw"
                  priority
                />
              </motion.div>

              {/* Кнопки навигации для увеличенного изображения */}
              {images.length > 1 && (
                <>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectPreviousImage();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectNextImage();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={toggleZoom}
                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery; 