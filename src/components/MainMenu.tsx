import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const menuItems = [
  { href: '/products', label: 'Продукция' },
  { href: '/about', label: 'О компании' },
  { href: '/certificates', label: 'Сертификаты' },
  { href: '/contacts', label: 'Контакты' },
];

const MainMenu: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="flex items-center space-x-8">
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-base font-medium transition-colors ${
            router.pathname === item.href
              ? 'text-primary-600'
              : 'text-gray-700 hover:text-primary-600'
          }`}
        >
          <motion.span
            whileHover={{ y: -2 }}
            className="inline-block"
          >
            {item.label}
          </motion.span>
        </Link>
      ))}
    </nav>
  );
};

export default MainMenu;