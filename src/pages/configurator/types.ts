export interface FormState {
  organization: string;
  contactPerson: string;
  contactDetails: string;
  deliveryDate: string;
  organizationType: 'repair' | 'manufacturer' | '';
  norms: string[];
  constructionFeatures: string[];
  regulationMethods: string[];
  tests: string[];
  additionalTests: string;
  power: string;
  area: string;
  mobile: string;
  accuracy: string;
  transformerTypes: string[];
  kspemMachines: {
    type: string;
    power: string;
    voltage: string;
    speed: string;
    excitationUI: string;
  }[];
  kspadMachines: {
    type: string;
    power: string;
    voltage: string;
    speed: string;
    phaseRotor: string;
    coolingType: string;
  }[];
  ksptTransformers: {
    type: string;
    powerRange: string;
    voltageClass: string;
    taps: string;
    windings: string;
    lowVoltages: string;
    highVoltages: string;
    coolingType: string[];
  }[];
}

export interface ProductRecommendation {
  id: string;
  title: string;
  image: string;
  description: string;
  characteristics?: Record<string, string>;
  features?: string[];
  price?: string;
}

export interface ConfiguratorStep {
  title: string;
  options: {
    label: string;
    productId?: string;
    characteristics?: Record<string, string>;
    nextStep?: ConfiguratorStep[];
  }[];
} 