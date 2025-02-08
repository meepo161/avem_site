import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const router = useRouter();
  
  const handleSupportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/contacts').then(() => {
      setTimeout(() => {
        const emailSection = document.getElementById('email-section');
        if (emailSection) {
          const windowHeight = window.innerHeight;
          const sectionRect = emailSection.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetScroll = scrollTop + sectionRect.top - (windowHeight - sectionRect.height) / 2;
          
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
          
          // Добавляем подсветку секции
          emailSection.classList.add('ring-4', 'ring-primary-400', 'ring-opacity-50');
          setTimeout(() => {
            emailSection.classList.remove('ring-4', 'ring-primary-400', 'ring-opacity-50');
          }, 2000);
        }
      }, 500); // Даем время для загрузки страницы
    });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/icon.ico"
                  width={48}
                  height={48}
                  alt="Авиаагрегат-Н Logo"
                  className="rounded-sm"
                />
              </div>
              <h3 className="text-xl font-bold">Авиаагрегат-Н</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Разработка и производство оборудования для тестирования и диагностики электрических агрегатов любой сложности
            </p>
            <div className="space-y-2 text-gray-400">
              <p>ИНН: 6658220019</p>
              <p>ОГРН: 1056601773617</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Продукция</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products#measuring" className="text-gray-400 hover:text-white">
                  Измерительные приборы
                </Link>
              </li>
              <li>
                <Link href="/products#testing" className="text-gray-400 hover:text-white">
                  Испытательные стенды
                </Link>
              </li>
              <li>
                <Link href="/products#automation" className="text-gray-400 hover:text-white">
                  Системы автоматизации
                </Link>
              </li>
              <li>
                <Link href="/products#software" className="text-gray-400 hover:text-white">
                  Программное обеспечение
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>346411 Ростовская обл., г. Новочеркасск ул. 26 Бакинских комиссаров, 11В</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex flex-col">
                  <span>+7 (8635) 29-92-37</span>
                  <span>+7 (8635) 26-07-82</span>
                  <span className="flex items-center gap-1">
                    <span className="text-primary-400">Маркетинг:</span>
                    <span>+7-950-856-28-87</span>
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <div className="flex items-center gap-2 group">
                  <motion.a
                    href="mailto:sales@avem.ru"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-primary-600 transition-colors"
                    title="Написать на sales@avem.ru"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.a>
                  <span className="group-hover:text-primary-400 transition-colors">sales@avem.ru</span>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Пн-Пт: 8:30 - 17:20</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Информация</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/certificates" className="text-gray-400 hover:text-white">
                  Сертификаты
                </Link>
              </li>
              <li>
                <Link 
                  href="/contacts" 
                  onClick={handleSupportClick}
                  className="text-gray-400 hover:text-white"
                >
                  Техподдержка
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Авиаагрегат-Н. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 