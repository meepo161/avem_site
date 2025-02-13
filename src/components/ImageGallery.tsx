import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY * -0.01;
      const newScale = Math.min(Math.max(0.5, scale + delta), 3);
      setScale(newScale);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setHasMoved(false);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      e.preventDefault();
      setHasMoved(true);
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleImageNavigation = (direction: 'prev' | 'next', e?: React.MouseEvent) => {
    e?.stopPropagation();
    const currentImageIndex = images.findIndex(img => img === selectedImage);
    if (direction === 'prev') {
      const newIndex = (currentImageIndex - 1 + images.length) % images.length;
      setSelectedImage(images[newIndex]);
    } else {
      const newIndex = (currentImageIndex + 1) % images.length;
      setSelectedImage(images[newIndex]);
    }
    // Сброс зума и позиции при смене изображения в модальном режиме
    if (isZoomed) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (!hasMoved && e.target === e.currentTarget) {
      toggleZoom();
    }
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setHasMoved(false);
  };

  const currentImageIndex = images.findIndex(img => img === selectedImage);
  
  return (
    <div className="w-full">
      {/* Основное изображение */}
      <div className="relative bg-white h-[600px] group">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full cursor-zoom-in"
            onClick={toggleZoom}
          >
            <ImageWithFallback
              src={selectedImage}
              alt={title}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
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
        </AnimatePresence>

        {/* Кнопки навигации и счетчик */}
        {images.length > 1 && (
          <>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 font-medium">
              {currentImageIndex + 1} / {images.length}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={(e) => handleImageNavigation('prev', e)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full text-gray-700 hover:text-primary-600 transition-all"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={(e) => handleImageNavigation('next', e)}
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
            onClick={handleModalClick}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-full"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ 
                  touchAction: 'none',
                  cursor: scale > 1 ? isDragging ? 'grabbing' : 'grab' : 'default'
                }}
              >
                <ImageWithFallback
                  src={selectedImage}
                  alt={title}
                  fill
                  className="object-contain p-8"
                  priority
                  style={{ 
                    transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                  }}
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
                    onClick={(e) => handleImageNavigation('prev', e)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={(e) => handleImageNavigation('next', e)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </>
              )}

              {/* Кнопки управления */}
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={toggleZoom}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => document.exitFullscreen()}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 5m-5-5v6m16-6l-5 5m5-5v6m0 6l-5-5m5 5h-6m-6 0l5-5m-5 5v-6" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGallery; 