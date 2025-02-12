import React from 'react';
import { motion } from 'framer-motion';
import PrimaryButton from './buttons/PrimaryButton';
import SecondaryButton from './buttons/SecondaryButton';
import { useRouter } from 'next/router';
import HeroBackground from '@/components/HeroBackground';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  image?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, image = '/images/products/kspem (7).jpg' }) => {
  const router = useRouter();

  return (
    <section className="relative h-[40vh] md:min-h-[300px] flex items-center">
      <div className="absolute inset-0 z-0">
        <HeroBackground image={image} />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;