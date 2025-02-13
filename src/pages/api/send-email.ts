import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { generateWord as generateWordKSPEM } from '../../utils/wordGeneratorKSPEM';
import { generateWord as generateWordKSPAD } from '../../utils/wordGeneratorKSPAD';
import { generateVIU100RWord } from '../../utils/wordGeneratorVIU100R';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  try {
    console.log('📝 Получен запрос на отправку формы');
    const formData = req.body;
    const productId = formData.productId; // KSPEM или KSPAD или viu-100r

    if (!formData) {
      throw new Error('Отсутствуют данные формы');
    }

    console.log('🔍 Проверка переменных окружения...');
    if (!process.env.EMAIL_PASSWORD) {
      throw new Error('Отсутствует конфигурация EMAIL_PASSWORD');
    }

    console.log('📄 Генерация Word документа...');
    let wordBuffer;
    if (productId === 'KSPAD') {
      wordBuffer = await generateWordKSPAD(formData);
    } else if (productId === 'KSPEM') {
      wordBuffer = await generateWordKSPEM(formData);
    } else if (formData.selectedProduct?.id === 'viu-100r') {
      wordBuffer = await generateVIU100RWord(formData);
    }
    console.log('✅ Word документ успешно сгенерирован');

    console.log('📧 Настройка транспорта для отправки email...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'meepo161@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });

    console.log('📝 Форматирование данных для письма...');
    let machinesText = '';
    let emailText = '';
    
    if (productId === 'KSPAD') {
      machinesText = formData.kspadMachines
        ?.filter((m: any) => m.power || m.voltage || m.speed || m.phaseRotor || m.coolingType)
        ?.map((m: any) => `
Тип: ${m?.type || 'Не указан'}
Мощность: ${m?.power || 'Не указана'} ${m?.power ? 'кВт' : ''}
Напряжение: ${m?.voltage || 'Не указано'} ${m?.voltage ? 'В' : ''}
Скорость: ${m?.speed || 'Не указана'} ${m?.speed ? 'об/мин' : ''}
Тип ротора: ${m?.phaseRotor || 'Не указан'}
Тип охлаждения: ${m?.coolingType || 'Не указан'}
        `)?.join('\n') || 'Не указаны';

      emailText = `
Новая заявка на КСПАД

Организация: ${formData.organization || 'Не указана'}
Контактное лицо: ${formData.contactPerson || 'Не указано'}
Контактные данные: ${formData.contactDetails || 'Не указаны'}
Дата поставки: ${formData.deliveryDate || 'Не указана'}

Нормативы испытаний:
${formData.norms?.length > 0 ? formData.norms.join('\n') : 'Не выбраны'}

Конструктивные особенности:
${formData.constructionFeatures?.length > 0 ? formData.constructionFeatures.join('\n') : 'Не указаны'}

Способы регулировки:
${formData.regulationMethods?.length > 0 ? formData.regulationMethods.join('\n') : 'Не указаны'}

Технические требования к стенду:
- Потребляемая мощность: ${formData.power || 'Не указана'}
- Занимаемая площадь: ${formData.area || 'Не указана'}
- Мобильность: ${formData.mobile || 'Не указана'}
- Точность измерений: ${formData.accuracy || 'Не указана'}

Технические параметры машин:
${machinesText}

Перечень опытов:
${formData.tests?.length > 0 ? formData.tests.join('\n') : 'Не выбраны'}

Дополнительные требования:
${formData.additionalTests || 'Не указаны'}`;
    } else if (productId === 'KSPEM') {
      machinesText = formData.kspemMachines
        ?.filter((m: any) => m.power || m.voltage || m.speed || m.excitationUI)
        ?.map((m: any) => `
Тип: ${m?.type || 'Не указан'}
Мощность: ${m?.power || 'Не указана'} ${m?.power ? 'кВт' : ''}
Напряжение: ${m?.voltage || 'Не указано'} ${m?.voltage ? 'кВ' : ''}
Скорость: ${m?.speed || 'Не указана'} ${m?.speed ? 'об/мин' : ''}
U и I обмотки возбуждения: ${m?.excitationUI || 'Не указано'}
        `)?.join('\n') || 'Не указаны';

      emailText = `
Новая заявка на КСПЭМ

Организация: ${formData.organization || 'Не указана'}
Контактное лицо: ${formData.contactPerson || 'Не указано'}
Контактные данные: ${formData.contactDetails || 'Не указаны'}
Дата поставки: ${formData.deliveryDate || 'Не указана'}

Нормативы испытаний:
${formData.norms?.length > 0 ? formData.norms.join('\n') : 'Не выбраны'}

Конструктивные особенности:
${formData.constructionFeatures?.length > 0 ? formData.constructionFeatures.join('\n') : 'Не указаны'}

Способы регулировки:
${formData.regulationMethods?.length > 0 ? formData.regulationMethods.join('\n') : 'Не указаны'}

Технические требования к стенду:
- Потребляемая мощность: ${formData.power || 'Не указана'}
- Занимаемая площадь: ${formData.area || 'Не указана'}
- Мобильность: ${formData.mobile || 'Не указана'}
- Точность измерений: ${formData.accuracy || 'Не указана'}

Технические параметры машин:
${machinesText}

Перечень опытов:
${formData.tests?.length > 0 ? formData.tests.join('\n') : 'Не выбраны'}

Дополнительные требования:
${formData.additionalTests || 'Не указаны'}`;
    } else if (formData.selectedProduct?.id === 'viu-100r') {
      const operatingModeMap = {
        'manual': 'Ручной',
        'automatic': 'Автоматический',
        'combined': 'Комбинированный'
      } as const;

      const controlTypeMap = {
        'local': 'Местное',
        'remote': 'Дистанционное',
        'combined': 'Комбинированное'
      } as const;

      const mobilityMap = {
        'stationary': 'Стационарное',
        'mobile': 'Мобильное',
        'portable': 'Переносное'
      } as const;

      emailText = `
Новая заявка на ВИУ-100Р

Организация: ${formData.organization || 'Не указана'}
Контактное лицо: ${formData.contactPerson || 'Не указано'}
Контактные данные: ${formData.contactDetails || 'Не указаны'}
Дата поставки: ${formData.deliveryDate || 'Не указана'}

Параметры испытаний:
- Максимальное испытательное напряжение: ${formData.viu100r?.testVoltage || 'Не указано'} ${formData.viu100r?.testVoltage ? 'кВ' : ''}
- Требуемый ток испытания: ${formData.viu100r?.testCurrent || 'Не указан'} ${formData.viu100r?.testCurrent ? 'мА' : ''}
- Частота испытательного напряжения: ${formData.viu100r?.frequency || 'Не указана'} ${formData.viu100r?.frequency ? 'Гц' : ''}

Типы испытуемого оборудования:
${formData.viu100r?.testObjects?.length ? formData.viu100r.testObjects.map((obj: string) => `- ${obj}`).join('\n') : 'Не выбраны'}

Конструктивное исполнение:
- Режим работы: ${formData.viu100r?.operatingMode ? (
  operatingModeMap[formData.viu100r.operatingMode as keyof typeof operatingModeMap] || formData.viu100r.operatingMode
) : 'Не указан'}
- Тип управления: ${formData.viu100r?.controlType ? (
  controlTypeMap[formData.viu100r.controlType as keyof typeof controlTypeMap] || formData.viu100r.controlType
) : 'Не указан'}
- Мобильность установки: ${formData.viu100r?.mobility ? (
  mobilityMap[formData.viu100r.mobility as keyof typeof mobilityMap] || formData.viu100r.mobility
) : 'Не указана'}

Параметры питающей сети:
${formData.viu100r?.powerSupply || 'Не указаны'}

Дополнительные опции:
${formData.viu100r?.additionalOptions?.length ? formData.viu100r.additionalOptions.map((opt: string) => `- ${opt}`).join('\n') : 'Не выбраны'}

Особые требования:
${formData.viu100r?.specialRequirements || 'Не указаны'}

Дополнительные требования:
${formData.additionalTests || 'Не указаны'}`;
    }

    console.log('📨 Отправка email...');
    try {
      await transporter.sendMail({
        from: 'meepo161@gmail.com',
        to: 'meepo161@gmail.com',
        subject: `Новая заявка на ${
          productId === 'KSPAD' ? 'КСПАД' : 
          productId === 'KSPEM' ? 'КСПЭМ' : 
          'ВИУ-100Р'
        }`,
        text: emailText,
        attachments: wordBuffer ? [
          {
            filename: `Опросный лист ${
              productId === 'KSPAD' ? 'КСПАД' : 
              productId === 'KSPEM' ? 'КСПЭМ' : 
              'ВИУ-100Р'
            }.doc`,
            content: wordBuffer,
            contentType: 'application/msword'
          }
        ] : []
      });

      console.log('✅ Email успешно отправлен');
      res.status(200).json({ message: 'Email успешно отправлен' });
    } catch (emailError: any) {
      console.error('❌ Ошибка при отправке email:', {
        error: emailError,
        message: emailError.message,
        code: emailError.code,
        response: emailError.response
      });
      throw new Error(`Ошибка при отправке email: ${emailError.message}`);
    }
  } catch (error: any) {
    console.error('❌ Ошибка при обработке запроса:', {
      error,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Ошибка при отправке формы',
      details: error.message
    });
  }
} 