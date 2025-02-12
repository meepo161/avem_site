import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не разрешен' });
  }

  try {
    const formData = req.body;

    // Создаем транспорт для отправки email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'meepo161@gmail.com',
        pass: process.env.EMAIL_PASSWORD // Пароль должен быть в переменных окружения
      }
    });

    // Форматируем данные для письма
    const machinesText = formData.machines
      .map((m: any) => `${m.type}, ${m.power} кВт, ${m.voltage} кВ, ${m.speed} об/мин`)
      .join('\n');

    // Создаем текст письма
    const emailText = `
Новая заявка на КСПЭМ

Организация: ${formData.organization}
Контактное лицо: ${formData.contactPerson}
Контактные данные: ${formData.contactDetails}
Дата поставки: ${formData.deliveryDate}

Нормативы испытаний:
${formData.norms.join('\n')}

Способ регулировки напряжения:
${formData.regulationMethods.join('\n')}

Технические требования:
- Потребляемая мощность: ${formData.power} кВт
- Занимаемая площадь: ${formData.area} м²

Конструктивные особенности:
${formData.constructionFeatures.join('\n')}

Технические параметры машин:
${machinesText}

Перечень опытов:
${formData.tests.join('\n')}
    `;

    // Отправляем email
    await transporter.sendMail({
      from: 'meepo161@gmail.com',
      to: 'meepo161@gmail.com',
      subject: 'Новая заявка на КСПЭМ',
      text: emailText,
    });

    res.status(200).json({ message: 'Email успешно отправлен' });
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    res.status(500).json({ message: 'Ошибка при отправке email' });
  }
} 