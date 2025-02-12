import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { generateWord } from '@/utils/wordGenerator';

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

    // Проверяем наличие необходимых данных
    if (!formData) {
      throw new Error('Отсутствуют данные формы');
    }

    console.log('🔍 Проверка переменных окружения...');
    console.log('Переменные окружения:', {
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
      NODE_ENV: process.env.NODE_ENV,
      allEnvKeys: Object.keys(process.env)
    });

    // Проверяем наличие переменной окружения
    if (!process.env.EMAIL_PASSWORD) {
      throw new Error('Отсутствует конфигурация EMAIL_PASSWORD');
    }

    console.log('📄 Генерация Word документа...');
    // Генерируем Word документ
    const wordBuffer = await generateWord(formData);
    console.log('✅ Word документ успешно сгенерирован');

    console.log('📧 Настройка транспорта для отправки email...');
    // Создаем транспорт для отправки email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'meepo161@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Форматируем данные для письма
    console.log('📝 Форматирование данных для письма...');
    const kspemMachinesText = formData.kspemMachines
      ?.filter((m: any) => m.power || m.voltage || m.speed || m.excitationUI)
      ?.map((m: any) => `
Тип: ${m?.type || 'Не указан'}
Мощность: ${m?.power || 'Не указана'} ${m?.power ? 'кВт' : ''}
Напряжение: ${m?.voltage || 'Не указано'} ${m?.voltage ? 'кВ' : ''}
Скорость: ${m?.speed || 'Не указана'} ${m?.speed ? 'об/мин' : ''}
U и I обмотки возбуждения: ${m?.excitationUI || 'Не указано'}
      `)?.join('\n') || 'Не указаны';

    // Создаем текст письма
    const emailText = `
Новая заявка на КСПЭМ

Организация: ${formData.organization || 'Не указана'}
Контактное лицо: ${formData.contactPerson || 'Не указано'}
Контактные данные: ${formData.contactDetails || 'Не указаны'}
Дата поставки: ${formData.deliveryDate || 'Не указана'}

Тип организации: ${formData.organizationType === 'repair' ? 'Ремонтная организация' : 'Завод-изготовитель'}

Нормативы испытаний:
${formData.norms?.length > 0 ? formData.norms.join('\n') : 'Не выбраны'}

Конструктивные особенности:
${formData.constructionFeatures?.length > 0 ? formData.constructionFeatures.join('\n') : 'Не указаны'}

Способы регулировки напряжения:
${formData.regulationMethods?.length > 0 ? formData.regulationMethods.join('\n') : 'Не указаны'}

Технические требования к стенду:
- Потребляемая мощность: ${formData.power || 'Не указана'}
- Занимаемая площадь: ${formData.area || 'Не указана'}
- Мобильность: ${formData.mobile || 'Не указана'}
- Точность СИ: ${formData.accuracy || 'Не указана'}

Технические параметры машин:
${kspemMachinesText}

Перечень опытов:
${formData.tests?.length > 0 ? formData.tests.join('\n') : 'Не выбраны'}

Дополнительные требования:
${formData.additionalTests || 'Не указаны'}
    `;

    console.log('📨 Отправка email...');
    try {
      // Отправляем email с вложением
      await transporter.sendMail({
        from: 'meepo161@gmail.com',
        to: 'meepo161@gmail.com',
        subject: 'Новая заявка на КСПЭМ',
        text: emailText,
        attachments: [
          {
            filename: 'Опросный лист КСПЭМ.doc',
            content: wordBuffer,
            contentType: 'application/msword'
          }
        ]
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