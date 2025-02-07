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
          alt="АВЭМ и Авиаагрегат-Н Logo"
          width={32}
          height={32}
          className="rounded-sm"
        />
        <span className="text-xl font-bold text-primary-600">
          АВЭМ и Авиаагрегат-Н
        </span>
      </motion.div>
    </Link>
  );
};

export default Logo;