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

    // Добавляем идентификатор продукта
    formData.productId = 'KSPAD';

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
  organization: 'ООО Электромашиностроительный завод',
  contactPerson: 'Иванов Иван Иванович',
  contactDetails: 'ivanov@emz.ru, +7 495 123-45-67',
  deliveryDate: new Date().toISOString().split('T')[0],
  norms: [
    'ГОСТ 7217-87',
    'ГОСТ Р 51689-2000',
    'ГОСТ 11828-86',
    'ГОСТ 10169-77',
    'ГОСТ 11929-87',
    'ГОСТ 183-74',
    'ГОСТ IEC 60034-1-2014',
    'ГОСТ IEC 60034-2-1-2017'
  ],
  constructionFeatures: [
    'На лапах',
    'Фланцевые',
    'На лапах с фланцем',
    'Вертикальные',
    'С повышенным скольжением',
    'С фазным ротором',
    'С короткозамкнутым ротором',
    'Многоскоростные',
    'Встраиваемые',
    'С принудительным охлаждением'
  ],
  kspadMachines: [
    {
      type: 'Трехфазные с короткозамкнутым ротором',
      power: '75',
      voltage: '380',
      speed: '1500',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC411'
    },
    {
      type: 'Трехфазные с фазным ротором',
      power: '132',
      voltage: '380',
      speed: '1000',
      phaseRotor: 'фазный',
      coolingType: 'IC416'
    },
    {
      type: 'Однофазные конденсаторные',
      power: '2.2',
      voltage: '220',
      speed: '3000',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC411'
    }
  ],
  regulationMethods: [
    'Преобразователь частоты',
    'Изменение числа пар полюсов',
    'Реостатное регулирование',
    'Импульсное регулирование',
    'Прямой пуск',
    'Плавный пуск'
  ],
  power: '150 кВт',
  area: '80 м²',
  mobile: 'Стационарный',
  accuracy: '0.2%',
  tests: [
    'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'Испытание электрической прочности изоляции обмоток относительно корпуса и между обмотками',
    'Измерение сопротивления обмоток при постоянном токе в практически холодном состоянии',
    'Проверка правильности соединения выводных концов и обмоток',
    'Определение тока и потерь холостого хода',
    'Определение тока и потерь короткого замыкания',
    'Определение рабочих характеристик',
    'Определение КПД прямым методом',
    'Определение КПД косвенным методом',
    'Определение коэффициента мощности',
    'Определение скольжения',
    'Определение максимального и минимального вращающих моментов',
    'Определение начального пускового момента',
    'Определение начального пускового тока',
    'Определение динамического момента инерции ротора',
    'Определение механических потерь',
    'Определение добавочных потерь',
    'Испытание на нагревание',
    'Испытание при повышенной частоте вращения',
    'Определение вибрационных характеристик',
    'Определение уровня шума',
    'Проверка степени защиты',
    'Измерение сопротивления изоляции подшипников',
    'Измерение температуры подшипниковых узлов',
    'Проверка работы системы принудительного охлаждения',
    'Проверка датчиков температурной защиты',
    'Определение температуры обмоток и частей машины',
    'Испытание на устойчивость к механическим воздействиям',
    'Испытание на герметичность',
    'Проверка качества балансировки ротора'
  ],
  additionalTests: 'Требуется полный комплекс обучения персонала, пусконаладочные работы, интеграция со SCADA-системой предприятия'
};

const minimalFormData = {
  organization: 'ИП Сидоров',
  contactPerson: 'Сидоров С.С.',
  contactDetails: 'sidorov@mail.ru, +7 900 987-65-43',
  deliveryDate: new Date().toISOString().split('T')[0],
  norms: ['ГОСТ 7217-87'],
  constructionFeatures: ['На лапах'],
  kspadMachines: [
    {
      type: 'Трехфазные с короткозамкнутым ротором',
      power: '5.5',
      voltage: '380',
      speed: '1500',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC411'
    }
  ],
  regulationMethods: ['Прямой пуск'],
  power: '10 кВт',
  area: '15 м²',
  mobile: 'Стационарный',
  accuracy: '0.5%',
  tests: [
    'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'Испытание электрической прочности изоляции обмоток относительно корпуса и между обмотками'
  ]
};

