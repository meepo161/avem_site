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
    'ГОСТ 11828-86',
    'ГОСТ 53472-2009',
    'ГОСТ 7217-87',
    'ГОСТ 31606-2012',
    'ГОСТ Р (МЭК 60034-1-2014)',
    'ГОСТ Р (МЭК 60034-2-2009)',
    'ГОСТ 183-74'
  ],
  constructionFeatures: [
    'На лапах',
    'Фланцевые',
    'Вертикальные',
    'На лапах с фланцем',
    'Конический вал',
    'Цилиндрический вал'
  ],
  kspadMachines: [
    {
      type: 'Трехфазные',
      power: '75',
      voltage: '380',
      speed: '1500',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC411'
    },
    {
      type: 'Трехфазные',
      power: '132',
      voltage: '380',
      speed: '1000',
      phaseRotor: 'фазный',
      coolingType: 'IC416'
    },
    {
      type: 'Двухфазные',
      power: '2.2',
      voltage: '220',
      speed: '3000',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC411'
    },
    {
      type: 'Однофазные',
      power: '1.5',
      voltage: '220',
      speed: '1500',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC411'
    }
  ],
  regulationMethods: [
    'Плавный регулируемый',
    'Плавный нерегулируемый',
    'Ступенчатый',
    'Прямое включение в сеть'
  ],
  power: '150 кВт',
  area: '80 м²',
  mobile: 'Стационарный',
  accuracy: '0.2%',
  organizationType: 'repair',
  tests: [
    'измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'измерение сопротивления изоляции встроенных термодатчиков относительно корпуса и между обмотками',
    'измерение сопротивления обмоток при постоянном токе в практически холодном состоянии',
    'измерение сопротивления встроенных термодатчиков при постоянном токе в практически холодном состоянии',
    'испытание электрической прочности изоляции обмотки относительно корпуса и между обмотками',
    'испытание электрической прочности изоляции встроенных термодатчиков относительно корпуса и между обмотками',
    'определение тока и потерь холостого хода с измерением скорости вращения',
    'определение тока и потерь короткого замыкания',
    'испытание электрической прочности междувитковой изоляции обмоток',
    'проверка уровня вибрации',
    'измерения температуры окружающей среды и частей электрической машины',
    'обкатка на холостом ходу',
    'проверка «беличьей клетки»',
    'проверка встроенных датчиков вращения',
    'определение коэффициента трансформации',
    'испытания под нагрузкой'
  ],
  additionalTests: 'Требуется полный комплекс обучения персонала'
};

const manufacturerFormData = {
  organization: 'АО Электромаш',
  contactPerson: 'Петров Петр Петрович',
  contactDetails: 'petrov@electromash.ru, +7 495 987-65-43',
  deliveryDate: new Date().toISOString().split('T')[0],
  norms: [
    'ГОСТ 11828-86',
    'ГОСТ 53472-2009',
    'ГОСТ 7217-87',
    'ГОСТ 31606-2012'
  ],
  constructionFeatures: [
    'На лапах',
    'Фланцевые',
    'Вертикальные',
    'Конический вал'
  ],
  kspadMachines: [
    {
      type: 'Трехфазные',
      power: '90',
      voltage: '380',
      speed: '1500',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC411'
    }
  ],
  regulationMethods: [
    'Плавный регулируемый',
    'Ступенчатый'
  ],
  power: '100 кВт',
  area: '60 м²',
  mobile: 'Стационарный',
  accuracy: '0.2%',
  organizationType: 'manufacturer',
  tests: [
    'испытание на нагрев',
    'определение КПД',
    'определение коэффициента мощности',
    'определение скольжения',
    'испытание на кратковременную перегрузку по моменту',
    'испытание на кратковременную перегрузку по току',
    'определение максимального вращающего момента',
    'определение минимального вращающего момента в процессе пуска',
    'определение начального пускового вращающего момента',
    'определение начального пускового тока',
    'испытание при повышенной частоте вращения',
    'проверка уровня шума',
    'проверка работоспособности при изменении напряжения и частоты питающей сети',
    'определения момента инерции вращающихся частей'
  ],
  additionalTests: 'Требуется интеграция с системой управления производством'
};

