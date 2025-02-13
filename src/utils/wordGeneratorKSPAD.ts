import PizZip from 'pizzip';

interface FormData {
  organization: string;
  contactPerson: string;
  contactDetails: string;
  deliveryDate: string;
  norms: string[];
  constructionFeatures: string[];
  regulationMethods: string[];
  power: string;
  area: string;
  mobile: string;
  accuracy: string;
  kspadMachines: Array<{
    type: string;
    power: string;
    voltage: string;
    speed: string;
    phaseRotor: string;
    coolingType: string;
  }>;
  tests: string[];
  additionalTests: string;
  standRequirements?: {
    operatingMode: string;
    powerConsumption: string;
    area: string;
    measurementAccuracy: string;
    mobility: string;
  };
  voltageRegulation?: string;
  organizationType: string;
}

export async function generateWord(data: FormData): Promise<Buffer> {
  try {
    console.log('Начало генерации Word документа для КСПАД');
    
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

    const normsText = data.norms.map(norm => `• ${norm}`).join('\n');
    const constructionFeaturesText = data.constructionFeatures.map(feature => `• ${feature}`).join('\n');
    const regulationMethodsText = data.regulationMethods.map(method => `• ${method}`).join('\n');
    const testsText = data.tests.map(test => `• ${test}`).join('\n');
    const machinesText = data.kspadMachines.map(machine => `
${machine.type}
- Мощность: ${machine.power} кВт
- Напряжение: ${machine.voltage} В
- Скорость: ${machine.speed} об/мин
- Тип ротора: ${machine.phaseRotor}
- Тип охлаждения: ${machine.coolingType}`
    ).join('\n\n');

    const technicalRequirementsText = `
- Режим работы: ${data.standRequirements?.operatingMode || 'Не указан'}
- Потребляемая мощность: ${data.standRequirements?.powerConsumption || 'Не указана'}
- Занимаемая площадь: ${data.standRequirements?.area || 'Не указана'}
- Точность СИ: ${data.standRequirements?.measurementAccuracy || 'Не указана'}
- Мобильность: ${data.standRequirements?.mobility || 'Не указана'}`;

    const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading1"/></w:pPr>
      <w:r><w:t>ОПРОСНЫЙ ЛИСТ</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="Heading1"/></w:pPr>
      <w:r><w:t>Комплексный стенд проверки асинхронных двигателей (КСПАД)</w:t></w:r>
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
      <w:pPr><w:pStyle w:val="Normal"/></w:pPr>
      <w:r><w:t>Тип организации: ${data.organizationType === 'repair' ? 'Ремонтная организация' : 'Завод-изготовитель'}</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>2. Нормативы испытаний</w:t></w:r>
    </w:p>
    ${normsText.split('\n').map(line => `
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>${line}</w:t></w:r>
    </w:p>`).join('')}

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>3. Конструктивные особенности</w:t></w:r>
    </w:p>
    ${constructionFeaturesText.split('\n').map(line => `
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>${line}</w:t></w:r>
    </w:p>`).join('')}

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>4. Параметры испытуемых двигателей</w:t></w:r>
    </w:p>
    ${machinesText.split('\n').map(line => line.trim() ? `
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r>
        <w:rPr>${line.startsWith('-') ? '' : '<w:b/>'}</w:rPr>
        <w:t>${line}</w:t>
      </w:r>
    </w:p>` : '').join('')}

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>5. Способ регулировки напряжения</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>${data.voltageRegulation || 'Не указан'}</w:t></w:r>
    </w:p>

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>6. Технические требования к стенду</w:t></w:r>
    </w:p>
    ${technicalRequirementsText.split('\n').map(line => line.trim() ? `
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>${line}</w:t></w:r>
    </w:p>` : '').join('')}

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>7. Перечень испытаний</w:t></w:r>
    </w:p>
    ${testsText.split('\n').map(line => `
    <w:p>
      <w:pPr><w:pStyle w:val="ListParagraph"/></w:pPr>
      <w:r><w:t>${line}</w:t></w:r>
    </w:p>`).join('')}

    <w:p>
      <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
      <w:r><w:t>8. Дополнительные требования</w:t></w:r>
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

    console.log('Word документ для КСПАД успешно сгенерирован');
    return buffer;
  } catch (error) {
    console.error('❌ Ошибка при генерации Word документа:', error);
    throw error;
  }
} 