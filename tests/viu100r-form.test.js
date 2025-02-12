require('./setup');
const fetch = require('node-fetch');

// Устанавливаем переменные окружения напрямую
process.env.EMAIL_PASSWORD = 'jmbo gslo iuck sixo';

describe('ВИУ-100Р Form Tests', () => {
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

  const sendForm = async (formData) => {
    try {
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

      return response.ok;
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      return false;
    }
  };

  it('should submit minimal form data successfully', async () => {
    const result = await sendForm(minimalFormData);
    expect(result).toBe(true);
  });

  it('should submit medium form data successfully', async () => {
    const result = await sendForm(mediumFormData);
    expect(result).toBe(true);
  });

  it('should submit maximal form data successfully', async () => {
    const result = await sendForm(maxFormData);
    expect(result).toBe(true);
  });

  it('should fail when submitting invalid data', async () => {
    const invalidData = {
      ...minimalFormData,
      organization: undefined
    };
    const result = await sendForm(invalidData);
    expect(result).toBe(false);
  });
}); 