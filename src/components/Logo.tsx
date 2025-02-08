import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
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
  );
};

export default Logo;