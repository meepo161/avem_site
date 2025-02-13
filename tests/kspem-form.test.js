require('./setup');
const fetch = require('node-fetch');

// Устанавливаем переменные окружения напрямую
process.env.EMAIL_PASSWORD = 'jmbo gslo iuck sixo';

// Отладочная информация
console.log('Переменные окружения в тестах:', {
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  NEXT_PUBLIC_EMAIL_PASSWORD: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  allEnvKeys: Object.keys(process.env)
});

const sendForm = async (formData) => {
  try {
    console.log('\nОтправка формы...');
    console.log('Данные формы:', JSON.stringify(formData, null, 2));

    // Подготавливаем массивы для проверки
    const normsArray = formData.norms?.map(norm => ({ text: norm })) || [];
    console.log('\nПодготовленный массив нормативов:', JSON.stringify(normsArray, null, 2));

    const constructionFeaturesArray = formData.constructionFeatures?.map(feature => ({ text: feature })) || [];
    console.log('\nПодготовленный массив конструктивных особенностей:', JSON.stringify(constructionFeaturesArray, null, 2));

    const regulationMethodsArray = formData.regulationMethods?.map(method => ({ text: method })) || [];
    console.log('\nПодготовленный массив методов регулировки:', JSON.stringify(regulationMethodsArray, null, 2));

    const testsArray = formData.tests?.map(test => ({ text: test })) || [];
    console.log('\nПодготовленный массив тестов:', JSON.stringify(testsArray, null, 2));
    
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Форма успешно отправлена');
      return true;
    } else {
      console.error('❌ Ошибка при отправке формы');
      console.error('Статус:', response.status);
      console.error('Ответ сервера:', result);
      return false;
    }
  } catch (error) {
    console.error('❌ Ошибка при выполнении запроса:', error);
    return false;
  }
};

const maxFormData = {
  organization: 'ООО Тест',
  contactPerson: 'Иванов Иван Иванович',
  contactDetails: 'test@example.com, +7 999 999-99-99',
  organizationType: 'manufacturer',
  deliveryDate: new Date().toISOString().split('T')[0],
  productId: 'KSPEM',
  norms: [
    'ГОСТ 11828-86',
    'ГОСТ 53472-2009',
    'ГОСТ Р (МЭК 60034-1-2014)',
    'ГОСТ 7217-87',
    'ГОСТ 31606-2012',
    'ГОСТ Р (МЭК 60034-2-2009)',
    'ГОСТ 11929-87',
    'ГОСТ Р 51689-2000',
    'ГОСТ 10159-79',
    'ГОСТ 20815-93',
    'EN 60204-1',
    'ГОСТ 10169-77'
  ],
  constructionFeatures: [
    'На лапах',
    'Фланцевые',
    'На лапах с фланцем',
    'Вертикальные',
    'Конический вал',
    'Цилиндрический вал'
  ],
  kspemMachines: [
    {
      type: 'Асинхронные двигатели',
      power: '75',
      voltage: '380',
      speed: '1500',
      excitationUI: '220В, 5А'
    },
    {
      type: 'Асинхронные генераторы',
      power: '100',
      voltage: '400',
      speed: '1500',
      excitationUI: '220В, 7А'
    },
    {
      type: 'Синхронные двигатели',
      power: '1000',
      voltage: '6000',
      speed: '3000',
      excitationUI: '110В, 15А'
    },
    {
      type: 'Синхронные генераторы',
      power: '2000',
      voltage: '10000',
      speed: '3000',
      excitationUI: '110В, 20А'
    },
    {
      type: 'Двигатели постоянного тока',
      power: '45',
      voltage: '440',
      speed: '1000',
      excitationUI: '220В, 3А'
    },
    {
      type: 'Генераторы постоянного тока',
      power: '50',
      voltage: '440',
      speed: '1000',
      excitationUI: '220В, 4А'
    }
  ],
  regulationMethods: [
    'Плавный регулируемый',
    'Плавный нерегулируемый',
    'Ступенчатый',
    'Прямое включение в сеть'
  ],
  power: '150 кВт',
  area: '50 м²',
  mobile: 'Передвижной',
  accuracy: '0.1%',
  tests: [
    'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'Измерение сопротивления изоляции встроенных термодатчиков относительно корпуса и между обмотками',
    'Измерение сопротивления обмоток при постоянном токе в практически холодном состоянии',
    'Измерение сопротивления встроенных термодатчиков при постоянном токе в практически холодном состоянии',
    'Испытание электрической прочности изоляции обмотки относительно корпуса и между обмотками',
    'Испытание электрической прочности изоляции встроенных термодатчиков относительно корпуса и между обмотками',
    'Определение тока и потерь холостого хода с измерением скорости вращения',
    'Определение тока и потерь короткого замыкания',
    'Испытание электрической прочности междувитковой изоляции обмоток',
    'Проверка уровня вибрации',
    'Измерения температуры окружающей среды и частей электрической машины',
    'Обкатка на холостом ходу',
    'Проверка «беличьей клетки»',
    'Проверка встроенных датчиков вращения',
    'Определение коэффициента трансформации',
    'Испытания под нагрузкой',
    'Испытание на нагрев',
    'Определение КПД',
    'Определение коэффициента мощности',
    'Определение скольжения',
    'Испытание на кратковременную перегрузку по моменту',
    'Испытание на кратковременную перегрузку по току',
    'Определение максимального вращающего момента',
    'Определение минимального вращающего момента в процессе пуска',
    'Определение начального пускового вращающего момента',
    'Определение начального пускового тока',
    'Испытание при повышенной частоте вращения',
    'Проверка уровня шума',
    'Проверка работоспособности при изменении напряжения и частоты питающей сети',
    'Определения момента инерции вращающихся частей'
  ],
  additionalTests: 'Требуется полный комплекс обучения персонала, пусконаладочные работы, интеграция со SCADA-системой предприятия, расширенная гарантия на 3 года'
};

