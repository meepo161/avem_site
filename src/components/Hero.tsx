import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Breadcrumb {
  label: string;
  href: string;
}

interface HeroProps {
  title: string;
  description?: string;
  image?: string;
  breadcrumbs?: Breadcrumb[];
}

const Hero: React.FC<HeroProps> = ({
  title,
  description,
  image,
  breadcrumbs
}) => {
  return (
    <div className="relative bg-gray-900">
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
      )}
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        {breadcrumbs && (
          <nav className="mb-8">
            <ol className="flex space-x-2 text-sm text-gray-300">
              {breadcrumbs.map((item, index) => (
                <li key={item.href} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  <Link 
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default Hero; 