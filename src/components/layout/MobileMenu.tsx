import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg z-50"
          >
            <div className="p-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <nav className="mt-8">
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/products"
                    className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                    onClick={onClose}
                  >
                    Продукция
                  </Link>
                  <Link
                    href="/certificates"
                    className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                    onClick={onClose}
                  >
                    Сертификаты
                  </Link>
                  <Link
                    href="/contacts"
                    className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                    onClick={onClose}
                  >
                    Контакты
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                    onClick={onClose}
                  >
                    О компании
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu; 