const minimalFormData = {
  organization: 'ИП Петров',
  contactPerson: 'Петров П.П.',
  contactDetails: 'petrov@mail.ru, +7 900 123-45-67',
  organizationType: 'customer',
  deliveryDate: new Date().toISOString().split('T')[0],
  productId: 'KSPEM',
  norms: ['ГОСТ 11828-86'],
  constructionFeatures: ['На лапах'],
  kspemMachines: [
    {
      type: 'Асинхронные двигатели',
      power: '15',
      voltage: '380',
      speed: '1500',
      excitationUI: 'Не требуется'
    }
  ],
  regulationMethods: ['Прямое включение в сеть'],
  power: '20 кВт',
  area: '20 м²',
  mobile: 'Стационарный',
  accuracy: '0.5%',
  tests: [
    'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'Испытание электрической прочности изоляции обмотки относительно корпуса и между обмотками'
  ]
};

const mediumAsyncFormData = {
  organization: 'АО Электромотор',
  contactPerson: 'Сидоров Алексей Иванович',
  contactDetails: 'sidorov@electromotor.ru, +7 495 555-77-88',
  organizationType: 'manufacturer',
  deliveryDate: new Date().toISOString().split('T')[0],
  productId: 'KSPEM',
  norms: [
    'ГОСТ 11828-86',
    'ГОСТ 7217-87',
    'ГОСТ Р 51689-2000'
  ],
  constructionFeatures: [
    'На лапах',
    'Фланцевые',
    'Вертикальные'
  ],
  kspemMachines: [
    {
      type: 'Асинхронные двигатели',
      power: '30',
      voltage: '380',
      speed: '1500',
      excitationUI: 'Не требуется'
    },
    {
      type: 'Асинхронные двигатели',
      power: '55',
      voltage: '380',
      speed: '3000',
      excitationUI: 'Не требуется'
    }
  ],
  regulationMethods: [
    'Плавный регулируемый',
    'Прямое включение в сеть'
  ],
  power: '60 кВт',
  area: '30 м²',
  mobile: 'Стационарный',
  accuracy: '0.2%',
  tests: [
    'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'Определение тока и потерь холостого хода с измерением скорости вращения',
    'Проверка уровня вибрации',
    'Испытания под нагрузкой',
    'Определение КПД'
  ]
};

