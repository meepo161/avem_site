import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import Script from 'next/script';
import HeroBackground from '@/components/HeroBackground';

declare global {
  interface Window {
    ymaps?: any;
  }
}

const ContactsPage = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  
  const handleCopyEmail = (email: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    });
  };

  const mainContacts = {
    address: '346411 Ростовская обл., г. Новочеркасск, ул.26 Бакинских комиссаров, 11В',
    fullAddress: '346411, Ростовская обл., г. Новочеркасск, ул.26 Бакинских комиссаров, 11в, ООО "Авиаагрегат-Н"',
    phones: [
      '+7 (8635) 26-04-55',
      '+7 (8635) 29-92-37',
      '+7 (8635) 26-07-82'
    ],
    marketing: '+7-950-856-28-87',
    emails: {
      support: 'support@avem.ru',
      sales: 'sales@avem.ru',
      supply: 'supply@avem.ru',
      it: 'itsector@avem.ru',
      engineering: 'ogk@avem.ru'
    }
  };

  const contactImages = [
    '/images/contacts/office.jpg',
    '/images/contacts/building.jpg',
    '/images/contacts/entrance.jpg',
    '/images/contacts/reception.jpg',
  ];

  useEffect(() => {
    // Функция инициализации карты
    const initMap = () => {
      if (typeof window !== 'undefined' && window.ymaps) {
        window.ymaps.ready(() => {
          try {
            const map = new window.ymaps.Map('map', {
              center: [47.429230, 40.069250],
              zoom: 13
            });

            const placemark = new window.ymaps.Placemark([47.429230, 40.069250], {
              balloonContent: 'ООО "Авиаагрегат-Н"',
              balloonContentHeader: 'Авиаагрегат-Н',
              balloonContentBody: 'ул. 26 Бакинских комиссаров, 11В',
              hintContent: 'Авиаагрегат-Н'
            }, {
              preset: 'islands#blueFactory'
            });

            map.geoObjects.add(placemark);
            map.controls.remove('trafficControl');
            map.controls.remove('typeSelector');
            map.controls.remove('fullscreenControl');
            map.behaviors.disable('scrollZoom');
          } catch (error) {
            console.error('Ошибка при инициализации карты:', error);
          }
        });
      }
    };

    // Проверяем, загружен ли уже API
    if (window.ymaps) {
      initMap();
    } else {
      // Если API еще не загружен, ждем его загрузки
      const checkYmaps = setInterval(() => {
        if (window.ymaps) {
          initMap();
          clearInterval(checkYmaps);
        }
      }, 100);

      // Очистка интервала при размонтировании компонента
      return () => clearInterval(checkYmaps);
    }
  }, []); // Пустой массив зависимостей, чтобы эффект выполнился только один раз

  return (
    <Layout>
      <Script 
        src="https://api-maps.yandex.ru/2.1/?apikey=2e5653c0-ce72-4a18-8589-53f97889bf2e&lang=ru_RU" 
        strategy="lazyOnload"
      />

      {/* Hero секция */}
      <section className="relative h-[40vh] md:min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <HeroBackground image="/images/hero-bg.jpg" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6 text-white">
              Контакты
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Свяжитесь с нами для получения дополнительной информации о продукции, 
              технической поддержке или сотрудничестве
            </p>
            <motion.a
              href="mailto:sales@avem.ru"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Связаться с нами
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Основной контент */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto">
            {/* Основные контакты */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Центральный офис</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div className="font-medium mb-2">Фактический адрес:</div>
                    <div className="text-gray-600">{mainContacts.address}</div>
                    <div className="font-medium mt-4 mb-2">Почтовый адрес:</div>
                    <div className="text-gray-600">{mainContacts.fullAddress}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="space-y-1">
                      {mainContacts.phones.map((phone, index) => (
                        <div key={index} className="text-gray-600">{phone}</div>
                      ))}
                    </div>
                    <div className="mt-2">
                      <span className="text-primary-600">Маркетинг: </span>
                      <span className="text-gray-600">{mainContacts.marketing}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div id="email-section" className="w-full transition-all duration-300">
                    <div className="font-semibold mb-4">Электронная почта:</div>
                    <div className="flex flex-col gap-3">
                      <motion.a
                        href={`mailto:${mainContacts.emails.support}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 px-3 bg-white border border-gray-200 rounded-lg hover:border-primary-400 hover:shadow-md transition-all group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span className="text-sm text-gray-500">Техподдержка</span>
                          <span className="text-primary-600 group-hover:text-primary-700 select-text break-all">{mainContacts.emails.support}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <motion.button
                            onClick={(e) => handleCopyEmail(mainContacts.emails.support, e)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 hover:bg-primary-100 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Копировать email"
                          >
                            {copiedEmail === mainContacts.emails.support ? (
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                            )}
                          </motion.button>
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors"
                            title="Отправить email">
                            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </motion.a>

                      <motion.a
                        href={`mailto:${mainContacts.emails.sales}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 px-3 bg-white border border-gray-200 rounded-lg hover:border-primary-400 hover:shadow-md transition-all group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span className="text-sm text-gray-500">Отдел продаж</span>
                          <span className="text-primary-600 group-hover:text-primary-700 select-text break-all">{mainContacts.emails.sales}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <motion.button
                            onClick={(e) => handleCopyEmail(mainContacts.emails.sales, e)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 hover:bg-primary-100 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Копировать email"
                          >
                            {copiedEmail === mainContacts.emails.sales ? (
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                            )}
                          </motion.button>
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors"
                            title="Отправить email">
                            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </motion.a>

                      <motion.a
                        href={`mailto:${mainContacts.emails.supply}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 px-3 bg-white border border-gray-200 rounded-lg hover:border-primary-400 hover:shadow-md transition-all group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span className="text-sm text-gray-500">Отдел снабжения</span>
                          <span className="text-primary-600 group-hover:text-primary-700 select-text break-all">{mainContacts.emails.supply}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <motion.button
                            onClick={(e) => handleCopyEmail(mainContacts.emails.supply, e)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 hover:bg-primary-100 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Копировать email"
                          >
                            {copiedEmail === mainContacts.emails.supply ? (
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                            )}
                          </motion.button>
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors"
                            title="Отправить email">
                            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </motion.a>

                      <motion.a
                        href={`mailto:${mainContacts.emails.it}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 px-3 bg-white border border-gray-200 rounded-lg hover:border-primary-400 hover:shadow-md transition-all group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span className="text-sm text-gray-500">IT отдел</span>
                          <span className="text-primary-600 group-hover:text-primary-700 select-text break-all">{mainContacts.emails.it}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <motion.button
                            onClick={(e) => handleCopyEmail(mainContacts.emails.it, e)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 hover:bg-primary-100 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Копировать email"
                          >
                            {copiedEmail === mainContacts.emails.it ? (
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                            )}
                          </motion.button>
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors"
                            title="Отправить email">
                            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      </motion.a>

                      <motion.a
                        href={`mailto:${mainContacts.emails.engineering}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 px-3 bg-white border border-gray-200 rounded-lg hover:border-primary-400 hover:shadow-md transition-all group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <span className="text-sm text-gray-500">Конструкторский отдел</span>
                          <span className="text-primary-600 group-hover:text-primary-700 select-text break-all">{mainContacts.emails.engineering}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                          <motion.button
                            onClick={(e) => handleCopyEmail(mainContacts.emails.engineering, e)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 hover:bg-primary-100 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Копировать email"
                          >
                            {copiedEmail === mainContacts.emails.engineering ? (
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                              </svg>
                            )}
                          </motion.button>
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors"
                            title="Отправить email">
                            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                      </div>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Яндекс Карта */}
              <div className="mt-8">
                <div className="font-semibold mb-4">Как нас найти:</div>
                <div id="map" className="w-full h-[400px] rounded-lg overflow-hidden shadow-md"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default ContactsPage; 