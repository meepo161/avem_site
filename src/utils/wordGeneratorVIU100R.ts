import PizZip from 'pizzip';

interface VIU100RFormData {
  organization: string;
  contactPerson: string;
  contactDetails: string;
  deliveryDate: string;
  viu100r?: {
    testObjects: string[];           // Объекты испытаний
    testVoltage: string;            // Испытательное напряжение
    testCurrent: string;            // Испытательный ток
    frequency: string;              // Частота испытательного напряжения
    operatingMode: string;          // Режим работы
    controlType: string;            // Тип управления
    mobility: string;               // Мобильность установки
    powerSupply: string;           // Параметры питающей сети
    additionalOptions: string[];    // Дополнительные опции
    specialRequirements: string;    // Особые требования
  };
  additionalTests?: string;
}

export async function generateVIU100RWord(data: VIU100RFormData): Promise<Buffer> {
  try {
    console.log('Начало генерации Word документа');
    
    const zip = new PizZip();

    zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>`);

    zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

    zip.file('word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`);

    zip.file('word/styles.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:pPr>
      <w:spacing w:before="240" w:after="120"/>
      <w:jc w:val="center"/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
      <w:b/>
      <w:sz w:val="26"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:pPr>
      <w:spacing w:line="276" w:lineRule="auto"/>
      <w:contextualSpacing/>
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
      <w:sz w:val="22"/>
      <w:szCs w:val="22"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="ListParagraph">
    <w:name w:val="List Paragraph"/>
    <w:basedOn w:val="Normal"/>
    <w:pPr>
      <w:ind w:left="720"/>
      <w:contextualSpacing/>
    </w:pPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="heading 2"/>
    <w:basedOn w:val="Normal"/>
    <w:pPr>
      <w:spacing w:before="200" w:after="100"/>
    </w:pPr>
    <w:rPr>
      <w:b/>
      <w:sz w:val="24"/>
    </w:rPr>
  </w:style>
</w:styles>`);

    const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading1"/></w:pPr>
      <w:r><w:t>ОПРОСНЫЙ ЛИСТ</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading1"/></w:pPr>
      <w:r><w:t>Высоковольтная испытательная установка ВИУ-100Р</w:t></w:r>
    </w:p>
    
    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>1. Информация о заказчике</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>Организация: ${data.organization || 'Не указана'}</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>Контактное лицо: ${data.contactPerson || 'Не указано'}</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>Контактные данные: ${data.contactDetails || 'Не указаны'}</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>Дата поставки: ${data.deliveryDate || 'Не указана'}</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>2. Объекты испытаний</w:t></w:r>
    </w:p>
    ${(data.viu100r?.testObjects || []).map(object => `
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>• ${object}</w:t></w:r>
    </w:p>`).join('')}

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>3. Параметры испытаний</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>Испытательное напряжение: ${data.viu100r?.testVoltage || 'Не указано'}</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>Испытательный ток: ${data.viu100r?.testCurrent || 'Не указан'}</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>Частота испытательного напряжения: ${data.viu100r?.frequency || 'Не указана'}</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>4. Конструктивное исполнение</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>Режим работы: ${data.viu100r?.operatingMode ? {
        'manual': 'Ручной',
        'automatic': 'Автоматический',
        'combined': 'Комбинированный'
      }[data.viu100r.operatingMode] || data.viu100r.operatingMode : 'Не указан'}</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>Тип управления: ${data.viu100r?.controlType ? {
        'local': 'Местное',
        'remote': 'Дистанционное',
        'combined': 'Комбинированное'
      }[data.viu100r.controlType] || data.viu100r.controlType : 'Не указан'}</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>Мобильность установки: ${data.viu100r?.mobility ? {
        'stationary': 'Стационарное',
        'mobile': 'Мобильное',
        'portable': 'Переносное'
      }[data.viu100r.mobility] || data.viu100r.mobility : 'Не указана'}</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>5. Параметры питающей сети</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>${data.viu100r?.powerSupply || 'Не указаны'}</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>6. Дополнительные опции</w:t></w:r>
    </w:p>
    ${(data.viu100r?.additionalOptions || []).map(option => `
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>• ${option}</w:t></w:r>
    </w:p>`).join('')}

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>7. Особые требования</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>${data.viu100r?.specialRequirements || 'Не указаны'}</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>8. Дополнительные требования</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>${data.additionalTests || 'Не указаны'}</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:pStyle w:val="Normal"/><w:spacing w:before="400"/></w:pPr>
      <w:r><w:t>Дата создания: ${new Date().toLocaleDateString('ru-RU')}</w:t></w:r>
    </w:p>
  </w:body>
</w:document>`;

    zip.file('word/document.xml', documentXml);

    const buffer = zip.generate({
      type: 'nodebuffer',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      compression: 'DEFLATE'
    });

    console.log('Word документ успешно сгенерирован');
    return buffer;
  } catch (error) {
    console.error('Ошибка при генерации Word документа:', error);
    throw error;
  }
} 