export interface BaseQuestionnaireFields {
  organizationName: string;
  contactPerson: {
    name: string;
    position: string;
    phone: string;
    email: string;
  };
  projectName: string;
  deliveryDate: string;
  additionalRequirements: string;
}

// Опросный лист для высоковольтных установок
export interface HighVoltageQuestionnaireFields extends BaseQuestionnaireFields {
  testObject: {
    type: string;
    voltage: string;
    current: string;
    capacity: string;
  };
  testParameters: {
    maxTestVoltage: string;
    testDuration: string;
    frequency: string;
  };
  specialRequirements: {
    mobility: boolean;
    automation: boolean;
    protocolGeneration: boolean;
  };
}

// Опросный лист для измерительных приборов
export interface MeasurementQuestionnaireFields extends BaseQuestionnaireFields {
  measurementType: string[];
  accuracyClass: string;
  measurementRange: {
    min: string;
    max: string;
    units: string;
  };
  environmentalConditions: {
    temperature: string;
    humidity: string;
    pressure: string;
  };
}

// Опросный лист для нагрузочных устройств
export interface LoadDeviceQuestionnaireFields extends BaseQuestionnaireFields {
  loadParameters: {
    maxCurrent: string;
    maxVoltage: string;
    loadType: string[];
  };
  controlSystem: {
    manual: boolean;
    automated: boolean;
    remote: boolean;
  };
  coolingSystem: string;
}

export type QuestionnaireFields = 
  | BaseQuestionnaireFields 
  | HighVoltageQuestionnaireFields 
  | MeasurementQuestionnaireFields 
  | LoadDeviceQuestionnaireFields; 