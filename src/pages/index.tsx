import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import { useRouter } from 'next/router';

const products = [
  {
    id: 6,
    title: 'Киловольтметр КВМ',
    description: 'Цифровой киловольтметр для измерения высокого напряжения в электроустановках. Обеспечивает безопасное измерение напряжения в высоковольтных системах.',
    image: '/images/products/КИЛОВОЛЬТМЕТР КВМ.jpg',
    category: 'Измерительные приборы'
  },
  {
    id: 4,
    title: 'ИКАС-10',
    description: 'Прецизионный омметр для измерения малых сопротивлений. Предназначен для измерения переходных сопротивлений контактов высоковольтных выключателей.',
    image: '/images/products/ikas (1).jpg',
    category: 'Измерительные приборы'
  },
  {
    id: 5,
    title: 'АВЭМ-9',
    description: 'Цифровой мегаомметр для измерения сопротивления изоляции электрооборудования. Оснащен функцией измерения коэффициента абсорбции.',
    image: '/images/products/avem-9 (1).jpg',
    category: 'Измерительные приборы'
  },
];

const features = [
  {
    icon: '🔬',
    title: 'Собственные разработки',
    description: 'Полный цикл разработки и производства оборудования на территории России'
  },
  {
    icon: '🏭',
    title: 'Современное производство',
    description: 'Используем передовые технологии и компоненты от надежных поставщиков'
  },
  {
    icon: '📊',
    title: 'Высокая точность',
    description: 'Гарантируем точность измерений в соответствии с ГОСТ и международными стандартами'
  },
  {
    icon: '🛡️',
    title: 'Надежность',
    description: 'Проверенные временем решения с гарантией качества и техподдержкой'
  }
];

const solutions = [
  {
    title: 'Измерительное оборудование',
    description: 'Широкий спектр приборов для измерения электрических параметров',
    image: '/images/products/avem-4 (1).png',
    link: '/products?category=measuring',
    categoryId: 'measuring'
  },
  {
    title: 'Испытательные стенды',
    description: 'Комплексные решения для тестирования электрооборудования',
    image: '/images/products/ливс.jpg',
    link: '/products?category=testing',
    categoryId: 'testing'
  },
  {
    title: 'Диагностика двигателей',
    description: 'Комплексный стенд проверки асинхронных двигателей (КСПАД)',
    image: '/images/products/kspad (1).jpg',
    link: '/products?category=testing&subcategory=diagnostic',
    categoryId: 'testing'
  },
  {
    title: 'Диагностика трансформаторов',
    description: 'Комплексные решения для проверки и испытания трансформаторов',
    image: '/images/products/КСПЭМ1000jpg.jpg',
    link: '/products?category=testing&subcategory=transformer-testing',
    categoryId: 'testing'
  },
  {
    title: 'Нагрузочные устройства',
    description: 'Оборудование для проведения нагрузочных испытаний',
    image: '/images/products/unm-1750 (1).jpg',
    link: '/products?category=load-devices',
    categoryId: 'load-devices'
  },
  {
    title: 'Системы управления и мониторинга',
    description: 'Автоматизированные системы управления технологическими процессами',
    image: '/images/products/sum-1 (1).jpg',
    link: '/products?category=automation',
    categoryId: 'automation'
  }
];

export default function Home() {
  const router = useRouter();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const currentScale = window.innerWidth / document.documentElement.clientWidth;
      setScale(currentScale);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Инициализация при первом рендере

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      // Если нажат Ctrl или Cmd, открываем в новой вкладке
      window.open(link, '_blank');
      return;
    }
    router.push(link).then(() => {
      // Прокручиваем к началу страницы после перехода
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[100vh] md:h-[60vh] md:min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <HeroCarousel />
        </div>

        <div className="container mx-auto px-2 sm:px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
              Инновационные решения для электротехнической промышленности
            </h1>
            <p className="text-base xs:text-lg sm:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8">
              Разрабатываем и производим современное оборудование для тестирования и диагностики электрических агрегатов любой сложности
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-sm xs:text-base w-full xs:w-auto px-4 py-2 sm:px-6 sm:py-3"
                onClick={(e) => handleCardClick(e, '/products')}
              >
                <Link href="/products" onClick={(e) => e.preventDefault()}>Наша продукция</Link>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 text-sm xs:text-base w-full xs:w-auto px-4 py-2 sm:px-6 sm:py-3"
                onClick={(e) => handleCardClick(e, '/contacts')}
              >
                <Link href="/contacts" onClick={(e) => e.preventDefault()}>Связаться с нами</Link>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Ключевые направления</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Предлагаем комплексные решения для различных отраслей промышленности
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {solutions.map((solution, index) => (
              <Link 
                key={index}
                href={solution.link}
                onClick={(e) => handleCardClick(e, solution.link)}
                className="block group"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-64">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                    <p className="text-gray-200 mb-4">{solution.description}</p>
                    <span className="inline-flex items-center text-primary-300 group-hover:text-primary-200">
                      Подробнее
                      <svg
                        className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Популярные продукты</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ознакомьтесь с нашими передовыми решениями для измерения и диагностики
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Link 
                key={product.id}
                href="/products"
                onClick={(e) => handleCardClick(e, '/products')}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain p-4"
                    />
                    <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              href="/products"
              onClick={(e) => handleCardClick(e, '/products')}
              className="btn-secondary inline-flex items-center"
            >
              Смотреть все продукты
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-2 sm:px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
          >
            Наши преимущества
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
} 