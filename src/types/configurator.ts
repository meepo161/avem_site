interface BaseFormState {
  organization: string;
  contactPerson: string;
  contactDetails: string;
  deliveryDate: string;
  additionalTests: string;
}

export interface KSPADMachine {
  type: string;
  power: string;
  voltage: string;
  speed: string;
  phaseRotor: 'фазный' | 'короткозамкнутый';
  coolingType: 'естественное' | 'принудительное';
}

export interface KSPADFormState extends BaseFormState {
  organizationType: 'repair' | 'manufacturer';
  tests: string[];
  standards: string[];
  constructiveFeatures: string[];
  machineTypes: string[];
  technicalParams: {
    [key: string]: string;
  };
  voltageRegulation: string;
  standRequirements: {
    operatingMode: string;
    powerConsumption: string;
    area: string;
    measurementAccuracy: string;
    mobility: string;
  };
  kspadMachines: Array<KSPADMachine>;
}

export interface KSPEMMachine {
  type: string;
  power: string;
  voltage: string;
  speed: string;
  phaseRotor?: string;
  excitationUI?: string;
}

export interface KSPEMFormState extends BaseFormState {
  norms: string[];
  constructionFeatures: string[];
  regulationMethods: string[];
  power: string;
  area: string;
  mobile: string;
  accuracy: string;
  organizationType: 'repair' | 'manufacturer';
  tests: string[];
  kspemMachines: Array<KSPEMMachine>;
}

export interface KSPTTransformer {
  type: string;
  powerRange: string;
  voltageClass: string;
  taps: string;
  windings: string;
  lowVoltages: string;
  highVoltages: string;
  coolingType: string[];
}

export interface KSPTFormState extends BaseFormState {
  transformerTypes: string[];
  automationLevels: string[];
  ksptTransformers: Array<KSPTTransformer>;
}

export interface VIU100RTestObject {
  type: 'кабель' | 'электродвигатель' | 'трансформатор' | 'разрядник' | 'изолятор' | 'высоковольтный аппарат' | string;
  ratedVoltage: string;              // Номинальное напряжение
  testVoltage: string;              // Испытательное напряжение
  testDuration: string;             // Длительность испытания
  materialType?: string;            // Тип материала изоляции
  length?: string;                  // Длина кабеля
  quantity?: string;                // Количество
}

export interface VIU100RFormState extends BaseFormState {
  testObjects: VIU100RTestObject[];  // Объекты испытаний
  
  standards: {                       // Нормативы испытаний
    gosts: string[];                // ГОСТы
    pue: boolean;                   // ПУЭ
    other: string[];               // Другие нормативы
  };

  requiredTests: {                  // Требуемые виды испытаний
    highVoltageAC: boolean;        // Испытания повышенным напряжением переменного тока
    highVoltageDC: boolean;        // Испытания повышенным напряжением постоянного тока
    insulationResistance: boolean;  // Измерение сопротивления изоляции
    dielectricLoss: boolean;       // Измерение тангенса угла диэлектрических потерь
    partialDischarge: boolean;     // Измерение уровня частичных разрядов
    other: string[];               // Другие виды испытаний
  };

  voltageParameters: {             // Параметры испытательного напряжения
    acVoltage: {                  // Переменное напряжение
      required: boolean;          // Требуется
      maxVoltage: string;        // Максимальное значение (кВ)
      regulationType: 'плавная' | 'ступенчатая';  // Тип регулировки
    };
    dcVoltage: {                  // Постоянное напряжение
      required: boolean;          // Требуется
      maxVoltage: string;        // Максимальное значение (кВ)
      regulationType: 'плавная' | 'ступенчатая';  // Тип регулировки
      ripplePercent?: string;    // Коэффициент пульсаций (%)
    };
  };

  currentMeasurement: {           // Измерение тока
    maxCurrentAC: string;        // Максимальный ток переменного напряжения (мА)
    maxCurrentDC: string;        // Максимальный ток постоянного напряжения (мА)
    sensitivity: string;         // Чувствительность (мкА)
  };

  powerSupply: {                  // Параметры питающей сети
    voltage: string;             // Напряжение питания (В)
    frequency: string;           // Частота (Гц)
    phases: '1' | '3';          // Количество фаз
    maxPower: string;           // Максимальная потребляемая мощность (кВА)
  };

  operatingConditions: {          // Условия эксплуатации
    temperature: {               // Температура
      min: string;              // Минимальная (°C)
      max: string;              // Максимальная (°C)
    };
    humidity: string;           // Влажность (%)
    altitude: string;           // Высота над уровнем моря (м)
    placement: 'внутреннее' | 'наружное' | 'комбинированное';  // Размещение
  };

  design: {                      // Конструктивное исполнение
    mobility: 'стационарное' | 'передвижное' | 'мобильное';  // Мобильность
    protectionClass: string;    // Степень защиты (IP)
    dimensions: {              // Габаритные размеры
      maxLength: string;       // Максимальная длина (мм)
      maxWidth: string;        // Максимальная ширина (мм)
      maxHeight: string;       // Максимальная высота (мм)
    };
    maxWeight: string;         // Максимальная масса (кг)
  };

  control: {                     // Управление
    type: 'ручное' | 'автоматическое' | 'комбинированное';  // Тип управления
    interface: 'сенсорный' | 'кнопочный' | 'комбинированный';  // Интерфейс управления
    remote: boolean;            // Удаленное управление
    protocol?: string;         // Протокол связи
  };

  measurement: {                 // Измерения
    displayType: 'цифровой' | 'стрелочный' | 'комбинированный';  // Тип индикации
    accuracy: string;          // Класс точности
    dataLogging: boolean;      // Регистрация данных
    reportGeneration: boolean; // Формирование протоколов
  };

  safety: {                     // Безопасность
    interlocks: boolean;       // Блокировки безопасности
    emergencyStop: boolean;    // Аварийный останов
    warningSystem: boolean;    // Система оповещения
    groundingControl: boolean; // Контроль заземления
  };

  additionalOptions: string[];   // Дополнительные опции
  specialRequirements: string;   // Особые требования
}

export type FormState = KSPADFormState | KSPEMFormState | KSPTFormState | VIU100RFormState; 