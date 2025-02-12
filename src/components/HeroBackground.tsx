import React from 'react';
import Image from 'next/image';

const HeroBackground: React.FC<{ image: string }> = ({ image }) => {
  return (
    <div className="absolute inset-0">
      <Image
        src={image}
        alt="Background"
        fill
        className="object-cover object-center"
        quality={80}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/60" />
    </div>
  );
};

export default HeroBackground; 