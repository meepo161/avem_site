import React, { useState } from 'react';
import { Product } from '@/types/products';
import { QuestionnaireFields } from '@/types/questionnaire';
import { motion } from 'framer-motion';

interface QuestionnaireFormProps {
  product: Product;
  onClose: () => void;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState<QuestionnaireFields>({
    // Базовые поля
    organizationName: '',
    contactPerson: {
      name: '',
      position: '',
      phone: '',
      email: '',
    },
    projectName: '',
    deliveryDate: '',
    additionalRequirements: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev };
      field.split('.').reduce((obj: any, key: string, index: number, arr: string[]) => {
        if (index === arr.length - 1) {
          obj[key] = value;
        } else {
          obj[key] = obj[key] || {};
        }
        return obj[key];
      }, newData);
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }
    
    try {
      // Здесь будет логика отправки данных
      console.log('Отправка данных:', formData);
      onClose();
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900">
            Опросный лист - {product.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Индикатор прогресса */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Шаг {currentStep} из {totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {currentStep === 1 ? 'Основная информация' : 'Технические параметры'}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {currentStep === 1 ? (
            /* Шаг 1: Основная информация */
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Название организации
                </label>
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => handleChange('organizationName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ФИО контактного лица
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson.name}
                    onChange={(e) => handleChange('contactPerson.name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Должность
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson.position}
                    onChange={(e) => handleChange('contactPerson.position', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPerson.phone}
                    onChange={(e) => handleChange('contactPerson.phone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactPerson.email}
                    onChange={(e) => handleChange('contactPerson.email', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Название проекта
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleChange('projectName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Планируемый срок поставки
                </label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleChange('deliveryDate', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            /* Шаг 2: Специализированные поля */
            <div className="space-y-6">
              {/* Импортируем и используем компонент QuestionnaireFields */}
              <QuestionnaireFields
                product={product}
                formData={formData}
                onChange={handleChange}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Дополнительные требования
                </label>
                <textarea
                  value={formData.additionalRequirements}
                  onChange={(e) => handleChange('additionalRequirements', e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end space-x-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Назад
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {currentStep < totalSteps ? 'Далее' : 'Отправить заявку'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default QuestionnaireForm; 