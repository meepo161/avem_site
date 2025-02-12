import fetch from 'node-fetch';

const testKSPEMForm = async () => {
  const formData = {
    organization: 'ООО Тест',
    contactPerson: 'Иванов Иван Иванович',
    contactDetails: 'test@example.com, +7 999 999-99-99',
    deliveryDate: new Date().toISOString().split('T')[0],
    organizationType: 'repair',
    norms: [
      'ГОСТ 11828-86',
      'ГОСТ 7217-87',
      'ГОСТ 10169-77'
    ],
    constructionFeatures: [
      'На лапах',
      'Фланцевые',
      'Вертикальные'
    ],
    kspemMachines: [
      {
        type: 'Асинхронные двигатели',
        power: '100',
        voltage: '380',
        speed: '1500',
        excitationUI: '220В, 5А'
      },
      {
        type: 'Синхронные двигатели',
        power: '200',
        voltage: '6000',
        speed: '3000',
        excitationUI: '110В, 10А'
      }
    ],
    regulationMethods: [
      'Плавный регулируемый',
      'Ступенчатый'
    ],
    power: '50 кВт',
    area: '20 м²',
    mobile: 'Стационарный',
    accuracy: '0.5%',
    tests: [
      'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
      'Измерение сопротивления обмоток при постоянном токе в практически холодном состоянии',
      'Испытание электрической прочности изоляции обмотки относительно корпуса и между обмотками',
      'Определение тока и потерь холостого хода с измерением скорости вращения'
    ],
    additionalTests: 'Требуется обучение персонала'
  };

  try {
    console.log('Отправка тестовой формы КСПЭМ...');
    
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Форма успешно отправлена');
      console.log('Ответ сервера:', result);
    } else {
      console.error('❌ Ошибка при отправке формы');
      console.error('Статус:', response.status);
      console.error('Ответ сервера:', result);
    }
  } catch (error) {
    console.error('❌ Ошибка при выполнении запроса:', error);
  }
};

// Запускаем тест
testKSPEMForm(); 