const minimalFormData = {
  organization: 'ИП Сидоров',
  contactPerson: 'Сидоров С.С.',
  contactDetails: 'sidorov@mail.ru, +7 900 987-65-43',
  deliveryDate: new Date().toISOString().split('T')[0],
  norms: ['ГОСТ 11828-86'],
  constructionFeatures: ['На лапах'],
  kspadMachines: [
    {
      type: 'Трехфазные',
      power: '5.5',
      voltage: '380',
      speed: '1500',
      phaseRotor: 'короткозамкнутый',
      coolingType: 'IC411'
    }
  ],
  regulationMethods: ['Прямое включение в сеть'],
  power: '10 кВт',
  area: '15 м²',
  mobile: 'Стационарный',
  accuracy: '0.5%',
  organizationType: 'repair',
  tests: [
    'измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
    'испытание электрической прочности изоляции обмотки относительно корпуса и между обмотками'
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
  
  console.log('\n=== Тест 2: Максимальное заполнение для ремонтных организаций ===\n');
  success = await sendForm(maxFormData);
  console.log(`\nРезультат теста 2: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\n=== Тест 3: Заполнение для заводов-изготовителей ===\n');
  success = await sendForm(manufacturerFormData);
  console.log(`\nРезультат теста 3: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
  
  console.log('\nТестирование завершено');
};

// Запускаем тест
runTest();

describe('КСПАД Form Tests', () => {
  test('Тестирование опросного листа КСПАД', async () => {
    console.log('Начало тестирования опросного листа КСПАД...\n');
    
    console.log('=== Тест 1: Минимальное заполнение опросного листа ===\n');
    let success = await sendForm(minimalFormData);
    console.log(`\nРезультат теста 1: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
    expect(success).toBe(true);
    
    console.log('\n=== Тест 2: Максимальное заполнение для ремонтных организаций ===\n');
    success = await sendForm(maxFormData);
    console.log(`\nРезультат теста 2: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
    expect(success).toBe(true);
    
    console.log('\n=== Тест 3: Заполнение для заводов-изготовителей ===\n');
    success = await sendForm(manufacturerFormData);
    console.log(`\nРезультат теста 3: ${success ? '✅ Успешно' : '❌ Ошибка'}`);
    expect(success).toBe(true);
    
    console.log('\nТестирование завершено');
  });

  test('Тестирование минимального заполнения формы', async () => {
    const success = await sendForm(minimalFormData);
    expect(success).toBe(true);
  });

  test('Тестирование максимального заполнения формы', async () => {
    const success = await sendForm(maxFormData);
    expect(success).toBe(true);
  });

  test('Проверка всех полей формы', () => {
    // Проверяем наличие всех необходимых полей
    expect(maxFormData).toHaveProperty('standards');
    expect(maxFormData).toHaveProperty('constructiveFeatures');
    expect(maxFormData).toHaveProperty('machineTypes');
    expect(maxFormData).toHaveProperty('kspadMachines');
    expect(maxFormData).toHaveProperty('voltageRegulation');
    expect(maxFormData).toHaveProperty('standRequirements');
    expect(maxFormData.standRequirements).toHaveProperty('operatingMode');
    expect(maxFormData.standRequirements).toHaveProperty('powerConsumption');
    expect(maxFormData.standRequirements).toHaveProperty('area');
    expect(maxFormData.standRequirements).toHaveProperty('measurementAccuracy');
    expect(maxFormData.standRequirements).toHaveProperty('mobility');

    // Проверяем структуру машин
    maxFormData.kspadMachines.forEach(machine => {
      expect(machine).toHaveProperty('type');
      expect(machine).toHaveProperty('power');
      expect(machine).toHaveProperty('voltage');
      expect(machine).toHaveProperty('speed');
      expect(machine).toHaveProperty('phaseRotor');
      expect(machine).toHaveProperty('coolingType');
    });
  });

  test('Проверка генерации Word документа', async () => {
    const response = await fetch('http://localhost:3000/api/submit-kspad-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(maxFormData),
    });

    expect(response.ok).toBe(true);
    const blob = await response.blob();
    expect(blob.type).toBe('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  });
}); 