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
  viu100r: {
    testObjects: [
      'Генераторы',
      'Электродвигатели',
      'Трансформаторы',
      'Высоковольтные вводы',
      'Изоляторы',
      'Кабели',
      'Разрядники',
      'Ограничители перенапряжений'
    ],
    testVoltage: '100 кВ',
    testCurrent: '1000 мА',
    frequency: '50',
    operatingMode: 'automatic',
    controlType: 'combined',
    mobility: 'stationary',
    powerSupply: '380В, 50Гц, 3 фазы',
    additionalOptions: [
      'Измерение тока утечки',
      'Измерение емкости объекта испытаний',
      'Измерение тангенса угла диэлектрических потерь',
      'Осциллографирование процессов',
      'Автоматическая регистрация результатов',
      'Встроенная система безопасности',
      'Система блокировок',
      'Экранирование от помех'
    ],
    specialRequirements: 'Требуется полный комплекс обучения персонала, пусконаладочные работы, расширенная гарантия на 3 года'
  },
  additionalTests: 'Дополнительные требования к документации и сертификации'
};

const minimalFormData = {
  organization: 'ИП Петров',
  contactPerson: 'Петров П.П.',
  contactDetails: 'petrov@mail.ru, +7 900 123-45-67',
  deliveryDate: new Date().toISOString().split('T')[0],
  viu100r: {
    testObjects: ['Генераторы'],
    testVoltage: '50 кВ',
    testCurrent: '100 мА',
    frequency: '50',
    operatingMode: 'manual',
    controlType: 'local',
    mobility: 'stationary',
    powerSupply: '380В, 50Гц',
    additionalOptions: ['Система блокировок'],
    specialRequirements: ''
  }
};

const mediumFormData = {
  organization: 'АО Энергомаш',
  contactPerson: 'Сидоров Алексей Иванович',
  contactDetails: 'sidorov@energomash.ru, +7 495 555-77-88',
  deliveryDate: new Date().toISOString().split('T')[0],
  viu100r: {
    testObjects: [
      'Генераторы',
      'Трансформаторы',
      'Высоковольтные вводы'
    ],
    testVoltage: '75 кВ',
    testCurrent: '300 мА',
    frequency: '50',
    operatingMode: 'automatic',
    controlType: 'remote',
    mobility: 'mobile',
    powerSupply: '380В, 50Гц, 3 фазы',
    additionalOptions: [
      'Измерение тока утечки',
      'Автоматическая регистрация результатов',
      'Система блокировок'
    ],
    specialRequirements: 'Требуется обучение персонала'
  }
};

const labFormData = {
  organization: 'НИИ Высоковольтной Техники',
  contactPerson: 'Морозова Елена Сергеевна',
  contactDetails: 'morozova@niivt.ru, +7 383 222-33-44',
  deliveryDate: new Date().toISOString().split('T')[0],
  viu100r: {
    testObjects: [
      'Генераторы',
      'Трансформаторы',
      'Изоляторы',
      'Кабели'
    ],
    testVoltage: '100 кВ',
    testCurrent: '400 мА',
    frequency: 'variable',
    operatingMode: 'combined',
    controlType: 'combined',
    mobility: 'stationary',
    powerSupply: '380В, 50Гц, 3 фазы, стабилизированное',
    additionalOptions: [
      'Измерение тока утечки',
      'Измерение емкости объекта испытаний',
      'Измерение тангенса угла диэлектрических потерь',
      'Осциллографирование процессов',
      'Автоматическая регистрация результатов'
    ],
    specialRequirements: 'Требуется калибровка измерительного оборудования, протоколы испытаний с метрологической аттестацией'
  },
  additionalTests: 'Необходима интеграция с существующей системой сбора данных'
};

const emptyParamsFormData = {
  organization: 'ООО ВысокоВольтТест',
  contactPerson: 'Иванов Иван Иванович',
  contactDetails: 'test@example.com, +7 999 999-99-99',
  deliveryDate: '2025-02-13',
  viu100r: {
    testObjects: [],
    testVoltage: '',
    testCurrent: '',
    frequency: '',
    operatingMode: '',
    controlType: '',
    mobility: '',
    powerSupply: '',
    additionalOptions: [],
    specialRequirements: ''
  },
  additionalTests: 'Дополнительные требования к документации и сертификации'
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

  test('Заявка с пустыми техническими параметрами', async () => {
    const success = await sendForm(emptyParamsFormData);
    expect(success).toBe(true);
  });
}); 