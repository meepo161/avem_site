import PizZip from 'pizzip';

interface VIU100RFormData {
  organization: string;
  contactPerson: string;
  contactDetails: string;
  deliveryDate: string;
  power: string; // Максимальное испытательное напряжение
  area: string; // Требуемый ток испытания
  transformerTypes: string[]; // Типы испытуемого оборудования
  tests: string[]; // Требуемые виды испытаний
  automationLevels: string[]; // Требования к системе управления
  regulationMethods: string[]; // Требования к безопасности
  additionalTests: string;
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
      <w:sz w:val="32"/>
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
      <w:sz w:val="24"/>
      <w:szCs w:val="24"/>
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
      <w:sz w:val="28"/>
    </w:rPr>
  </w:style>
</w:styles>`);

    const transformerTypesText = data.transformerTypes.map(type => `• ${type}`).join('\n');
    const testsText = data.tests.map(test => `• ${test}`).join('\n');
    const automationLevelsText = data.automationLevels.map(level => `• ${level}`).join('\n');
    const regulationMethodsText = data.regulationMethods.map(method => `• ${method}`).join('\n');

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
      <w:r><w:t>2. Параметры испытаний</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>Максимальное испытательное напряжение: ${data.power || 'Не указано'}</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>Требуемый ток испытания: ${data.area || 'Не указан'}</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>3. Типы испытуемого оборудования</w:t></w:r>
    </w:p>
    ${transformerTypesText.split('\n').map(line => `
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>${line}</w:t></w:r>
    </w:p>`).join('')}

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>4. Требуемые виды испытаний</w:t></w:r>
    </w:p>
    ${testsText.split('\n').map(line => `
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>${line}</w:t></w:r>
    </w:p>`).join('')}

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>5. Требования к системе управления</w:t></w:r>
    </w:p>
    ${automationLevelsText.split('\n').map(line => `
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>${line}</w:t></w:r>
    </w:p>`).join('')}

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>6. Требования к безопасности</w:t></w:r>
    </w:p>
    ${regulationMethodsText.split('\n').map(line => `
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>${line}</w:t></w:r>
    </w:p>`).join('')}

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>7. Дополнительные требования</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
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