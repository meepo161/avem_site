import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { generateWord } from '@/utils/wordGenerator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Метод не поддерживается' });
  }

  try {
    // Генерируем Word документ
    const wordBuffer = await generateWord(req.body);

    // Отправляем email с вложением
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'avem.esve@gmail.com',
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: 'avem.esve@gmail.com',
      to: 'avem.esve@gmail.com',
      subject: 'Новый опросный лист КСПЭМ',
      text: `Получен новый опросный лист от организации ${req.body.organization}`,
      attachments: [
        {
          filename: 'Опросный лист КСПЭМ.doc',
          content: wordBuffer,
          contentType: 'application/msword'
        }
      ]
    });

    res.status(200).json({ message: 'Форма успешно отправлена' });
  } catch (error) {
    console.error('Ошибка при обработке формы:', error);
    res.status(500).json({ 
      message: 'Ошибка при отправке формы',
      details: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
} 