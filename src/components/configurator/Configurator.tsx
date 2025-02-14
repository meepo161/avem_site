import React, { useState } from 'react';
import { Product } from '@/types/products';
import { ConfiguratorOption } from '@/types/configurator';
import { configuratorSteps } from '@/data/configuratorSteps';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import HeroSection from '@/components/HeroSection';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

// Добавим интерфейс для шага конфигуратора
interface ConfiguratorStep {
  id: string;
  title: string;
  description?: string;
  options: ConfiguratorOption[];
}

const Configurator: React.FC = () => {
  const [selections, setSelections] = useState<Array<{
    stepId: string;
    selectedOption: ConfiguratorOption;
  }>>([{ stepId: 'initial', selectedOption: {} as ConfiguratorOption }]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOptionSelect = (stepId: string, option: ConfiguratorOption) => {
    const currentIndex = selections.findIndex(s => s.stepId === stepId);
    const newSelections = selections.slice(0, currentIndex + 1);
    
    if (option.productId) {
      const product = products.find(p => p.id === option.productId);
      if (product) {
        setSelectedProduct(product);
      }
    } else if (option.nextStep) {
      newSelections.push({
        stepId: option.nextStep,
        selectedOption: {} as ConfiguratorOption
      });
      setSelections(newSelections);
    }
    
    newSelections[currentIndex].selectedOption = option;
    setSelections([...newSelections]);
  };

  return (
    <Layout>
      <HeroSection
        title="Конфигуратор оборудования"
        subtitle="Подберите оптимальное решение для ваших задач"
        image="/images/hero/configurator-bg.jpg"
      />

      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Левая часть - конфигуратор */}
            <div className="lg:w-1/2 space-y-6">
              {selections.map((selection, index) => {
                const step = configuratorSteps[selection.stepId] as ConfiguratorStep;
                
                // Проверяем наличие шага
                if (!step) {
                  console.error(`Step not found for stepId: ${selection.stepId}`);
                  return null;
                }

                const isLastStep = index === selections.length - 1;

                return (
                  <div
                    key={selection.stepId}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden
                      ${!isLastStep && selection.selectedOption.id ? 'border-l-4 border-blue-500' : ''}`}
                  >
                    <div className="p-6">
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {step.title}
                        </h2>
                        {step.description && (
                          <p className="mt-1 text-gray-600">{step.description}</p>
                        )}
                      </div>

                      {!isLastStep && selection.selectedOption.id ? (
                        <div className="flex items-center justify-between">
                          <span className="text-blue-600 font-medium">
                            Выбрано: {selection.selectedOption.name}
                          </span>
                          <button
                            onClick={() => setSelections(selections.slice(0, index + 1))}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Изменить выбор
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-4">
                          {step.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => handleOptionSelect(selection.stepId, option)}
                              className="group relative bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-all duration-200 text-left w-full"
                            >
                              <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                                {option.name}
                              </h3>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <svg 
                                  className="h-5 w-5 text-gray-400 group-hover:text-blue-500" 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 20 20" 
                                  fill="currentColor"
                                >
                                  <path 
                                    fillRule="evenodd" 
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                                    clipRule="evenodd" 
                                  />
                                </svg>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Правая часть - карточка продукта */}
            <div className="lg:w-1/2 lg:sticky lg:top-24 lg:self-start">
              {selectedProduct ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    id={selectedProduct.id}
                    title={selectedProduct.name}
                    description={selectedProduct.description}
                    image={selectedProduct.image}
                    category={selectedProduct.category}
                  />
                </motion.div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
                  <svg 
                    className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                    />
                  </svg>
                  <p className="text-lg">
                    Выберите параметры для подбора оборудования
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Configurator; 