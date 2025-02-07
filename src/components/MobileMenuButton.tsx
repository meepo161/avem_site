import React from 'react';
import { motion } from 'framer-motion';

interface MobileMenuButtonProps {
  onClick?: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
      onClick={onClick}
      aria-label="Меню"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </motion.button>
  );
};

export default MobileMenuButton;