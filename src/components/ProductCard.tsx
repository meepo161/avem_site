import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface ProductCardProps {
  id?: number;
  title: string;
  description: string;
  image: string;
  price?: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  image,
  price,
  category,
}) => {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!id) return; // Если нет id, не делаем переход

    if (e.ctrlKey || e.metaKey) {
      // Если нажат Ctrl или Cmd, открываем в новой вкладке
      window.open(`/products/${id}`, '_blank');
      return;
    }
    router.push(`/products/${id}`);
  };

  return (
    <Link href={id ? `/products/${id}` : '/products'} onClick={handleClick}>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-xl cursor-pointer h-full"
      >
        <div className="relative h-48">
          {!imageError ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain p-4"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              Изображение недоступно
            </div>
          )}
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
      </motion.div>
    </Link>
  );
};

export default ProductCard; 