const highVoltageFormData = {
  organization: 'ООО ВысокоВольтМаш',
  contactPerson: 'Кузнецов Владимир Петрович',
  contactDetails: 'kuznetsov@hvmash.ru, +7 812 999-00-11',
  organizationType: 'manufacturer',
  deliveryDate: new Date().toISOString().split('T')[0],
  productId: 'KSPEM',
  norms: [
    'ГОСТ 11828-86',
    'ГОСТ Р (МЭК 60034-1-2014)',
    'ГОСТ 10169-77',
    'EN 60204-1'
  ],
  constructionFeatures: [
    'На лапах с фланцем',
    'Цилиндрический вал'
  ],
  kspemMachines: [
    {
      type: 'Синхронные двигатели',
      power: '800',
      voltage: '6000',
      speed: '3000',
      excitationUI: '110В, 12А'
    },
    {
      type: 'Синхронные генераторы',
      power: '1500',
      voltage: '10000',
      speed: '3000',
      excitationUI: '110В, 18А'
    }
  ],
  regulationMethods: [
    'Плавный регулируемый',
    'Ступенчатый'
  ],
  power: '2000 кВт',
  area: '100 м²',
  mobile: 'Стационарный',
  accuracy: '0.1%',
  tests: [
    'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'Испытание электрической прочности изоляции обмотки относительно корпуса и между обмотками',
    'Определение тока и потерь холостого хода с измерением скорости вращения',
    'Испытание на нагрев',
    'Определение КПД',
    'Проверка уровня вибрации',
    'Проверка уровня шума'
  ]
};

const labFormData = {
  organization: 'НИИ Электротехники',
  contactPerson: 'Морозова Елена Сергеевна',
  contactDetails: 'morozova@niiel.ru, +7 383 222-33-44',
  organizationType: 'laboratory',
  deliveryDate: new Date().toISOString().split('T')[0],
  productId: 'KSPEM',
  norms: [
    'ГОСТ 11828-86',
    'ГОСТ 53472-2009',
    'ГОСТ 7217-87',
    'ГОСТ 31606-2012',
    'ГОСТ 20815-93'
  ],
  constructionFeatures: [
    'На лапах',
    'Фланцевые',
    'Вертикальные'
  ],
  kspemMachines: [
    {
      type: 'Асинхронные двигатели',
      power: '45',
      voltage: '380',
      speed: '1500',
      excitationUI: 'Не требуется'
    },
    {
      type: 'Синхронные двигатели',
      power: '200',
      voltage: '6000',
      speed: '3000',
      excitationUI: '110В, 8А'
    },
    {
      type: 'Двигатели постоянного тока',
      power: '30',
      voltage: '440',
      speed: '1000',
      excitationUI: '220В, 2А'
    }
  ],
  regulationMethods: [
    'Плавный регулируемый',
    'Ступенчатый',
    'Прямое включение в сеть'
  ],
  power: '250 кВт',
  area: '80 м²',
  mobile: 'Передвижной',
  accuracy: '0.05%',
  tests: [
    'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'Измерение сопротивления обмоток при постоянном токе в практически холодном состоянии',
    'Определение тока и потерь холостого хода с измерением скорости вращения',
    'Определение тока и потерь короткого замыкания',
    'Проверка уровня вибрации',
    'Испытания под нагрузкой',
    'Определение КПД',
    'Определение коэффициента мощности',
    'Проверка уровня шума',
    'Определения момента инерции вращающихся частей'
  ],
  additionalTests: 'Требуется калибровка измерительного оборудования, протоколы испытаний с метрологической аттестацией'
};

const runTest = async () => {
  console.log('Начало тестирования опросного листа КСПЭМ...\n');
  
  console.log('=== Тест 1: Минимальное заполнение опросного листа ===\n');
  let success = await sendForm(minimalFormData);
  console.log(`\nРезультат теста 1: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\n=== Тест 2: Среднее заполнение (асинхронные машины) ===\n');
  success = await sendForm(mediumAsyncFormData);
  console.log(`\nРезультат теста 2: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\n=== Тест 3: Высоковольтные машины ===\n');
  success = await sendForm(highVoltageFormData);
  console.log(`\nРезультат теста 3: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\n=== Тест 4: Испытательная лаборатория ===\n');
  success = await sendForm(labFormData);
  console.log(`\nРезультат теста 4: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\n=== Тест 5: Максимальное заполнение опросного листа ===\n');
  success = await sendForm(maxFormData);
  console.log(`\nРезультат теста 5: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\nТестирование завершено');
};

// Запускаем тест
runTest(); 