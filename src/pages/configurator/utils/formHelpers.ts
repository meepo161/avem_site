import { FormState } from '../types';

export const initialFormState: FormState = {
  organization: '',
  contactPerson: '',
  contactDetails: '',
  deliveryDate: '',
  organizationType: '',
  norms: [],
  constructionFeatures: [],
  regulationMethods: [],
  tests: [],
  additionalTests: '',
  power: '',
  area: '',
  mobile: '',
  accuracy: '',
  transformerTypes: [],
  kspemMachines: [],
  kspadMachines: [],
  ksptTransformers: []
};

export const validateForm = (formState: FormState): string | null => {
  if (!formState.organization.trim()) {
    return 'Укажите наименование организации';
  }
  if (!formState.contactPerson.trim()) {
    return 'Укажите контактное лицо';
  }
  if (!formState.contactDetails.trim()) {
    return 'Укажите контактные данные';
  }
  if (!formState.deliveryDate) {
    return 'Укажите дату поставки';
  }
  return null;
};

export const prepareFormData = (formState: FormState) => {
  return {
    ...formState,
    submissionDate: new Date().toISOString(),
    // Здесь можно добавить дополнительную обработку данных перед отправкой
  };
}; 