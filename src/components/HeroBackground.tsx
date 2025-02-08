import React from 'react';
import Image from 'next/image';

interface HeroBackgroundProps {
  image: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ image }) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={image}
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

export default HeroBackground; 