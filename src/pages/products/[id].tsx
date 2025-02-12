import React, { useState, useRef, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import ImageGallery from '@/components/ImageGallery';
import ResizableTable from '@/components/ResizableTable';
import { products, categories } from '@/data/products';
import { useRouter } from 'next/router';
import ImageWithFallback from '@/components/ImageWithFallback';

interface ProductPageProps {
  product: typeof products[0];
  category: typeof categories[0];
  subcategory: typeof categories[0]['subcategories'][0];
}

type TabType = 'description' | 'specifications';

export default function ProductPage({ product, category, subcategory }: ProductPageProps) {
  const router = useRouter();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (descriptionRef.current) {
        const lineHeight = parseInt(window.getComputedStyle(descriptionRef.current).lineHeight);
        const height = descriptionRef.current.scrollHeight;
        setHasOverflow(height > lineHeight * 4); // 4 строки
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [product.description]);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const query: { [key: string]: string } = {};
    
    if (product.categoryId) {
      query.category = product.categoryId;
      if (product.subcategoryId) {
        query.subcategory = product.subcategoryId;
      }
    }
    
    router.push({
      pathname: '/products',
      query
    });
  };

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
            <button 
              onClick={handleBackClick}
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
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Галерея изображений */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24 h-fit bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="space-y-6">
                {/* Основное изображение */}
                <div className="relative aspect-square bg-white rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={product.images[currentImageIndex]}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full cursor-zoom-in group"
                      onClick={() => setIsZoomed(true)}
                    >
                      <ImageWithFallback
                        src={product.images[currentImageIndex]}
                        alt={`${product.name} - изображение ${currentImageIndex + 1}`}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="bg-white/90 p-3 rounded-full"
                        >
                          <svg 
                            className="w-6 h-6 text-primary-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" 
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Кнопки навигации */}
                  {product.images.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full text-gray-700 hover:text-primary-600 transition-all shadow-lg"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full text-gray-700 hover:text-primary-600 transition-all shadow-lg"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </>
                  )}
                </div>

                {/* Миниатюры */}
                {product.images.length > 1 && (
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {product.images.map((image, index) => (
                      <motion.button
                        key={image}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                          currentImageIndex === index
                            ? 'ring-2 ring-primary-600'
                            : 'ring-1 ring-gray-200 hover:ring-primary-400'
                        }`}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`${product.name} - миниатюра ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Информация о продукте */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col lg:max-w-[calc(100vw/2-3rem)]"
            >
              <nav className="flex flex-wrap text-sm text-gray-500 mb-6">
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

              <h1 className="text-4xl font-bold text-gray-900 mb-6">{product.name}</h1>

              {/* Описание к продукту */}
              <div className="bg-white z-[2] rounded-2xl shadow-lg overflow-hidden mb-6">
                <div className="p-8">
                  <motion.div
                    animate={{ height: showFullDescription ? "auto" : "auto" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="relative"
                  >
                    <p
                      ref={descriptionRef}
                      className={`text-gray-600 text-lg leading-relaxed whitespace-pre-line ${
                        !showFullDescription ? 'line-clamp-4' : ''
                      }`}
                    >
                      {product.description}
                    </p>
                    {!showFullDescription && hasOverflow && (
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent z-10" />
                    )}
                  </motion.div>
                  {hasOverflow && (
                    <motion.button
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="mt-4 flex items-center gap-2 text-primary-600 hover:text-primary-700"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{showFullDescription ? 'Свернуть' : 'Развернуть'}</span>
                      <motion.svg
                        animate={{ rotate: showFullDescription ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </motion.button>
                  )}
                </div>
              </div>

              {product.documents && product.documents.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                  <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-6">Документация</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.documents.map((doc) => (
                        <a
                          key={doc.id}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all group"
                        >
                          {doc.type === 'passport' && (
                            <svg className="w-8 h-8 text-gray-500 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                          {doc.type === 'manual' && (
                            <svg className="w-8 h-8 text-gray-500 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          )}
                          {doc.type === 'certificate' && (
                            <svg className="w-8 h-8 text-gray-500 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          )}
                          {doc.type === 'verification' && (
                            <svg className="w-8 h-8 text-gray-500 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                          )}
                          <div>
                            <h3 className="font-medium text-gray-900 group-hover:text-primary-700">{doc.title}</h3>
                            <p className="text-sm text-gray-500">Нажмите, чтобы скачать</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
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
              </div>
            </motion.div>
          </div>

          {/* Модальное окно с увеличенным изображением */}
          <AnimatePresence>
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
                onClick={() => setIsZoomed(false)}
              >
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <motion.div
                    className="relative w-full h-full"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                  >
                    <ImageWithFallback
                      src={product.images[currentImageIndex]}
                      alt={`${product.name} - увеличенное изображение ${currentImageIndex + 1}`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>

                  {/* Кнопки навигации в модальном окне */}
                  {product.images.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </>
                  )}

                  {/* Кнопки управления */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setIsZoomed(false)}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Счетчик изображений */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Характеристики на всю ширину */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 bg-white rounded-2xl shadow-lg"
          >
            {product.specifications && <ResizableTable specifications={product.specifications} />}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find((p) => p.id === params?.id);
  
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