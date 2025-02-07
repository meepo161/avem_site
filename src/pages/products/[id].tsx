import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import ImageGallery from '@/components/ImageGallery';
import ResizableTable from '@/components/ResizableTable';
import { products, categories } from '@/data/products';

interface ProductPageProps {
  product: typeof products[0];
  category: typeof categories[0];
  subcategory: typeof categories[0]['subcategories'][0];
}

type TabType = 'description' | 'specifications';

export default function ProductPage({ product, category, subcategory }: ProductPageProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const shortDescription = product.description.split('\n')[0];
  const hasMoreDescription = product.description.split('\n').length > 1;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Навигация */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              href="/products" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors group"
            >
              <svg 
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              <span className="font-medium">Назад к каталогу</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Галерея изображений */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24 h-fit bg-white rounded-2xl shadow-lg p-6"
            >
              <ImageGallery images={product.images} title={product.name} />
            </motion.div>

            {/* Информация о продукте */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <nav className="flex flex-wrap mb-6 text-sm text-gray-500">
                <Link href="/products" className="hover:text-primary-600 transition-colors">
                  Каталог
                </Link>
                <span className="mx-2">/</span>
                <Link 
                  href={`/products?category=${category.id}`} 
                  className="hover:text-primary-600 transition-colors"
                >
                  {category.name}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{subcategory.name}</span>
              </nav>

              <h1 className="text-4xl font-bold mb-8 text-gray-900">{product.name}</h1>

              {/* Описание */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="p-6">
                  <div className="prose max-w-none">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={showFullDescription ? 'full' : 'short'}
                        initial={false}
                        animate={{
                          height: 'auto',
                        }}
                        style={{
                          height: 'auto',
                        }}
                        transition={{
                          duration: 1,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                      >
                        <p className="text-gray-600 whitespace-pre-line text-lg leading-relaxed">
                          {showFullDescription ? product.description : shortDescription}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {hasMoreDescription && (
                    <button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="mt-4 flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <span>{showFullDescription ? 'Свернуть' : 'Развернуть'}</span>
                      <motion.svg
                        animate={{ rotate: showFullDescription ? 180 : 0 }}
                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                  )}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                  onClick={() => window.location.href = 'mailto:sales@avem.ru?subject=Запрос цены на ' + product.name}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Запросить цену
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Характеристики на всю ширину */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-white rounded-2xl shadow-lg"
          >
            <ResizableTable specifications={product.specifications} />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find((p) => p.id.toString() === params?.id);
  
  if (!product) {
    return {
      notFound: true,
    };
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const subcategory = category?.subcategories.find((s) => s.id === product.subcategoryId);

  if (!category || !subcategory) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
      category,
      subcategory,
    },
  };
}; 