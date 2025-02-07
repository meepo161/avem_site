import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="text-primary-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;