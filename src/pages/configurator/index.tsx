import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/HeroSection';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

type ConfigStep = {
  title: string;
  options: {
    label: string;
    productId?: string;
    characteristics?: Record<string, string>;
    nextStep?: ConfigStep[];
  }[];
};

interface ProductRecommendation {
  id: string;
  title: string;
  image: string;
  description: string;
  features: string[];
  price: string;
  range?: string;
  characteristics?: Record<string, string>;
}

interface KSPEMMachine {
  type: string;
  power: string;
  voltage: string;
  speed: string;
  phaseRotor?: string;
}

interface FormState {
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
  organizationType: string;
  machines: Array<{
    type: string;
    power: string;
    voltage: string;
    speed: string;
    excitationUI?: string;
  }>;
  tests: string[];
  kspemMachines: Array<{
    type: string;
    power: string;
    voltage: string;
    speed: string;
    excitationUI?: string;
  }>;
  kspadMachines: Array<{
    type: string;
    phaseRotor: string;
    power: string;
    voltage: string;
    speed: string;
  }>;
  ksptTransformers: Array<{
    type: string;
    powerRange: string;
    voltageClass: string;
    taps: string;
    windings: string;
    lowVoltages: string;
    highVoltages: string;
    coolingType: string;
  }>;
  transformerTypes: string[];
  automationLevels: string[];
  additionalTests: string;
}

