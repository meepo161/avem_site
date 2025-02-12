import React from 'react';
import { FormState } from '../types';

interface FormFieldsProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const BasicFormFields: React.FC<FormFieldsProps> = ({ formState, setFormState }) => (
  <div className="space-y-3">
    <div>
      <label className="block text-sm text-gray-600 mb-1">
        Наименование организации
      </label>
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={formState.organization}
        onChange={(e) => setFormState(prev => ({...prev, organization: e.target.value}))}
        required
      />
    </div>

    <div>
      <label className="block text-sm text-gray-600 mb-1">
        Контактное лицо (ФИО, должность)
      </label>
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={formState.contactPerson}
        onChange={(e) => setFormState(prev => ({...prev, contactPerson: e.target.value}))}
        required
      />
    </div>

    <div>
      <label className="block text-sm text-gray-600 mb-1">
        Контактные данные (Телефон, email)
      </label>
      <input
        type="text"
        className="w-full p-2 border rounded"
        value={formState.contactDetails}
        onChange={(e) => setFormState(prev => ({...prev, contactDetails: e.target.value}))}
        required
      />
    </div>

    <div>
      <label className="block text-sm text-gray-600 mb-1">
        Дата поставки
      </label>
      <input
        type="date"
        className="w-full p-2 border rounded"
        value={formState.deliveryDate}
        onChange={(e) => setFormState(prev => ({...prev, deliveryDate: e.target.value}))}
        required
      />
    </div>
  </div>
); 