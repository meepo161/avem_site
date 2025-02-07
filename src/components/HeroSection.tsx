import React from 'react';
import { motion } from 'framer-motion';
import PrimaryButton from './buttons/PrimaryButton';
import SecondaryButton from './buttons/SecondaryButton';
import { useRouter } from 'next/router';

const HeroSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center py-12 sm:py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 z-0" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center sm:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
            Инновационные решения для электротехнической промышленности
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
            Разрабатываем и производим современное оборудование для тестирования и диагностики электрических агрегатов любой сложности
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <PrimaryButton 
              onClick={() => router.push('/products')}
              className="w-full sm:w-auto"
            >
              Каталог продукции
            </PrimaryButton>
            <SecondaryButton 
              onClick={() => router.push('/contacts')}
              className="w-full sm:w-auto"
            >
              Получить консультацию
            </SecondaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;