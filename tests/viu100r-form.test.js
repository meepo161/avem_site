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
    const transformerTypesArray = formData.transformerTypes?.map(type => ({ text: type })) || [];
    console.log('\nПодготовленный массив типов оборудования:', JSON.stringify(transformerTypesArray, null, 2));

    const testsArray = formData.tests?.map(test => ({ text: test })) || [];
    console.log('\nПодготовленный массив тестов:', JSON.stringify(testsArray, null, 2));

    const automationLevelsArray = formData.automationLevels?.map(level => ({ text: level })) || [];
    console.log('\nПодготовленный массив уровней автоматизации:', JSON.stringify(automationLevelsArray, null, 2));

    const regulationMethodsArray = formData.regulationMethods?.map(method => ({ text: method })) || [];
    console.log('\nПодготовленный массив методов регулировки:', JSON.stringify(regulationMethodsArray, null, 2));
    
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        selectedProduct: { id: 'viu-100r' }
      }),
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
  organization: 'ООО ВысокоВольтТест',
  contactPerson: 'Иванов Иван Иванович',
  contactDetails: 'test@example.com, +7 999 999-99-99',
  deliveryDate: new Date().toISOString().split('T')[0],
  power: '100 кВ',
  area: '500 мА',
  transformerTypes: [
    'Генераторы',
    'Электродвигатели',
    'Трансформаторы',
    'Высоковольтные выключатели',
    'Изоляторы',
    'Ограничители перенапряжений',
    'Силовые кабели',
    'Конденсаторы'
  ],
  tests: [
    'Испытание повышенным напряжением промышленной частоты',
    'Испытание выпрямленным напряжением',
    'Испытание коммутационным импульсом',
    'Испытание грозовым импульсом',
    'Измерение частичных разрядов',
    'Измерение тангенса угла диэлектрических потерь',
    'Измерение сопротивления изоляции',
    'Испытание с измерением токов утечки',
    'Испытание электрической прочности',
    'Определение уровня радиопомех'
  ],
  automationLevels: [
    'Ручное управление',
    'Полуавтоматическое управление',
    'Автоматическое управление',
    'Дистанционное управление',
    'Интеграция в АСУ ТП',
    'Регистрация результатов испытаний',
    'Формирование протоколов испытаний',
    'Архивирование результатов'
  ],
  regulationMethods: [
    'Механическая блокировка дверей',
    'Электрическая блокировка дверей',
    'Световая сигнализация',
    'Звуковая сигнализация',
    'Аварийное отключение',
    'Защитное заземление',
    'Контроль изоляции',
    'Защита от перенапряжений'
  ],
  additionalTests: 'Требуется полный комплекс обучения персонала, пусконаладочные работы, расширенная гарантия на 3 года'
};

const minimalFormData = {
  organization: 'ИП Петров',
  contactPerson: 'Петров П.П.',
  contactDetails: 'petrov@mail.ru, +7 900 123-45-67',
  deliveryDate: new Date().toISOString().split('T')[0],
  power: '50 кВ',
  area: '100 мА',
  transformerTypes: ['Генераторы'],
  tests: ['Испытание повышенным напряжением промышленной частоты'],
  automationLevels: ['Ручное управление'],
  regulationMethods: ['Механическая блокировка дверей']
};

const mediumFormData = {
  organization: 'АО Энергомаш',
  contactPerson: 'Сидоров Алексей Иванович',
  contactDetails: 'sidorov@energomash.ru, +7 495 555-77-88',
  deliveryDate: new Date().toISOString().split('T')[0],
  power: '75 кВ',
  area: '300 мА',
  transformerTypes: [
    'Генераторы',
    'Трансформаторы',
    'Высоковольтные выключатели'
  ],
  tests: [
    'Испытание повышенным напряжением промышленной частоты',
    'Измерение частичных разрядов',
    'Измерение сопротивления изоляции',
    'Испытание электрической прочности'
  ],
  automationLevels: [
    'Автоматическое управление',
    'Регистрация результатов испытаний',
    'Формирование протоколов испытаний'
  ],
  regulationMethods: [
    'Механическая блокировка дверей',
    'Световая сигнализация',
    'Звуковая сигнализация',
    'Защитное заземление'
  ]
};

const labFormData = {
  organization: 'НИИ Высоковольтной Техники',
  contactPerson: 'Морозова Елена Сергеевна',
  contactDetails: 'morozova@niivt.ru, +7 383 222-33-44',
  deliveryDate: new Date().toISOString().split('T')[0],
  power: '100 кВ',
  area: '400 мА',
  transformerTypes: [
    'Генераторы',
    'Трансформаторы',
    'Изоляторы',
    'Силовые кабели'
  ],
  tests: [
    'Испытание повышенным напряжением промышленной частоты',
    'Испытание грозовым импульсом',
    'Измерение частичных разрядов',
    'Измерение тангенса угла диэлектрических потерь',
    'Определение уровня радиопомех'
  ],
  automationLevels: [
    'Автоматическое управление',
    'Дистанционное управление',
    'Регистрация результатов испытаний',
    'Архивирование результатов'
  ],
  regulationMethods: [
    'Механическая блокировка дверей',
    'Электрическая блокировка дверей',
    'Световая сигнализация',
    'Контроль изоляции'
  ],
  additionalTests: 'Требуется калибровка измерительного оборудования, протоколы испытаний с метрологической аттестацией'
};

describe('ВИУ-100Р Form Tests', () => {
  test('Минимальное заполнение опросного листа', async () => {
    const success = await sendForm(minimalFormData);
    expect(success).toBe(true);
  });

  test('Среднее заполнение', async () => {
    const success = await sendForm(mediumFormData);
    expect(success).toBe(true);
  });

  test('Испытательная лаборатория', async () => {
    const success = await sendForm(labFormData);
    expect(success).toBe(true);
  });

  test('Максимальное заполнение опросного листа', async () => {
    const success = await sendForm(maxFormData);
    expect(success).toBe(true);
  });
}); 