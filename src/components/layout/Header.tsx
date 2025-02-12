import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Image
                src="/images/icon.ico"
                width={40}
                height={40}
                alt="Авиаагрегат-Н Logo"
                className="w-10 h-10"
              />
              <span className="text-lg font-semibold ml-2">
                Авиаагрегат-Н
              </span>
            </motion.div>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Продукция
            </Link>
            <Link href="/configurator" className="text-gray-700 hover:text-primary-600 transition-colors">
              Конфигуратор
            </Link>
            <Link href="/certificates" className="text-gray-700 hover:text-primary-600 transition-colors">
              Сертификаты
            </Link>
            <Link href="/contacts" className="text-gray-700 hover:text-primary-600 transition-colors">
              Контакты
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              О компании
            </Link>
          </div>
          
          <button
            className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
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
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header; 