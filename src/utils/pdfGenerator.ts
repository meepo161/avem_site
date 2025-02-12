import PDFDocument from 'pdfkit';
import path from 'path';

interface FormData {
  organization: string;
  contactPerson: string;
  contactDetails: string;
  deliveryDate?: string;
  organizationType: string;
  norms: string[];
  constructionFeatures: string[];
  regulationMethods: string[];
  power: string;
  area: string;
  mobile: string;
  accuracy: string;
  kspemMachines: Array<{
    type: string;
    power: string;
    voltage: string;
    speed: string;
    excitationUI?: string;
  }>;
  tests: string[];
  additionalTests: string;
}

export const generatePDF = (formData: FormData): Promise<Buffer> => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
      },
      lang: 'ru',
      info: {
        Producer: 'AVEM КСПЭМ',
        Creator: 'AVEM КСПЭМ',
        Author: 'AVEM',
        Title: 'Опросный лист КСПЭМ',
        Subject: 'Опросный лист КСПЭМ',
        Keywords: 'КСПЭМ, опросный лист',
        CreationDate: new Date(),
      }
    });

    // Используем встроенный шрифт Helvetica
    doc.font('Helvetica');
    doc.fontSize(16);

    // Собираем документ в буфер
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));

    // Настройка шрифтов и стилей
    doc.text('Опросный лист КСПЭМ', { align: 'center' });
    doc.moveDown();

    // Основная информация
    doc.fontSize(12);
    doc.text('Информация о заказчике', { continued: false });
    doc.fontSize(10);
    doc.moveDown(0.5);
    doc.text(`Организация: ${formData.organization}`, { continued: false });
    doc.text(`Контактное лицо: ${formData.contactPerson}`, { continued: false });
    doc.text(`Контактные данные: ${formData.contactDetails}`, { continued: false });
    if (formData.deliveryDate) {
      doc.text(`Дата поставки: ${formData.deliveryDate}`, { continued: false });
    }
    doc.text(`Тип организации: ${formData.organizationType === 'repair' ? 'Ремонтная организация' : 'Завод-изготовитель'}`, { continued: false });
    doc.moveDown();

    // Нормативы
    if (formData.norms.length > 0) {
      doc.fontSize(12);
      doc.text('Нормативы испытаний:', { continued: false });
      doc.fontSize(10);
      formData.norms.forEach(norm => {
        doc.text(`• ${norm}`, { continued: false });
      });
      doc.moveDown();
    }

    // Конструктивные особенности
    if (formData.constructionFeatures.length > 0) {
      doc.fontSize(12);
      doc.text('Конструктивные особенности:', { continued: false });
      doc.fontSize(10);
      formData.constructionFeatures.forEach(feature => {
        doc.text(`• ${feature}`, { continued: false });
      });
      doc.moveDown();
    }

    // Технические параметры машин
    if (formData.kspemMachines.length > 0) {
      doc.fontSize(12);
      doc.text('Технические параметры машин:', { continued: false });
      doc.fontSize(10);
      formData.kspemMachines.forEach((machine, index) => {
        doc.text(`${index + 1}. ${machine.type}:`, { continued: false });
        doc.text(`   - Мощность: ${machine.power} кВт`, { continued: false });
        doc.text(`   - Напряжение: ${machine.voltage} кВ`, { continued: false });
        doc.text(`   - Скорость: ${machine.speed} об/мин`, { continued: false });
        if (machine.excitationUI) {
          doc.text(`   - U и I обмотки возбуждения: ${machine.excitationUI}`, { continued: false });
        }
        doc.moveDown(0.5);
      });
      doc.moveDown();
    }

    // Способы регулировки
    if (formData.regulationMethods.length > 0) {
      doc.fontSize(12);
      doc.text('Способы регулировки напряжения:', { continued: false });
      doc.fontSize(10);
      formData.regulationMethods.forEach(method => {
        doc.text(`• ${method}`, { continued: false });
      });
      doc.moveDown();
    }

    // Технические требования
    if (formData.power || formData.area || formData.mobile || formData.accuracy) {
      doc.fontSize(12);
      doc.text('Технические требования к стенду:', { continued: false });
      doc.fontSize(10);
      if (formData.power) doc.text(`• Потребляемая мощность: ${formData.power}`, { continued: false });
      if (formData.area) doc.text(`• Занимаемая площадь: ${formData.area}`, { continued: false });
      if (formData.mobile) doc.text(`• Мобильность: ${formData.mobile}`, { continued: false });
      if (formData.accuracy) doc.text(`• Точность СИ: ${formData.accuracy}`, { continued: false });
      doc.moveDown();
    }

    // Перечень опытов
    if (formData.tests.length > 0) {
      doc.fontSize(12);
      doc.text('Перечень опытов:', { continued: false });
      doc.fontSize(10);
      formData.tests.forEach(test => {
        doc.text(`• ${test}`, { continued: false });
      });
      doc.moveDown();
    }

    // Дополнительные требования
    if (formData.additionalTests) {
      doc.fontSize(12);
      doc.text('Дополнительные требования:', { continued: false });
      doc.fontSize(10);
      doc.text(formData.additionalTests, { continued: false });
      doc.moveDown();
    }

    // Подпись и дата
    doc.moveDown(2);
    doc.fontSize(10);
    const currentDate = new Date().toLocaleDateString('ru-RU');
    doc.text(`Дата создания: ${currentDate}`, { align: 'right' });

    // Завершаем создание документа
    doc.end();
  });
}; 