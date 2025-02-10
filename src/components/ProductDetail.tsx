import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ImageGallery from './ImageGallery';
import { Product } from '@/types/products';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Галерея изображений */}
        <div>
          <ImageGallery images={product.images} title={product.name} />
        </div>

        {/* Информация о продукте */}
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Описание */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Описание</h2>
              <div className="prose max-w-none">
                <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
              </div>
            </div>
          </div>

          {/* Характеристики */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Технические характеристики</h2>
              <div className="space-y-3">
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600 sm:w-1/2">{key}</span>
                    <span className="font-medium sm:w-1/2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Документы */}
          {product.documents && product.documents.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Документация</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.documents.map((doc) => (
                    <motion.a
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-400 hover:shadow-md transition-all group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="flex-grow font-medium text-gray-700 group-hover:text-primary-600 transition-colors">
                        {doc.title}
                      </span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 