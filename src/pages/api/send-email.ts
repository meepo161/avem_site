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

    // Проверяем обязательные поля
    const requiredFields = ['organization', 'contactPerson', 'contactDetails', 'deliveryDate'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Отсутствуют обязательные поля', 
        fields: missingFields 
      });
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
      emailText = `
Новая заявка на ВИУ-100Р

Организация: ${formData.organization || 'Не указана'}
Контактное лицо: ${formData.contactPerson || 'Не указано'}
Контактные данные: ${formData.contactDetails || 'Не указаны'}
Дата поставки: ${formData.deliveryDate || 'Не указана'}

Параметры испытаний:
- Максимальное испытательное напряжение: ${formData.power || 'Не указано'} кВ
- Требуемый ток испытания: ${formData.area || 'Не указан'} мА

Типы испытуемого оборудования:
${formData.transformerTypes?.length > 0 ? formData.transformerTypes.join('\n') : 'Не выбраны'}

Требуемые виды испытаний:
${formData.tests?.length > 0 ? formData.tests.join('\n') : 'Не выбраны'}

Требования к системе управления:
${formData.automationLevels?.length > 0 ? formData.automationLevels.join('\n') : 'Не указаны'}

Требования к безопасности:
${formData.regulationMethods?.length > 0 ? formData.regulationMethods.join('\n') : 'Не указаны'}

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