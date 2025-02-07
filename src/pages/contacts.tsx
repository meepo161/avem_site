import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import Script from 'next/script';

declare global {
  interface Window {
    ymaps?: any;
  }
}

const ContactsPage = () => {
  const mainContacts = {
    address: '346411 Ростовская обл., г. Новочеркасск, ул.26 Бакинских комиссаров, 11В',
    fullAddress: '346411, Ростовская обл., г. Новочеркасск, ул.26 Бакинских комиссаров, 11в, Группа компаний ООО НПП "АВЭМ" и ООО "Авиаагрегат-Н"',
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
              balloonContent: 'ООО НПП "АВЭМ" и ООО "Авиаагрегат-Н"',
              balloonContentHeader: 'Группа компаний АВЭМ',
              balloonContentBody: 'ул. 26 Бакинских комиссаров, 11В',
              hintContent: 'АВЭМ и Авиаагрегат-Н'
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
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-900/20" />
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: 'url(/images/grid.svg)',
              backgroundRepeat: 'repeat',
              opacity: 0.1 
            }} 
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Контакты</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Свяжитесь с нами для получения дополнительной информации о продукции, 
              технической поддержке или сотрудничестве
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="font-semibold mb-2">Отделы:</div>
                      <div className="space-y-1 text-gray-600">
                        <div>Техподдержка: {mainContacts.emails.support}</div>
                        <div>Отдел продаж: {mainContacts.emails.sales}</div>
                        <div>Отдел снабжения: {mainContacts.emails.supply}</div>
                        <div>IT отдел: {mainContacts.emails.it}</div>
                        <div>Конструкторский отдел: {mainContacts.emails.engineering}</div>
                      </div>
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