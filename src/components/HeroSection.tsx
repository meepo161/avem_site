import React from 'react';
import { motion } from 'framer-motion';
import PrimaryButton from './buttons/PrimaryButton';
import SecondaryButton from './buttons/SecondaryButton';
import { useRouter } from 'next/router';

const HeroSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 z-0" />
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Инновационные решения для электротехнической промышленности
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Разрабатываем и производим современное оборудование для тестирования и диагностики электрических агрегатов любой сложности
          </p>
          <div className="flex flex-wrap gap-4">
            <PrimaryButton onClick={() => router.push('/products')}>
              Каталог продукции
            </PrimaryButton>
            <SecondaryButton onClick={() => router.push('/contacts')}>
              Получить консультацию
            </SecondaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;