const configurationSteps: ConfigStep[] = [
  {
    title: "Тип оборудования",
    options: [
      { 
        label: "Измерительные приборы",
        nextStep: [
          {
            title: "Измеряемая величина",
            options: [
              { 
                label: "Напряжение",
                nextStep: [
                  {
                    title: "Диапазон измерений",
                    options: [
                      { 
                        label: "0-10 В", 
                        productId: "avem-4",
                        characteristics: { 
                          "Модификация": "АВЭМ-4-01",
                          "Диапазон постоянного тока": "0,005-10 В",
                          "Погрешность постоянного тока": "±0,1%",
                          "Диапазон переменного тока": "0,005-10 В",
                          "Погрешность переменного тока": "±0,1%"
                        }
                      },
                      { 
                        label: "0-100 В", 
                        productId: "avem-4",
                        characteristics: { 
                          "Модификация": "АВЭМ-4-02",
                          "Диапазон постоянного тока": "0,01-100 В",
                          "Погрешность постоянного тока": "±0,1%",
                          "Диапазон переменного тока": "0,01-100 В",
                          "Погрешность переменного тока": "±0,1%"
                        }
                      },
                      { 
                        label: "0-1000 В", 
                        productId: "avem-4",
                        characteristics: { 
                          "Модификация": "АВЭМ-4-03",
                          "Диапазон постоянного тока": "0,1-1000 В",
                          "Погрешность постоянного тока": "±0,1%",
                          "Диапазон переменного тока": "0,1-1000 В",
                          "Погрешность переменного тока": "±0,1%"
                        }
                      },
                      { 
                        label: "0-4500 В", 
                        productId: "avem-3",
                        characteristics: { 
                          "Модификация": "АВЭМ-3-04",
                          "Диапазон постоянного тока": "0,5-4500 В",
                          "Погрешность постоянного тока": "±0,25%",
                          "Диапазон переменного тока": "0,5-4500 В",
                          "Погрешность переменного тока": "±0,5%"
                        }
                      },
                    ]
                  }
                ]
              },
              { label: "Ток",
                nextStep: [
                  {
                    title: "Диапазон измерений",
                    options: [
                      { 
                        label: "0-100 мА", 
                        productId: "avem-7",
                        characteristics: { 
                          "Модификация": "АВЭМ-7-100",
                          "Диапазон постоянного тока": "0.002─100 мА",
                          "Погрешность постоянного тока": "±0,5%",
                          "Диапазон переменного тока": "0.03─100 мА",
                          "Погрешность переменного тока": "±0,5%"
                        }
                      },
                      { 
                        label: "0-5000 мА", 
                        productId: "avem-7",
                        characteristics: { 
                          "Модификация": "АВЭМ-7-5000",
                          "Диапазон постоянного тока": "50─5000 мА",
                          "Погрешность постоянного тока": "±0,5%",
                          "Диапазон переменного тока": "50─5000 мА",
                          "Погрешность переменного тока": "±0,5%"
                        }
                      },
                    ]
                  }
                ] },
              { label: "Сопротивление",
                nextStep: [
                  {
                    title: "Тип сопротивления",
                    options: [
                      { 
                        label: "Активное сопротивление", 
                        productId: "ikas-10",
                        characteristics: { 
                          "Модификация": "ИКАС-10",
                          "Диапазон измерений": "от 0,000001 до 10000 Ом",
                          "Погрешность измерений": "±0,1%"
                        }
                      },
                      { 
                        label: "Сопротивление изоляции", 
                        productId: "avem-9",
                        characteristics: { 
                          "Модификация": "АВЭМ-9",
                          "Диапазон измерений": "300 кОм – 100 ГОм",
                          "Измерительное напряжение, В": "500, 1000, 2500",
                          "Погрешность измерений": "±1,5%"
                        }
                      },
                    ]
                  }
                ]  },
              { 
                label: "Физические величины",
                productId: "sum-1",
                characteristics: { 
                  "Измерение": "Напряжение и сила постоянного тока, напряжение и сила переменного тока, электрическое сопротивление, количество импульсов, частота",
                  "Преобразования": "Из первичных величин в физические величины",
                  "Результаты измерений": "Регистрация, архивирование, отображение, вывод",
                }
              },
            ]
          }
        ]
      },
      { 
        label: "Испытательные установки",
        nextStep: [
          {
            title: "Назначение установки",
            options: [
              { 
                label: "Электрические машины",
                nextStep: [
                  {
                    title: "Тип стенда",
                    options: [
                      { 
                        label: "КСПЭМ (Комплексный стенд проверки электрических машин)",
                        productId: "kspem"
                      },
                    ]
                  }
                ]
              },
              { 
                label: "Асинхронные двигатели",
                nextStep: [
                  {
                    title: "Тип стенда",
                    options: [
                      { 
                        label: "КСПАД (Комплексный стенд проверки асинхронных двигателей)",
                        productId: "kspad"
                      },
                    ]
                  }
                ] 
              },
              { 
                label: "Трансформаторы",
                nextStep: [
                  {
                    title: "Тип стенда",
                    options: [
                      { 
                        label: "КСПТ (Комплексный стенд проверки трансформаторов)",
                        productId: "kspt"
                      },
                    ]
                  }
                ] 
              },
              { 
                label: "Высоковольтные испытания",
                nextStep: [
                  {
                    title: "Объект испытания",
                    options: [
                      { 
                        label: "Защитные средства",
                        nextStep: [
                          {
                            title: "Тип установки",
                            options: [
                              { 
                                label: "ЛИВС (Лаборатория испытательная высоковольтная стационарная)",
                                productId: "livs"
                              }
                            ]
                          }
                        ]
                      },
                      { label: "Электрооборудование" },
                      { label: "Генераторы" },
                      { label: "Кабели" }
                    ]
                  }
                ]
              },
              { label: "Механические" },
              { label: "Нагрузочные модули" },
              { label: "Электронные компоненты" },
              { label: "Гидравлические испытания" }
            ]
          }
        ]
      }
    ]
  }
];

