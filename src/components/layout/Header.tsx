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
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/icon.ico"
              alt="АВЭМ и Авиаагрегат-Н Logo"
              width={32}
              height={32}
              className="rounded-sm"
            />
            <Link href="/" className="text-2xl font-bold text-primary-600">
              АВЭМ и Авиаагрегат-Н
            </Link>
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-colors">
              Продукция
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              О компании
            </Link>
            <Link href="/certificates" className="text-gray-700 hover:text-primary-600 transition-colors">
              Сертификаты
            </Link>
            <Link href="/contacts" className="text-gray-700 hover:text-primary-600 transition-colors">
              Контакты
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