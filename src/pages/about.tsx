import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import HeroBackground from '@/components/HeroBackground';
import { useRef, useEffect, useState } from 'react';

// Компонент анимированного счетчика
const AnimatedCounter = ({ end, duration = 2, title }: { end: number, duration?: number, title: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.min(Math.floor(end * progress), end));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, end, duration]);

  return (
    <motion.div 
      ref={ref}
      className="text-center p-4 bg-white/50 rounded-lg"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-3xl font-bold text-primary-600 mb-2">
        {count}+
      </div>
      <div className="text-gray-600">{title}</div>
    </motion.div>
  );
};

interface Client {
  name: string;
  image: string;
  bgColor: string;
}

const AboutPage = () => {
  const clients: Client[] = [
    {
      name: 'ООО филиал «АББ Электроинжиниринг»',
      image: '/images/clients/abb.jpg',
      bgColor: 'bg-red-50'
    },
    {
      name: 'ОАО «ИНТЕР РАО-Электрогенерация» (филиал «Ивановские ПГУ»)',
      image: '/images/clients/interrao.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: '«ПК «Новочеркасский Электровозостроительный Завод» («НЭВЗ»)',
      image: '/images/clients/NVZ.jpg',
      bgColor: 'bg-slate-50'
    },
    {
      name: 'АО «Атомтехэнерго» для Белорусской АЭС',
      image: '/images/clients/atech.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ОАО «Сургутнефтегаз»',
      image: '/images/clients/surgutneftegas.png',
      bgColor: 'bg-orange-50'
    },
    {
      name: 'ОАО «Оренбургская Теплогенерирующая компания» Сакмарская ТЭЦ',
      image: '/images/clients/orenburg.png',
      bgColor: 'bg-orange-50'
    },
    {
      name: 'ООО «Тольяттинский Трансформатор»',
      image: '/images/clients/tt.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'АО «Авиаремонтный завод № 405»',
      image: '/images/clients/arz404.jpg',
      bgColor: 'bg-sky-50'
    },
    {
      name: 'РОССЕТИ Филиала ПАО "Ленэнерго" "Санкт-Петербургские высоковольтные электрические сети"',
      image: '/images/clients/lenenergo.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'РОССЕТИ Филиал ПАО «МРСК Северо-Запада» «Карелэнерго»',
      image: '/images/clients/karelenergo.mrsksevzap.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'АО «Ковдорский ГОК» «ЕвроХим»',
      image: '/images/clients/kovdor.jpg',
      bgColor: 'bg-green-50'
    },
    {
      name: 'ОАО «Энергетический институт им. Г.М. Кржижановского» (ОАО «ЭНИН»)',
      image: '/images/clients/ENIN.jpg',
      bgColor: 'bg-indigo-50'
    },
    {
      name: 'ПАО «Юнипро» Сургутская ГРЭС-2',
      image: '/images/clients/unipro.png',
      bgColor: 'bg-red-50'
    },
    {
      name: 'ООО «Транснефть-Балтика»',
      image: '/images/clients/transneft-baltika.png',
      bgColor: 'bg-red-50'
    },
    {
      name: 'ООО «СВЭЛ-Измерительные трансформаторы»',
      image: '/images/clients/SVEL.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ОАО «Томскгазпром»',
      image: '/images/clients/tomskgazprom.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО НПП «Электромаш»',
      image: '/images/clients/electromash.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'АО «Концерн Росэнергоатом» «Белоярская Атомная Станция»',
      image: '/images/clients/rosenergoatom.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Хувдянь-Тенинская ТЭЦ»',
      image: '/images/clients/ht-tpp.jpg',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'ООО «Судостроительный завод «ЗАЛИВ»',
      image: '/images/clients/zaliv.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Муниципальное унитарное предприятие г.Ижевска «Ижевские электрические сети»',
      image: '/images/clients/Elektr.seti.jpg',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'ООО «Трансформатор сервис»',
      image: '/images/clients/transformator_service.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ОАО «Магнитогорский металлургический комбинат»',
      image: '/images/clients/mmk.gif',
      bgColor: 'bg-orange-50'
    },
    {
      name: 'ООО «Дивитай»',
      image: '/images/clients/divitai.jpg',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'ОАО «Самарский Трансформатор»',
      image: '/images/clients/samara.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'СП ОАО «Чирчикский трансформаторный завод»',
      image: '/images/clients/chtz.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ОАО «Авиаагрегат»',
      image: '/images/clients/agregat.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ГЭП «Вологдаоблкоммун-энерго»',
      image: '/images/clients/vologda.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Электрофизика»',
      image: '/images/clients/electrofizika.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Электронприбор»',
      image: '/images/clients/electronpribor.gif',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Завод трансформаторов и магнитопроводов»',
      image: '/images/clients/ZTM.jpg',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'ООО «ПО «Энергоспецтехника»',
      image: '/images/clients/esteh.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО ТЭЦ «Энергогарант» для нужд Белоярской АЭС',
      image: '/images/clients/energogarant.jpg',
      bgColor: 'bg-green-50'
    },
    {
      name: 'ОАО «КОНАР»',
      image: '/images/clients/konar.gif',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Интеграл»',
      image: '/images/clients/intg.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Технология»',
      image: '/images/clients/tehnologia.gif',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'ООО «Альфаэльторг»',
      image: '/images/clients/alfaeltorg.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Тибер»',
      image: '/images/clients/tiber.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ГК «Оптикэнерго»',
      image: '/images/clients/optikenergo.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ОАО «Свердловский завод трансформаторов тока»',
      image: '/images/clients/cztt.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «ФинОптима»',
      image: '/images/clients/finoptima.jpg',
      bgColor: 'bg-green-50'
    },
    {
      name: 'ООО «Саратовский электротехнический завод»',
      image: '/images/clients/elektroteh.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «СДС»',
      image: '/images/clients/sds.jpg',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'ООО «Нуклин»',
      image: '/images/clients/nuclin.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'АО «ОМК»',
      image: '/images/clients/OMK.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Генборг»',
      image: '/images/clients/genborg.png',
      bgColor: 'bg-red-50'
    },
    {
      name: 'ООО «КЗ «Ростсельмаш»',
      image: '/images/clients/rostselmash.png',
      bgColor: 'bg-red-50'
    },
    {
      name: 'ООО «СП-Сервис»',
      image: '/images/clients/sp-service.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ГУП «Петербургский метрополитен»',
      image: '/images/clients/metropoliten.gif',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'АО «ПРОМТЕХ-Дубна»',
      image: '/images/clients/promtech-dubna.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «ИНК»',
      image: '/images/clients/ink.gif',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Экран-Энергия»',
      image: '/images/clients/ecran-energy.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ГАУ «ЦЭАТ РТ»',
      image: '/images/clients/test.tatarstan.png',
      bgColor: 'bg-green-50'
    },
    {
      name: 'ООО «Сибкомплектмонтаж»',
      image: '/images/clients/sibkom.tomsk.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «СтартАтом»',
      image: '/images/clients/startatom.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ЧИПС ФЛ ФГБОУ ВО «УРГУПС» Челябинский институт путей сообщения',
      image: '/images/clients/chirt.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'АО «НПК «Антей»',
      image: '/images/clients/antey.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Электросварка»',
      image: '/images/clients/Ele_trosvarka.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Энергопрогресс»',
      image: '/images/clients/eprog.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ФГБУ «ВНИИЗЖ»',
      image: '/images/clients/arriah.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ТОО «Ken Aimak Trade»',
      image: '/images/clients/ken_aimak_trade.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Интертехэнерго»',
      image: '/images/clients/itertehenergo.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «ВТ-Энерго»',
      image: '/images/clients/vt-energo.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «Корнет-Электро»',
      image: '/images/clients/cornet-electro.png',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ООО «НАРП»',
      image: '/images/clients/narp.gif',
      bgColor: 'bg-gray-50'
    },
    {
      name: 'ОАО «ААК «ПРОГРЕСС»',
      image: '/images/clients/progress_aak_.jpg',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'ПАО «Агрегат»',
      image: '/images/clients/agregat.jpg',
      bgColor: 'bg-blue-50'
    }
  ];

  const companyImages = [
    '/images/about/company1.jpg',
    '/images/about/production.jpg',
    '/images/about/lab.jpg',
    '/images/about/team.jpg',
  ];

  return (
    <Layout>
      {/* Hero секция */}
      <section className="relative h-[40vh] md:min-h-[300px] flex items-center">
        <div className="absolute inset-0 z-0">
          <HeroBackground image="/images/products/kspem (7).jpg" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            О компании
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80"
          >
            Ваш надежный партнер в области промышленного оборудования
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="prose max-w-none">
              <div className="bg-gradient-to-r from-primary-50 to-white p-8 rounded-2xl mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  ООО "Авиаагрегат-Н"
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Сегодня мы - это современное предприятие, специализирующееся на разработке 
                  и производстве диагностического и испытательного оборудования. Наша компания 
                  успешно работает на рынке более 20 лет, постоянно совершенствуя технологии 
                  и расширяя ассортимент продукции.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                  <AnimatedCounter end={26} title="лет на рынке" />
                  <AnimatedCounter end={1500} title="клиентов" />
                  <AnimatedCounter end={100} title="продуктов" />
                  <AnimatedCounter end={50} title="патентов" />
                </div>
              </div>

              {/* Галерея */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Наше производство</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {companyImages.map((image, index) => (
                    <motion.div
                      key={index}
                      className="relative h-64 rounded-lg overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Image
                        src={image}
                        alt="Производство Авиаагрегат-Н"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Направления деятельности */}
              <div className="bg-gradient-to-br from-primary-50 via-white to-gray-50 p-8 rounded-2xl mb-16 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                  Направления деятельности
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/70 p-6 rounded-xl border border-primary-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Разработка оборудования</h3>
                    </div>
                    <p className="text-gray-600">
                      Создаем инновационные решения для диагностики и испытаний электрооборудования с учетом специфики каждого заказчика
                    </p>
                  </div>

                  <div className="bg-white/70 p-6 rounded-xl border border-primary-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Производство</h3>
                    </div>
                    <p className="text-gray-600">
                      Собственное производство полного цикла с использованием современных технологий и комплектующих
                    </p>
                  </div>

                  <div className="bg-white/70 p-6 rounded-xl border border-primary-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Разработка ПО</h3>
                    </div>
                    <p className="text-gray-600">
                      Создаем специализированное программное обеспечение для управления и автоматизации испытательных процессов
                    </p>
                  </div>

                  <div className="bg-white/70 p-6 rounded-xl border border-primary-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">Техническая поддержка</h3>
                    </div>
                    <p className="text-gray-600">
                      Обеспечиваем полное сопровождение оборудования: от пусконаладки до сервисного обслуживания
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Улучшенная секция контактов */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Готовы к сотрудничеству?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Наши специалисты готовы обсудить ваш проект и предложить оптимальное решение для вашего предприятия
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contacts"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Связаться с нами
              </motion.a>
              <motion.a
                href="mailto:sales@avem.ru"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Написать письмо
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Клиенты с улучшенным дизайном */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Нам доверяют</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ведущие предприятия России и стран СНГ выбирают нас для решения своих задач
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col min-h-[180px]">
                  <div className="relative h-24 mb-3 flex-shrink-0">
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="text-center mt-auto flex-grow">
                    <p className="text-sm text-gray-700 group-hover:text-primary-600 transition-colors break-words hyphens-auto">
                      {client.name}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default AboutPage; 