interface SelectionCardProps {
  title: string;
  options: { label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const SelectionCard = ({ 
  title, 
  options, 
  selectedValue,
  onSelect 
}: SelectionCardProps) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
    <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option, index) => (
        <label 
          key={index}
          className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary-400 cursor-pointer transition-colors"
        >
          <input
            type="radio"
            name={title}
            value={option.label}
            className="form-radio h-5 w-5 text-primary-600"
            checked={selectedValue === option.label}
            onChange={() => onSelect(option.label)}
          />
          <span className="ml-3 text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const BasicFormFields = ({ formState, setFormState }: { 
  formState: FormState, 
  setFormState: React.Dispatch<React.SetStateAction<FormState>> 
}) => (
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

const ProductSummary = ({ product, formState }: { product: ProductRecommendation, formState: FormState }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="p-4 bg-gray-50 border-b">
      <h3 className="text-xl font-bold text-gray-800">{product.title}</h3>
    </div>
    
    <div className="p-4">
      <div className="relative h-48 mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      {product.characteristics && Object.entries(product.characteristics).map(([key, value]) => (
        <div key={key} className="mb-2 text-sm text-gray-600">
          <span className="font-medium text-gray-700">{key}:</span> {value}
        </div>
      ))}

      {/* Данные заказчика */}
      {formState.organization && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Данные заказчика</h4>
          <div className="space-y-2">
            <p className="text-sm"><span className="font-medium">Организация:</span> {formState.organization}</p>
            <p className="text-sm"><span className="font-medium">Контактное лицо:</span> {formState.contactPerson}</p>
            <p className="text-sm"><span className="font-medium">Контакты:</span> {formState.contactDetails}</p>
            <p className="text-sm"><span className="font-medium">Дата поставки:</span> {formState.deliveryDate}</p>
            {product.id === 'kspem' && (
              <p className="text-sm"><span className="font-medium">Тип организации:</span> {
                formState.organizationType === 'repair' ? 'Ремонтная организация' : 'Завод-изготовитель'
              }</p>
            )}
          </div>
        </div>
      )}

      {/* Нормативы */}
      {formState.norms.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Нормативы</h4>
          <ul className="list-disc pl-4 space-y-1">
            {formState.norms.map((norm, index) => (
              <li key={index} className="text-sm text-gray-600">{norm}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Конструктивные особенности */}
      {formState.constructionFeatures.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Конструктивные особенности</h4>
          <ul className="list-disc pl-4 space-y-1">
            {formState.constructionFeatures.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600">{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Технические параметры */}
      {formState.kspemMachines?.some(machine => machine?.power || machine?.voltage || machine?.speed || machine?.excitationUI) && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Технические параметры</h4>
          {formState.kspemMachines?.map((machine, index) => (
            machine?.power || machine?.voltage || machine?.speed || machine?.excitationUI ? (
              <div key={index} className="mb-3">
                <p className="text-sm font-medium text-gray-700">{machine?.type}</p>
                <div className="pl-4 space-y-1">
                  {machine?.power && <p className="text-sm text-gray-600">Мощность: {machine.power} кВт</p>}
                  {machine?.voltage && <p className="text-sm text-gray-600">Напряжение: {machine.voltage} кВ</p>}
                  {machine?.speed && <p className="text-sm text-gray-600">Скорость: {machine.speed} об/мин</p>}
                  {machine?.excitationUI && <p className="text-sm text-gray-600">U и I обмотки возбуждения: {machine.excitationUI}</p>}
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* Способы регулировки */}
      {formState.regulationMethods.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Способы регулировки</h4>
          <ul className="list-disc pl-4 space-y-1">
            {formState.regulationMethods.map((method, index) => (
              <li key={index} className="text-sm text-gray-600">{method}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Технические требования */}
      {(formState.power || formState.area || formState.mobile || formState.accuracy) && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Технические требования</h4>
          <div className="space-y-2">
            {formState.power && <p className="text-sm"><span className="font-medium">Потребляемая мощность:</span> {formState.power}</p>}
            {formState.area && <p className="text-sm"><span className="font-medium">Занимаемая площадь:</span> {formState.area}</p>}
            {formState.mobile && <p className="text-sm"><span className="font-medium">Мобильность:</span> {formState.mobile}</p>}
            {formState.accuracy && <p className="text-sm"><span className="font-medium">Точность СИ:</span> {formState.accuracy}</p>}
          </div>
        </div>
      )}

      {/* Перечень опытов */}
      {formState.tests.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Перечень опытов</h4>
          <ul className="list-disc pl-4 space-y-1">
            {formState.tests.map((test, index) => (
              <li key={index} className="text-sm text-gray-600">{test}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Дополнительные требования */}
      {formState.additionalTests && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Дополнительные требования</h4>
          <p className="text-sm text-gray-600">{formState.additionalTests}</p>
        </div>
      )}
    </div>
  </div>
);

interface ProductResultProps {
  product: ProductRecommendation;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  submitError: string | null;
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
}

const ProductResult = ({ 
  product, 
  formState, 
  setFormState,
  onSubmit,
  isSubmitting,
  submitError,
  isSubmitted,
  setIsSubmitted 
}: ProductResultProps) => {
  if (isSubmitted) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-primary-600">Заявка успешно отправлена!</h3>
        <p className="text-gray-600 mb-4">Мы получили вашу заявку и свяжемся с вами в ближайшее время.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors"
        >
          Вернуться к редактированию
        </button>
      </div>
    );
  }

  if (!(product.id === 'kspem' || product.id === 'kspad' || product.id === 'kspt')) {
    return null;
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6">Опросный лист</h3>
      
      <div className="space-y-6">
        {/* Основные данные для всех продуктов */}
        <div className="space-y-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Основные данные</h5>
          <BasicFormFields formState={formState} setFormState={setFormState} />
        </div>

        {/* Специфичные поля для КСПЭМ */}
        {product.id === 'kspem' && (
          <>
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Испытания должны проводиться согласно нормативам</h5>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'ГОСТ 11828-86', 'ГОСТ 53472-2009', 'ГОСТ Р (МЭК 60034-1-2014)',
                  'ГОСТ 7217-87', 'ГОСТ 31606-2012', 'ГОСТ Р (МЭК 60034-2-2009)',
                  'ГОСТ 11929-87', 'ГОСТ Р 51689-2000', 'ГОСТ 10159-79',
                  'ГОСТ 20815-93', 'EN 60204-1', 'ГОСТ 10169-77'
                ].map((norm, i) => (
                  <label key={i} className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600"
                      checked={formState.norms.includes(norm)}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        norms: e.target.checked ? [...prev.norms, norm] : prev.norms.filter(n => n !== norm)
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-700">{norm}</span>
                  </label>
                ))}
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Введите другие нормативы"
                  value={formState.additionalTests}
                  onChange={(e) => setFormState(prev => ({...prev, additionalTests: e.target.value}))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Конструктивные особенности объектов испытания</h5>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'На лапах', 'Фланцевые', 'На лапах с фланцем',
                  'Вертикальные', 'Конический вал', 'Цилиндрический вал'
                ].map((feature, i) => (
                  <label key={i} className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600"
                      checked={formState.constructionFeatures.includes(feature)}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        constructionFeatures: e.target.checked 
                          ? [...prev.constructionFeatures, feature] 
                          : prev.constructionFeatures.filter(f => f !== feature)
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Технические параметры объектов испытания</h5>
              {[
                'Асинхронные двигатели',
                'Асинхронные генераторы',
                'Синхронные двигатели',
                'Синхронные генераторы',
                'Двигатели постоянного тока',
                'Генераторы постоянного тока'
              ].map((type, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h6 className="font-medium mb-3">{type}</h6>
                  <div className="grid grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="Мощность, кВт"
                      className="p-2 border rounded"
                      value={formState.kspemMachines[index]?.power || ''}
                      onChange={(e) => {
                        const newMachines = [...formState.kspemMachines];
                        if (!newMachines[index]) {
                          newMachines[index] = { type, power: '', voltage: '', speed: '', excitationUI: '' };
                        }
                        newMachines[index].power = e.target.value;
                        setFormState(prev => ({...prev, kspemMachines: newMachines}));
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Напряжение, кВ"
                      className="p-2 border rounded"
                      value={formState.kspemMachines[index]?.voltage || ''}
                      onChange={(e) => {
                        const newMachines = [...formState.kspemMachines];
                        if (!newMachines[index]) {
                          newMachines[index] = { type, power: '', voltage: '', speed: '', excitationUI: '' };
                        }
                        newMachines[index].voltage = e.target.value;
                        setFormState(prev => ({...prev, kspemMachines: newMachines}));
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Скорость, об/мин"
                      className="p-2 border rounded"
                      value={formState.kspemMachines[index]?.speed || ''}
                      onChange={(e) => {
                        const newMachines = [...formState.kspemMachines];
                        if (!newMachines[index]) {
                          newMachines[index] = { type, power: '', voltage: '', speed: '', excitationUI: '' };
                        }
                        newMachines[index].speed = e.target.value;
                        setFormState(prev => ({...prev, kspemMachines: newMachines}));
                      }}
                    />
                    <input
                      type="text"
                      placeholder="U и I обмотки возбуждения"
                      className="p-2 border rounded"
                      value={formState.kspemMachines[index]?.excitationUI || ''}
                      onChange={(e) => {
                        const newMachines = [...formState.kspemMachines];
                        if (!newMachines[index]) {
                          newMachines[index] = { type, power: '', voltage: '', speed: '', excitationUI: '' };
                        }
                        newMachines[index].excitationUI = e.target.value;
                        setFormState(prev => ({...prev, kspemMachines: newMachines}));
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Способ регулировки / подачи напряжения</h5>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Плавный регулируемый',
                  'Плавный нерегулируемый',
                  'Ступенчатый',
                  'Прямое включение в сеть'
                ].map((method, i) => (
                  <label key={i} className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600"
                      checked={formState.regulationMethods.includes(method)}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        regulationMethods: e.target.checked 
                          ? [...prev.regulationMethods, method] 
                          : prev.regulationMethods.filter(m => m !== method)
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Технические требования к Стенду</h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Потребляемая мощность</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formState.power}
                    onChange={(e) => setFormState(prev => ({...prev, power: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Занимаемая площадь</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formState.area}
                    onChange={(e) => setFormState(prev => ({...prev, area: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Мобильность</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formState.mobile}
                    onChange={(e) => setFormState(prev => ({...prev, mobile: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Точность СИ</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formState.accuracy}
                    onChange={(e) => setFormState(prev => ({...prev, accuracy: e.target.value}))}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Тип организации</h5>
              <div className="grid grid-cols-1 gap-2">
                <label className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
                  <input
                    type="radio"
                    name="organizationType"
                    value="repair"
                    checked={formState.organizationType === 'repair'}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      organizationType: e.target.value,
                      tests: []
                    }))}
                    className="form-radio h-4 w-4 text-primary-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Для ремонтных организаций</span>
                </label>
                <label className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
                  <input
                    type="radio"
                    name="organizationType"
                    value="manufacturer"
                    checked={formState.organizationType === 'manufacturer'}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      organizationType: e.target.value,
                      tests: []
                    }))}
                    className="form-radio h-4 w-4 text-primary-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Для заводов-изготовителей</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Перечень опытов</h5>
              <div className="grid grid-cols-1 gap-2">
                {(formState.organizationType === 'repair' ? [
                  'Измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
                  'Измерение сопротивления изоляции встроенных термодатчиков относительно корпуса и между обмотками',
                  'Измерение сопротивления обмоток при постоянном токе в практически холодном состоянии',
                  'Измерение сопротивления встроенных термодатчиков при постоянном токе в практически холодном состоянии',
                  'Испытание электрической прочности изоляции обмотки относительно корпуса и между обмотками',
                  'Испытание электрической прочности изоляции встроенных термодатчиков относительно корпуса и между обмотками',
                  'Определение тока и потерь холостого хода с измерением скорости вращения',
                  'Определение тока и потерь короткого замыкания',
                  'Испытание электрической прочности междувитковой изоляции обмоток',
                  'Проверка уровня вибрации',
                  'Измерения температуры окружающей среды и частей электрической машины',
                  'Обкатка на холостом ходу',
                  'Проверка «беличьей клетки»',
                  'Проверка встроенных датчиков вращения',
                  'Определение коэффициента трансформации',
                  'Испытания под нагрузкой'
                ] : [
                  'Испытание на нагрев',
                  'Определение КПД',
                  'Определение коэффициента мощности',
                  'Определение скольжения',
                  'Испытание на кратковременную перегрузку по моменту',
                  'Испытание на кратковременную перегрузку по току',
                  'Определение максимального вращающего момента',
                  'Определение минимального вращающего момента в процессе пуска',
                  'Определение начального пускового вращающего момента',
                  'Определение начального пускового тока',
                  'Испытание при повышенной частоте вращения',
                  'Проверка уровня шума',
                  'Проверка работоспособности при изменении напряжения и частоты питающей сети',
                  'Определения момента инерции вращающихся частей'
                ]).map((test, i) => (
                  <label key={i} className="flex items-start w-full p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-4 w-4 text-primary-600 mt-1"
                      checked={formState.tests.includes(test)}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        tests: e.target.checked ? [...prev.tests, test] : prev.tests.filter(t => t !== test)
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-600 leading-tight">{test}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Специфичные поля для КСПАД */}
        {product.id === 'kspad' && (
          <>
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Перечень опытов</h5>
              <div className="grid grid-cols-1 gap-4">
                {[
                  'Измерение сопротивления изоляции обмоток',
                  'Испытание электрической прочности изоляции',
                  'Определение параметров холостого хода',
                  'Проверка вибрации и шума',
                  'Тестирование системы охлаждения',
                  'Проверка работы под нагрузкой'
                ].map((test, i) => (
                  <label key={i} className="flex items-start w-full p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-4 w-4 text-primary-600 mt-1"
                      checked={formState.tests.includes(test)}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        tests: e.target.checked ? [...prev.tests, test] : prev.tests.filter(t => t !== test)
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-600 leading-tight">{test}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Специфичные поля для КСПТ */}
        {product.id === 'kspt' && (
          <>
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Тип трансформатора</h5>
              <div className="grid grid-cols-1 gap-2">
                {['Сухой', 'Масляный', 'Элегазовый'].map((type, i) => (
                  <label key={i} className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-4 w-4 text-primary-600"
                      checked={formState.transformerTypes.includes(type)}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        transformerTypes: e.target.checked 
                          ? [...prev.transformerTypes, type] 
                          : prev.transformerTypes.filter(t => t !== type)
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Перечень опытов</h5>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Измерение сопротивления обмоток постоянному току (ГОСТ 3484.1-88)',
                  'Проверка коэффициента трансформации (ГОСТ 3484.1-88)',
                  'Проверка группы соединения обмоток (ГОСТ 3484.1-88)',
                  'Опыт короткого замыкания с измерением напряжения и потерь',
                  'Измерение сопротивления изоляции обмоток (ГОСТ 3484.3-88)',
                  'Опыт холостого хода с измерением тока и потерь',
                  'Испытание электрической прочности главной изоляции',
                  'Испытание продольной изоляции индуктированным напряжением',
                  'Измерение сопротивления нулевой последовательности',
                  'Испытание на нагрев',
                  'Испытание баков на плотность',
                  'Испытание трансформаторного масла',
                  'Испытание электрической прочности изоляции шпилек (ГОСТ 1516.1-75)',
                  'Измерение сопротивления межлистовой изоляции',
                  'Испытание на стойкость к токам короткого замыкания',
                  'Испытание грозовым импульсом'
                ].map((test, i) => (
                  <label key={i} className="flex items-start w-full p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-4 w-4 text-primary-600 mt-1"
                      checked={formState.tests.includes(test)}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        tests: e.target.checked ? [...prev.tests, test] : prev.tests.filter(t => t !== test)
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-600 leading-tight">{test}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Дополнительные требования для всех стендов */}
        <div className="space-y-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Дополнительные требования</h5>
          <textarea
            className="w-full p-2 border rounded focus:ring-primary-500 focus:border-primary-500"
            rows={3}
            placeholder="Укажите дополнительные требования и опыты..."
            value={formState.additionalTests}
            onChange={(e) => setFormState(prev => ({...prev, additionalTests: e.target.value}))}
          />
        </div>

        {/* Кнопки отправки и ошибки */}
        <div className="mt-8">
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 text-sm transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </button>
          
          {submitError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{submitError}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

// Обновим данные продуктов
const products: Record<string, ProductRecommendation> = {
  'sum-1': {
    id: 'sum-1',
    title: 'Система управления и мониторинга SUM-1',
    image: '/images/products/sum-1 (1).jpg',
    description: 'Универсальная система для комплексных измерений и управления',
    features: [],
    price: 'от 2 500 000 ₽',
    range: '1-4500 В'
  },
  'avem-3': {
    id: 'avem-3',
    title: 'АВЭМ-3',
    image: '/images/products/avem-3 (1).jpg',
    description: 'Высоковольный измерительный комплекс',
    features: [],
    price: 'от 1 250 000 ₽',
    range: '1-4500 В'
  },
  'avem-4': {
    id: 'avem-4',
    title: 'АВЭМ-4',
    image: '/images/products/avem-4 (1).png',
    description: 'Вольтметр',
    features: [],
    price: 'от 890 000 ₽',
    range: '0-1000 В'
  },
  'avem-7': {
    id: 'avem-7',
    title: 'АВЭМ-7',
    image: '/images/products/avem-7 (1).png',
    description: 'Амперметр',
    features: [],
    price: 'от 1 250 000 ₽',
    range: '0-5000 мА'
  },
  'ikas-10': {
    id: 'ikas-10',
    title: 'ИКАС-10',
    image: '/images/products/ikas (1).jpg',
    description: 'Измеритель сопротивления изоляции',
    features: [],
    price: 'от 1 250 000 ₽',
    range: '300 кОм – 100 ГОм'
  },
  'avem-9': {
    id: 'avem-9',
    title: 'АВЭМ-9',
    image: '/images/products/avem-9 (1).jpg',
    description: 'Измеритель сопротивления изоляции',
    features: [],
    price: 'от 1 250 000 ₽',
    range: '300 кОм – 100 ГОм'
  },
  'kspem': {
    id: 'kspem',
    title: 'Комплексный стенд проверки электрических машин КСПЭМ',
    image: '/images/products/kspem (7).jpg',
    description: 'Автоматизированный испытательный комплекс',
    features: [],
    price: 'от 5 000 00 ₽'
  },
  'kspad': {
    id: 'kspad',
    title: 'Комплексный стенд проверки асинхронных двигателей КСПАД',
    image: '/images/products/kspad (3).jpg',
    description: 'Специализированный стенд для испытаний асинхронных двигателей',
    features: [],
    price: 'от 4 500 000 ₽'
  },
  'kspt': {
    id: 'kspt',
    title: 'Комплексный стенд проверки трансформаторов КСПТ',
    image: '/images/products/КСПТ (1).jpg',
    description: 'Специализированный стенд для испытаний трансформаторов',
    features: [],
    price: 'от 4 800 000 ₽'
  },
  'livs': {
    id: 'livs',
    title: 'Лаборатория испытательная высоковольтная стационарная (ЛИВС)',
    image: '/images/products/ливс4.jpg',
    description: 'Комплекс для испытаний средств защиты в электроустановках',
    features: [],
    price: 'от 3 200 000 ₽'
  }
};

export default function ConfiguratorPage() {
  const [selectedPath, setSelectedPath] = useState<ConfigStep[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [formState, setFormState] = useState<FormState>({
    organization: '',
    contactPerson: '',
    contactDetails: '',
    deliveryDate: '',
    norms: [],
    constructionFeatures: [],
    regulationMethods: [],
    power: '',
    area: '',
    mobile: '',
    accuracy: '',
    organizationType: 'repair',
    machines: [{ type: 'Трехфазные', power: '', voltage: '', speed: '', excitationUI: '' }],
    tests: [],
    kspemMachines: [{ type: 'Трехфазные', power: '', voltage: '', speed: '', excitationUI: '' }],
    kspadMachines: [{ type: 'Трехфазные', phaseRotor: 'Да', power: '', voltage: '', speed: '' }],
    ksptTransformers: [{ 
      type: 'Силовой', 
      powerRange: '', 
      voltageClass: '', 
      taps: '', 
      windings: '',
      lowVoltages: '',
      highVoltages: '',
      coolingType: 'Масляное' 
    }],
    transformerTypes: [],
    automationLevels: [],
    additionalTests: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке формы');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Ошибка:', error);
      setSubmitError('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelect = (stepIndex: number, value: string) => {
    const currentStepConfig = stepIndex === 0 
      ? configurationSteps[0] 
      : selectedPath[stepIndex - 1];

    const selectedOption = currentStepConfig.options.find(opt => opt.label === value);
    
    // Создаем копию текущих выборов
    const newOptions = { ...selectedOptions };
    
    // Обновляем текущий шаг
    newOptions[stepIndex] = value;
    
    // Удаляем все последующие шаги
    Object.keys(newOptions)
      .filter(key => Number(key) > stepIndex)
      .forEach(key => delete newOptions[Number(key)]);

    // Строим новый путь
    let newPath: ConfigStep[] = [];
    let currentStepIndex = 0;
    
    while (currentStepIndex <= stepIndex) {
      const stepConfig: ConfigStep = currentStepIndex === 0 
        ? configurationSteps[0] 
        : newPath[currentStepIndex - 1];
      
      const selectedValue = newOptions[currentStepIndex];
      const option = stepConfig.options.find(opt => opt.label === selectedValue);
      
      if (option?.nextStep) {
        newPath = [...newPath, ...option.nextStep];
      }
      
      currentStepIndex++;
    }

    setSelectedPath(newPath);
    setSelectedOptions(newOptions);
  };

  const getSelectedProduct = () => {
    const allSelectedOptions = selectedPath.flatMap((step, index) => 
      step.options.find(opt => opt.label === selectedOptions[index + 1])
    );

    const selectedOption = allSelectedOptions[allSelectedOptions.length - 1];
    
    if (!selectedOption?.productId) {
      const lastOptionWithProduct = allSelectedOptions.reverse().find(opt => opt?.productId);
      if (!lastOptionWithProduct?.productId) return null;
      return products[lastOptionWithProduct.productId];
    }

    const baseProduct = products[selectedOption.productId];
    if (!baseProduct) return null;

    const mergedCharacteristics = allSelectedOptions.reduce((acc, option) => ({
      ...acc,
      ...(option?.characteristics || {})
    }), {} as Record<string, string>);

    return {
      ...baseProduct,
      range: mergedCharacteristics['Диапазон'] || baseProduct.range,
      features: baseProduct.features || [],
      characteristics: mergedCharacteristics
    };
  };

  const selectedProduct = getSelectedProduct();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <HeroSection 
          title="Конфигуратор" 
          subtitle="Оборудование для вашего производства"
          image="/images/snim-kazan-2.jpg"
        />
        
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <SelectionCard
                    title={configurationSteps[0].title}
                    options={configurationSteps[0].options}
                    selectedValue={selectedOptions[0] || ''}
                    onSelect={(value) => handleSelect(0, value)}
                  />
                </motion.div>

                {selectedPath.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SelectionCard
                      title={step.title}
                      options={step.options}
                      selectedValue={selectedOptions[index + 1] || ''}
                      onSelect={(value) => handleSelect(index + 1, value)}
                    />
                  </motion.div>
                ))}
              </div>

              {selectedProduct && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8"
                >
                  <ProductResult 
                    product={selectedProduct}
                    formState={formState}
                    setFormState={setFormState}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    submitError={submitError}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                  />
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-4">
              {selectedProduct && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto"
                >
                  <ProductSummary 
                    product={selectedProduct} 
                    formState={formState} 
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}