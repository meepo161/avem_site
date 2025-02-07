import React from 'react';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Client {
  name: string;
  image: string;
}

const AboutPage = () => {
  const clients: Client[] = [
    {
      name: 'ООО филиал «АББ Электроинжиниринг»',
      image: '/images/clients/abb.jpg'
    },
    {
      name: 'ОАО «ИНТЕР РАО-Электрогенерация» (филиал «Ивановские ПГУ»)',
      image: '/images/clients/interrao.png'
    },
    {
      name: '«ПК «Новочеркасский Электровозостроительный Завод» («НЭВЗ»)',
      image: '/images/clients/NVZ.jpg'
    },
    {
      name: 'АО «Атомтехэнерго» для Белорусской АЭС',
      image: '/images/clients/atech.jpg'
    },
    {
      name: 'ОАО «Сургутнефтегаз»',
      image: '/images/clients/surgutneftegas.png'
    },
    {
      name: 'ОАО «Оренбургская Теплогенерирующая компания» Сакмарская ТЭЦ',
      image: '/images/clients/orenburg.png'
    },
    {
      name: 'ООО «Тольяттинский Трансформатор»',
      image: '/images/clients/tt.png'
    },
    {
      name: 'АО «Авиаремонтный завод № 405»',
      image: '/images/clients/arz404.jpg'
    },
    {
      name: 'РОССЕТИ Филиала ПАО "Ленэнерго" "Санкт-Петербургские высоковольтные электрические сети"',
      image: '/images/clients/lenenergo.png'
    },
    {
      name: 'РОССЕТИ Филиал ПАО «МРСК Северо-Запада» «Карелэнерго»',
      image: '/images/clients/karelenergo.mrsksevzap.png'
    },
    {
      name: 'АО «Ковдорский ГОК» «ЕвроХим»',
      image: '/images/clients/kovdor.jpg'
    },
    {
      name: 'ОАО «Энергетический институт им. Г.М. Кржижановского» (ОАО «ЭНИН»)',
      image: '/images/clients/ENIN.jpg'
    },
    {
      name: 'ПАО «Юнипро» Сургутская ГРЭС-2',
      image: '/images/clients/unipro.png'
    },
    {
      name: 'ООО «Транснефть-Балтика»',
      image: '/images/clients/transneft-baltika.png'
    },
    {
      name: 'ООО «СВЭЛ-Измерительные трансформаторы»',
      image: '/images/clients/SVEL.jpg'
    },
    {
      name: 'ОАО «Томскгазпром»',
      image: '/images/clients/tomskgazprom.jpg'
    },
    {
      name: 'ООО НПП «Электромаш»',
      image: '/images/clients/electromash.jpg'
    },
    {
      name: 'АО «Концерн Росэнергоатом» «Белоярская Атомная Станция»',
      image: '/images/clients/rosenergoatom.png'
    },
    {
      name: 'ООО «Хувдянь-Тенинская ТЭЦ»',
      image: '/images/clients/ht-tpp.jpg'
    },
    {
      name: 'ООО «Судостроительный завод «ЗАЛИВ»',
      image: '/images/clients/zaliv.png'
    },
    {
      name: 'Муниципальное унитарное предприятие г.Ижевска «Ижевские электрические сети»',
      image: '/images/clients/Elektr.seti.jpg'
    },
    {
      name: 'ООО «Трансформатор сервис»',
      image: '/images/clients/transformator_service.jpg'
    },
    {
      name: 'ОАО «Магнитогорский металлургический комбинат»',
      image: '/images/clients/mmk.gif'
    },
    {
      name: 'ООО «Дивитай»',
      image: '/images/clients/divitai.jpg'
    },
    {
      name: 'ОАО «Самарский Трансформатор»',
      image: '/images/clients/samara.png'
    },
    {
      name: 'СП ОАО «Чирчикский трансформаторный завод»',
      image: '/images/clients/chtz.jpg'
    },
    {
      name: 'ОАО «Авиаагрегат»',
      image: '/images/clients/aviaagregat.jpg'
    },
    {
      name: 'ГЭП «Вологдаоблкоммун-энерго»',
      image: '/images/clients/vologda.jpg'
    },
    {
      name: 'ООО «Электрофизика»',
      image: '/images/clients/electrofizika.png'
    },
    {
      name: 'ООО «Электронприбор»',
      image: '/images/clients/electronpribor.gif'
    },
    {
      name: 'ООО «Завод трансформаторов и магнитопроводов»',
      image: '/images/clients/ZTM.jpg'
    },
    {
      name: 'ООО «ПО «Энергоспецтехника»',
      image: '/images/clients/esteh.png'
    },
    {
      name: 'ООО ТЭЦ «Энергогарант» для нужд Белоярской АЭС',
      image: '/images/clients/energogarant.jpg'
    },
    {
      name: 'ОАО «КОНАР»',
      image: '/images/clients/konar.gif'
    },
    {
      name: 'ООО «Интеграл»',
      image: '/images/clients/intg.png'
    },
    {
      name: 'ООО «Технология»',
      image: '/images/clients/tehnologia.gif'
    },
    {
      name: 'ООО «Альфаэльторг»',
      image: '/images/clients/alfaeltorg.jpg'
    },
    {
      name: 'ООО «Тибер»',
      image: '/images/clients/tiber.jpg'
    },
    {
      name: 'ГК «Оптикэнерго»',
      image: '/images/clients/optikenergo.jpg'
    },
    {
      name: 'ОАО «Свердловский завод трансформаторов тока»',
      image: '/images/clients/cztt.jpg'
    },
    {
      name: 'ООО «ФинОптима»',
      image: '/images/clients/finoptima.jpg'
    },
    {
      name: 'ООО «Саратовский электротехнический завод»',
      image: '/images/clients/elektroteh.jpg'
    },
    {
      name: 'ООО «СДС»',
      image: '/images/clients/sds.jpg'
    },
    {
      name: 'ООО «Нуклин»',
      image: '/images/clients/nuclin.png'
    },
    {
      name: 'АО «ОМК»',
      image: '/images/clients/OMK.jpg'
    },
    {
      name: 'ООО «Генборг»',
      image: '/images/clients/genborg.png'
    },
    {
      name: 'ООО «КЗ «Ростсельмаш»',
      image: '/images/clients/rostselmash.png'
    },
    {
      name: 'ООО «СП-Сервис»',
      image: '/images/clients/sp-service.jpg'
    },
    {
      name: 'ГУП «Петербургский метрополитен»',
      image: '/images/clients/metropoliten.gif'
    },
    {
      name: 'АО «ПРОМТЕХ-Дубна»',
      image: '/images/clients/promtech-dubna.png'
    },
    {
      name: 'ООО «ИНК»',
      image: '/images/clients/ink.gif'
    },
    {
      name: 'ООО «Экран-Энергия»',
      image: '/images/clients/ecran-energy.jpg'
    },
    {
      name: 'ГАУ «ЦЭАТ РТ»',
      image: '/images/clients/test.tatarstan.png'
    },
    {
      name: 'ООО «Сибкомплектмонтаж»',
      image: '/images/clients/sibkom.tomsk.jpg'
    },
    {
      name: 'ООО «СтартАтом»',
      image: '/images/clients/startatom.jpg'
    },
    {
      name: 'ОАО «Чирчикский трансформаторный завод»',
      image: '/images/clients/chirt.png'
    },
    {
      name: 'АО «НПК «Антей»',
      image: '/images/clients/antey.jpg'
    },
    {
      name: 'ООО «Электросварка»',
      image: '/images/clients/Ele_trosvarka.jpg'
    },
    {
      name: 'ООО «Энергопрогресс»',
      image: '/images/clients/eprog.png'
    },
    {
      name: 'ФГБУ «ВНИИЗЖ»',
      image: '/images/clients/arriah.jpg'
    },
    {
      name: 'ТОО «Ken Aimak Trade»',
      image: '/images/clients/ken_aimak_trade.jpg'
    },
    {
      name: 'ООО «Интертехэнерго»',
      image: '/images/clients/itertehenergo.png'
    },
    {
      name: 'ООО «ВТ-Энерго»',
      image: '/images/clients/vt-energo.png'
    },
    {
      name: 'ООО «Корнет-Электро»',
      image: '/images/clients/cornet-electro.png'
    },
    {
      name: 'ООО «НАРП»',
      image: '/images/clients/narp.gif'
    },
    {
      name: 'ОАО «ААК «ПРОГРЕСС»',
      image: '/images/clients/progress_aak_.jpg'
    },
    {
      name: 'ПАО «Агрегат»',
      image: '/images/clients/agregat.jpg'
    }
  ];

  const advantages = [
    {
      icon: '🤝',
      title: 'Надёжные партнёрские отношения',
      description: 'Прочные профессиональные связи с предприятиями в России и странах СНГ'
    },
    {
      icon: '📈',
      title: 'Постоянное развитие',
      description: 'Непрерывно расширяем спектр оборудования и услуг'
    },
    {
      icon: '💎',
      title: 'Гибкая ценовая политика',
      description: 'Индивидуальный подход к каждому клиенту'
    },
    {
      icon: '👨‍💼',
      title: 'Профессиональная консультация',
      description: 'Высококвалифицированные специалисты помогут подобрать оптимальное решение'
    },
    {
      icon: '🔧',
      title: 'Индивидуальный подход',
      description: 'Разработка персональных схем модернизации производства'
    }
  ];

  return (
    <Layout>
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
            <h1 className="text-5xl font-bold mb-6">О компании</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Более 20 лет опыта в разработке и производстве инновационного оборудования 
              для электротехнической промышленности
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="prose max-w-none">
              <div className="bg-gradient-to-r from-primary-50 to-white p-8 rounded-2xl mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Группа компаний ООО НПП "АВЭМ" и ООО "Авиаагрегат-Н"
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Сегодня мы - это современное предприятие, специализирующееся на разработке 
                  и производстве диагностического и испытательного оборудования. Наша компания 
                  успешно работает на рынке более 20 лет, постоянно совершенствуя технологии 
                  и расширяя ассортимент продукции.
                </p>
              </div>

              {/* Преимущества */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {advantages.map((advantage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="text-4xl mb-4">{advantage.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">{advantage.title}</h3>
                    <p className="text-gray-600">{advantage.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Дополнительная информация */}
              <div className="bg-gray-50 p-8 rounded-2xl mb-16">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Наша экспертиза
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Имея полное представление о технологических и производственных процессах,
                  мы эффективно решаем вопросы материально-технического обеспечения наших клиентов,
                  поставляя диагностические и испытательные стенды, а также установки
                  испытательного электрооборудования.
                </p>
                <p className="text-lg font-medium text-primary-600">
                  Все это позволит Вам получить оптимальное предложение с учетом специфики
                  Вашего предприятия.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Клиенты */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Нам доверяют</h2>
            <p className="text-xl text-gray-600">
              Ведущие предприятия России и стран СНГ выбирают нас
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-24 mb-3">
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 text-center">
                  {client.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8">Свяжитесь с нами</h2>
            <p className="text-xl text-gray-600 mb-8">
              Готовы обсудить ваш проект и предложить оптимальное решение
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-primary-700 transition-colors"
              onClick={() => window.location.href = '/contacts'}
            >
              Связаться с нами
            </motion.button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage; 