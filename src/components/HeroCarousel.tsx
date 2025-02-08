import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroCarouselProps {
  images?: string[];
}

const defaultImages = [
  '/images/carousel/carousel (1).jpg',
  '/images/carousel/carousel (2).jpg',
  '/images/carousel/carousel (3).jpg',
  '/images/carousel/carousel (4).jpg',
].map(path => path.toLowerCase());

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

const HeroCarousel: React.FC<HeroCarouselProps> = ({ images = defaultImages }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const imageIndex = Math.abs(page % images.length);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isAnimating) {
        paginate(1);
      }
    }, 7000);

    return () => clearInterval(timer);
  }, [isAnimating]);

  const paginate = (newDirection: number) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setPage([page + newDirection, newDirection]);
    }
  };

  const handleDotClick = (index: number) => {
    if (!isAnimating) {
      const diff = index - imageIndex;
      if (diff !== 0) {
        setPage([page + diff, Math.sign(diff)]);
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === imageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ zIndex: index === imageIndex ? 1 : 0 }}
          >
            <Image
              src={src}
              alt="Авиаагрегат-Н Hero Background"
              fill
              className="object-cover"
              priority={index === imageIndex}
              sizes="100vw"
              quality={90}
              onError={(e) => {
                console.error(`Error loading image: ${src}`);
                // Можно добавить fallback изображение при ошибке
                (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
          </div>
        ))}
      </div>

      <AnimatePresence
        initial={false}
        custom={direction}
        onExitComplete={() => setIsAnimating(false)}
      >
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { 
              type: "tween", 
              duration: 0.8,
              ease: "easeInOut"
            },
            opacity: { 
              duration: 0.5,
              ease: "easeInOut" 
            }
          }}
          className="absolute inset-0 pointer-events-none"
        />
      </AnimatePresence>

      {/* Навигационные точки */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              imageIndex === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Кнопки влево/вправо */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all z-20"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all z-20"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default HeroCarousel; 