const mediumFormData = {
  organization: 'АО РемЭлектро',
  contactPerson: 'Петров Алексей Николаевич',
  contactDetails: 'petrov@remelektro.ru, +7 495 111-22-33',
  deliveryDate: new Date().toISOString().split('T')[0],
  norms: [
    'ГОСТ 7217-87',
    'ГОСТ 11828-86',
    'ГОСТ 183-74'
  ],
  constructionFeatures: [
    'На лапах',
    'Фланцевые',
    'С короткозамкнутым ротором'
  ],
  kspadMachines: [
    {
      type: 'Трехфазные с короткозамкнутым ротором',
      power: '15',
      voltage: '380',
      speed: '1500',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC411'
    },
    {
      type: 'Трехфазные с короткозамкнутым ротором',
      power: '30',
      voltage: '380',
      speed: '3000',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC416'
    }
  ],
  regulationMethods: [
    'Преобразователь частоты',
    'Прямой пуск'
  ],
  power: '45 кВт',
  area: '30 м²',
  mobile: 'Стационарный',
  accuracy: '0.2%',
  tests: [
    'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'Определение тока и потерь холостого хода',
    'Определение КПД косвенным методом',
    'Определение коэффициента мощности',
    'Определение скольжения'
  ]
};

const phaseRotorFormData = {
  organization: 'ООО Крановый Завод',
  contactPerson: 'Смирнов Дмитрий Иванович',
  contactDetails: 'smirnov@kranzavod.ru, +7 812 444-55-66',
  deliveryDate: new Date().toISOString().split('T')[0],
  norms: [
    'ГОСТ 7217-87',
    'ГОСТ Р 51689-2000',
    'ГОСТ 11828-86',
    'ГОСТ IEC 60034-1-2014'
  ],
  constructionFeatures: [
    'На лапах с фланцем',
    'С фазным ротором',
    'С принудительным охлаждением'
  ],
  kspadMachines: [
    {
      type: 'Трехфазные с фазным ротором',
      power: '55',
      voltage: '380',
      speed: '1000',
      phaseRotor: 'фазный',
      coolingType: 'IC416'
    },
    {
      type: 'Трехфазные с фазным ротором',
      power: '90',
      voltage: '380',
      speed: '750',
      phaseRotor: 'фазный',
      coolingType: 'IC416'
    }
  ],
  regulationMethods: [
    'Реостатное регулирование',
    'Плавный пуск'
  ],
  power: '100 кВт',
  area: '50 м²',
  mobile: 'Стационарный',
  accuracy: '0.5%',
  tests: [
    'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'Испытание электрической прочности изоляции обмоток относительно корпуса и между обмотками',
    'Определение рабочих характеристик',
    'Определение максимального и минимального вращающих моментов',
    'Определение начального пускового момента',
    'Определение начального пускового тока',
    'Испытание на нагревание'
  ]
};

const singlePhaseFormData = {
  organization: 'ООО МикроПривод',
  contactPerson: 'Козлов Андрей Петрович',
  contactDetails: 'kozlov@microprivod.ru, +7 383 777-88-99',
  deliveryDate: new Date().toISOString().split('T')[0],
  norms: [
    'ГОСТ 7217-87',
    'ГОСТ 183-74',
    'ГОСТ IEC 60034-2-1-2017'
  ],
  constructionFeatures: [
    'Фланцевые',
    'С короткозамкнутым ротором',
    'Встраиваемые'
  ],
  kspadMachines: [
    {
      type: 'Однофазные конденсаторные',
      power: '0.75',
      voltage: '220',
      speed: '3000',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC411'
    },
    {
      type: 'Однофазные конденсаторные',
      power: '1.5',
      voltage: '220',
      speed: '1500',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC411'
    }
  ],
  regulationMethods: [
    'Преобразователь частоты',
    'Прямой пуск'
  ],
  power: '5 кВт',
  area: '10 м²',
  mobile: 'Передвижной',
  accuracy: '1.0%',
  tests: [
    'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'Определение тока и потерь холостого хода',
    'Определение КПД косвенным методом',
    'Определение механических потерь',
    'Определение уровня шума'
  ]
};

const runTest = async () => {
  console.log('Начало тестирования опросного листа КСПАД...\n');
  
  console.log('=== Тест 1: Минимальное заполнение опросного листа ===\n');
  let success = await sendForm(minimalFormData);
  console.log(`\nРезультат теста 1: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\n=== Тест 2: Среднее заполнение ===\n');
  success = await sendForm(mediumFormData);
  console.log(`\nРезультат теста 2: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\n=== Тест 3: Двигатели с фазным ротором ===\n');
  success = await sendForm(phaseRotorFormData);
  console.log(`\nРезультат теста 3: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\n=== Тест 4: Однофазные двигатели ===\n');
  success = await sendForm(singlePhaseFormData);
  console.log(`\nРезультат теста 4: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\n=== Тест 5: Максимальное заполнение опросного листа ===\n');
  success = await sendForm(maxFormData);
  console.log(`\nРезультат теста 5: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\nТестирование завершено');
};

// Запускаем тест
runTest(); 