import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ImageGallery from '@/components/ImageGallery';
import HeroBackground from '@/components/HeroBackground';

const certificates = [
  {
    title: "Свидетельство об аттестации СИЛИС",
    image: "/images/certificates/Sidetelstvo-attastat-Silis-001.jpg"
  },
  {
    title: "Декларация КВМ 2021",
    image: "/images/certificates/declaracia_kvm_2021.jpg"
  },
  {
    title: "Сертификат КВМ РБ",
    image: "/images/certificates/Sertifikat_kvm_RB.jpg"
  },
  {
    title: "Сертификат АВЭМ-4 РБ",
    image: "/images/certificates/Sertifikat_avem-4_RB.jpg"
  },
  {
    title: "Золотая медаль 2018",
    image: "/images/certificates/gold_merk_2018.jpg"
  },
  {
    title: "Почетная грамота",
    image: "/images/certificates/gramota.jpg"
  },
  {
    title: "Диплом КВМ",
    image: "/images/certificates/Diplom_KVM.jpg"
  },
  {
    title: "Декларация качества КВМ",
    image: "/images/certificates/Declaracia_kahestva_KVM.jpg"
  },
  {
    title: "Свидетельство ВИУ-МТ",
    image: "/images/certificates/svidetelstvo_viu_mt.jpg"
  },
  {
    title: "Декларация ТР ТС ВИУ-МТ",
    image: "/images/certificates/declarac_tr_tc_viu_mt.jpg"
  },
  {
    title: "Декларация ДУЭТ-1",
    image: "/images/certificates/Declaracia_Duet-1.jpg"
  },
  {
    title: 'Сертификат ISO',
    image: '/images/certificates/ISO.jpg'
  },
  {
    title: 'Лицензия',
    image: '/images/certificates/licenzia.jpg'
  },
  {
    title: 'Свидетельство об утверждении типа КВМ',
    image: '/images/certificates/svidetelstvo-ob-ytverjdenii-tipa_KVM.jpg'
  },
  {
    title: 'Декларация качества ИКАС',
    image: '/images/certificates/deklaracia_kahestva_IKAS.jpg'
  },
  {
    title: 'Диплом ИКАС',
    image: '/images/certificates/diplom_IKAS.jpg'
  },
  {
    title: 'ИКАС - Товар Дона',
    image: '/images/certificates/ikas_tovar_dona.jpg'
  },
  {
    title: 'Декларация АВЭМ-4',
    image: '/images/certificates/declaracia_avem-4.jpg'
  },
  {
    title: 'Декларация КСИПН',
    image: '/images/certificates/deklaraciya_TR-TS-KSiTN.jpg'
  },
  {
    title: 'Декларация КСПМ',
    image: '/images/certificates/Declaracia_KSPM.jpg'
  },
  {
    title: 'Сертификат КСПМ-2',
    image: '/images/certificates/sertif_kspm-2.jpg'
  },
  {
    title: 'Декларация КСПАД',
    image: '/images/certificates/Declaracia_kspad.jpg'
  },
  {
    title: 'Декларация КСИАТ',
    image: '/images/certificates/Deklaracia_KSIAT.jpg'
  },
  {
    title: 'Декларация СГИ',
    image: '/images/certificates/declaracia_SGI.jpg'
  }
];

const CertificatesPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const certificateImages = [
    '/images/certificates/Sidetelstvo-attastat-Silis-001.jpg',
    '/images/certificates/Sertifikat_kvm_RB.jpg',
    '/images/certificates/ISO.jpg',
    '/images/certificates/gold_merk_2018.jpg',
  ];

  return (
    <Layout>
      {/* Hero секция */}
      <section className="relative h-[40vh] md:min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <HeroBackground image="/images/products/ливс.jpg" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Сертификаты
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80"
          >
            Документы, подтверждающие качество и соответствие нашей продукции стандартам
          </motion.p>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedImage(cert.image)}
                >
                  <div className="relative h-[400px] bg-gray-50">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent group-hover:opacity-0 transition-opacity duration-300" />
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <div className="bg-white/90 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
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
                      </div>
                    </motion.div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
                      {cert.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Модальное окно для просмотра изображения */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage}
                  alt="Сертификат"
                  fill
                  className="object-contain p-8"
                  sizes="100vw"
                  priority
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default CertificatesPage; 