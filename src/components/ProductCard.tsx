import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import ImageWithFallback from './ImageWithFallback';
import { Document } from '@/types/products';

interface ProductCardProps {
  id?: number;
  title: string;
  description: string;
  image: string;
  price?: string;
  category: string;
  categoryId: string;
  subcategoryId: string | null;
  documents?: Document[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  image,
  price,
  category,
  categoryId,
  subcategoryId,
  documents,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!id) return;

    const query: { [key: string]: string } = { id: id.toString() };
    if (categoryId) {
      query.category = categoryId;
      if (subcategoryId) {
        query.subcategory = subcategoryId;
      }
    }

    if (e.ctrlKey || e.metaKey) {
      const url = `/products/${id}?${new URLSearchParams(query).toString()}`;
      window.open(url, '_blank');
      return;
    }
    
    router.push({
      pathname: `/products/${id}`,
      query
    });
  };

  const documentIcons = {
    passport: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    manual: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    certificate: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    verification: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  };

  const documentTitles = {
    passport: 'Паспорт',
    manual: 'Руководство',
    certificate: 'Свидетельство',
    verification: 'Методика поверки',
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-xl h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.2 }}
    >
      <Link href={id ? `/products/${id}` : '/products'} onClick={handleClick} className="block">
        <div className="relative h-48 bg-gray-50">
          <ImageWithFallback
            src={image}
            alt={title}
            fill
            className="w-full h-full"
            priority={id === 1}
          />
          <div className="absolute top-2 right-2 bg-primary-500 text-white px-2 py-1 rounded text-sm">
            {category}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          {price && (
            <p className="text-primary-600 font-semibold">{price}</p>
          )}
        </div>
      </Link>

      {documents && documents.length > 0 && (
        <div className="px-4 pb-4">
          <div className="border-t pt-4">
            <div className="flex flex-col gap-2">
              {documents
                .filter(doc => doc.type === 'certificate' || doc.type === 'verification')
                .map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center p-2 rounded-lg hover:bg-primary-50 transition-all"
                    title={doc.title}
                  >
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg bg-primary-100 text-primary-600 group-hover:bg-primary-200">
                      {documentIcons[doc.type]}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 truncate group-hover:text-primary-600">
                      {doc.type === 'certificate' ? 'Описание типа СИ' : 'Методика поверки'}
                    </span>
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard; 