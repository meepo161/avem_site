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

interface KSPADMachine {
  type: string;
  power: string;
  voltage: string;
  speed: string;
  phaseRotor: string;
  coolingType: string;
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
  kspadMachines: Array<KSPADMachine>;
  ksptTransformers: Array<{
    type: string;
    powerRange: string;
    voltageClass: string;
    taps: string;
    windings: string;
    lowVoltages: string;
    highVoltages: string;
    coolingType: string[];
  }>;
  transformerTypes: string[];
  automationLevels: string[];
  additionalTests: string;
  productId?: 'KSPEM' | 'KSPAD' | 'KSPT' | string;
  
  // Поля для ВИУ-100Р
  viu100r?: {
    testObjects: string[];           // Объекты испытаний
    testVoltage: string;            // Испытательное напряжение
    testCurrent: string;            // Испытательный ток
    frequency: string;              // Частота испытательного напряжения
    operatingMode: string;          // Режим работы
    controlType: string;            // Тип управления
    mobility: string;               // Мобильность установки
    powerSupply: string;           // Параметры питающей сети
    additionalOptions: string[];    // Дополнительные опции
    specialRequirements: string;    // Особые требования
  };
  
  // Добавляем поля для ВИУ-100Р
  standards?: string[];                // Нормативы для испытаний
  testVoltage?: string;               // Максимальное испытательное напряжение
  testCurrent?: string;               // Максимальный испытательный ток
  requirements?: string[];            // Требования к установке
  temperature?: string;               // Температура окружающей среды
  humidity?: string;                  // Относительная влажность
  additionalRequirements?: string;    // Дополнительные требования
  operatingMode?: string;             // Режим работы
  powerConsumption?: string;          // Потребляемая мощность
  measurementAccuracy?: string;       // Точность измерений
  mobility?: string;                  // Мобильность установки
  installationArea?: string;          // Площадь для установки
  protectionClass?: string;           // Класс защиты
  controlType?: string;               // Тип управления
  displayType?: string;               // Тип индикации
  
  standRequirements?: {
    operatingMode?: string;
    powerConsumption?: string;
    area?: string;
    measurementAccuracy?: string;
    mobility?: string;
  };
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
                      { label: "Электрооборудование",
                        nextStep: [
                          {
                            title: "Тип установки",
                            options: [
                              {
                                label: "ВИУ-10К (Высоковольтная испытательная установка)",
                                productId: "viu10k",
                                characteristics: {                                }
                              }
                            ]
                          }
                        ]
                      },
                      {
                        label: "Генераторы",
                        nextStep: [
                          {
                            title: "Тип установки",
                            options: [
                              {
                                label: "ВИУ-Р (Резонасная высоковольтная испытательная установка)",
                                productId: "viu-100r",
                                characteristics: {                                }
                              }
                            ]
                          }
                        ]
                      },
                      { 
                        label: "Кабели",
                        nextStep: [
                          {
                            title: "Тип установки",
                            options: [
                              {
                                label: "ВИУ-К (Высоковольтная испытательная установка)",
                                productId: "viu35k",
                                characteristics: {}
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              { 
                label: "Механические",
                nextStep: [
                  {
                    title: "Тип стенда",
                    options: [
                      {
                        label: "СНИМ-600 (Стенд нагрузочно-имитационный механический)",
                        productId: "snim-600",
                        characteristics: {}
                      }
                    ]
                  }
                ]
              },
              {
                label: "Нагрузочные модули",
                nextStep: [
                  {
                    title: "Тип нагрузочного модуля",
                    options: [
                      {
                        label: "УНМ-20 (Энергетическая нагрузочная система)",
                        productId: "unm-20",
                        characteristics: {}
                      }
                    ]
                  }
                ]
              },
              { 
                label: "Электронные компоненты",
                nextStep: [
                  {
                    title: "Тип прибора",
                    options: [
                      {
                        label: "ИКПР (Измеритель комплексных параметров радиоэлементов)",
                        productId: "ikpr",
                        characteristics: {}
                      }
                    ]
                  }
                ]
              },
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
      {options?.map((option, index) => (
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

      <p className="text-gray-600 mb-4">{product.description}</p>

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

      {/* Параметры трансформатора */}
      {formState.ksptTransformers?.some(transformer => 
        transformer?.powerRange || 
        transformer?.voltageClass || 
        transformer?.taps || 
        transformer?.windings || 
        transformer?.lowVoltages || 
        transformer?.highVoltages || 
        transformer?.coolingType.length > 0
      ) && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Параметры трансформатора</h4>
          {formState.ksptTransformers?.map((transformer, index) => (
            transformer?.powerRange || transformer?.voltageClass || transformer?.taps || 
            transformer?.windings || transformer?.lowVoltages || transformer?.highVoltages || 
            transformer?.coolingType.length > 0 ? (
              <div key={index} className="mb-3">
                <div className="pl-4 space-y-1">
                  {transformer?.powerRange && <p className="text-sm text-gray-600">Диапазон мощностей: {transformer.powerRange} кВА</p>}
                  {transformer?.voltageClass && <p className="text-sm text-gray-600">Класс напряжения: {transformer.voltageClass} кВ</p>}
                  {transformer?.taps && <p className="text-sm text-gray-600">Количество отпаек РПН/ПБВ: {transformer.taps}</p>}
                  {transformer?.windings && <p className="text-sm text-gray-600">Количество обмоток: {transformer.windings}</p>}
                  {transformer?.lowVoltages && <p className="text-sm text-gray-600">Напряжения НН: {transformer.lowVoltages} кВ</p>}
                  {transformer?.highVoltages && <p className="text-sm text-gray-600">Напряжения ВН: {transformer.highVoltages} кВ</p>}
                  {transformer?.coolingType.length > 0 && <p className="text-sm text-gray-600">Система охлаждения: {transformer.coolingType.join(', ')}</p>}
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* Тип трансформатора */}
      {formState.transformerTypes.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-lg font-semibold mb-3">Тип трансформатора</h4>
          <ul className="list-disc pl-4 space-y-1">
            {formState.transformerTypes.map((type, index) => (
              <li key={index} className="text-sm text-gray-600">{type}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Данные для ВИУ-100Р */}
      {product.id === 'viu-100r' && formState.viu100r && (
        <>
          {formState.viu100r.testObjects?.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-lg font-semibold mb-3">Объекты испытаний</h4>
              <ul className="list-disc pl-4 space-y-1">
                {formState.viu100r.testObjects.map((object, index) => (
                  <li key={index} className="text-sm text-gray-600">{object}</li>
                ))}
              </ul>
            </div>
          )}

          {(formState.viu100r.testVoltage || formState.viu100r.testCurrent || formState.viu100r.frequency) && (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-lg font-semibold mb-3">Параметры испытаний</h4>
              <div className="space-y-2">
                {formState.viu100r.testVoltage && (
                  <p className="text-sm"><span className="font-medium">Испытательное напряжение:</span> {formState.viu100r.testVoltage}</p>
                )}
                {formState.viu100r.testCurrent && (
                  <p className="text-sm"><span className="font-medium">Испытательный ток:</span> {formState.viu100r.testCurrent}</p>
                )}
                {formState.viu100r.frequency && (
                  <p className="text-sm"><span className="font-medium">Частота:</span> {formState.viu100r.frequency} Гц</p>
                )}
              </div>
            </div>
          )}

          {(formState.viu100r.operatingMode || formState.viu100r.controlType || formState.viu100r.mobility) && (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-lg font-semibold mb-3">Конструктивное исполнение</h4>
              <div className="space-y-2">
                {formState.viu100r.operatingMode && (
                  <p className="text-sm"><span className="font-medium">Режим работы:</span> {
                    {
                      'manual': 'Ручной',
                      'automatic': 'Автоматический',
                      'combined': 'Комбинированный'
                    }[formState.viu100r.operatingMode] || formState.viu100r.operatingMode
                  }</p>
                )}
                {formState.viu100r.controlType && (
                  <p className="text-sm"><span className="font-medium">Тип управления:</span> {
                    {
                      'local': 'Местное',
                      'remote': 'Дистанционное',
                      'combined': 'Комбинированное'
                    }[formState.viu100r.controlType] || formState.viu100r.controlType
                  }</p>
                )}
                {formState.viu100r.mobility && (
                  <p className="text-sm"><span className="font-medium">Мобильность:</span> {
                    {
                      'stationary': 'Стационарное',
                      'mobile': 'Мобильное',
                      'portable': 'Переносное'
                    }[formState.viu100r.mobility] || formState.viu100r.mobility
                  }</p>
                )}
              </div>
            </div>
          )}

          {formState.viu100r.powerSupply && (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-lg font-semibold mb-3">Параметры питающей сети</h4>
              <p className="text-sm text-gray-600">{formState.viu100r.powerSupply}</p>
            </div>
          )}

          {formState.viu100r.additionalOptions?.length > 0 && (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-lg font-semibold mb-3">Дополнительные опции</h4>
              <ul className="list-disc pl-4 space-y-1">
                {formState.viu100r.additionalOptions.map((option, index) => (
                  <li key={index} className="text-sm text-gray-600">{option}</li>
                ))}
              </ul>
            </div>
          )}

          {formState.viu100r.specialRequirements && (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-lg font-semibold mb-3">Особые требования</h4>
              <p className="text-sm text-gray-600">{formState.viu100r.specialRequirements}</p>
            </div>
          )}
        </>
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

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6">Опросный лист</h3>

      <div className="space-y-6">
        {/* Основные данные для всех продуктов */}
        <div className="space-y-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Основные данные</h5>
          <BasicFormFields formState={formState} setFormState={setFormState} />
        </div>

        {/* Специфичные поля для разных типов продуктов */}
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
                        newMachines[index] = { ...newMachines[index], type, power: e.target.value };
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
                        newMachines[index] = { ...newMachines[index], type, voltage: e.target.value };
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
                        newMachines[index] = { ...newMachines[index], type, speed: e.target.value };
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
                        newMachines[index] = { ...newMachines[index], type, excitationUI: e.target.value };
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
                  'измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
                  'измерение сопротивления изоляции встроенных термодатчиков относительно корпуса и между обмотками',
                  'измерение сопротивления обмоток при постоянном токе в практически холодном состоянии',
                  'измерение сопротивления встроенных термодатчиков при постоянном токе в практически холодном состоянии',
                  'испытание электрической прочности изоляции обмотки относительно корпуса и между обмотками',
                  'испытание электрической прочности изоляции встроенных термодатчиков относительно корпуса и между обмотками',
                  'определение тока и потерь холостого хода с измерением скорости вращения',
                  'определение тока и потерь короткого замыкания',
                  'испытание электрической прочности междувитковой изоляции обмоток',
                  'проверка уровня вибрации',
                  'измерения температуры окружающей среды и частей электрической машины',
                  'обкатка на холостом ходу',
                  'проверка «беличьей клетки»',
                  'проверка встроенных датчиков вращения',
                  'определение коэффициента трансформации',
                  'испытания под нагрузкой'
                ] : [
                  'испытание на нагрев',
                  'определение КПД',
                  'определение коэффициента мощности',
                  'определение скольжения',
                  'испытание на кратковременную перегрузку по моменту',
                  'испытание на кратковременную перегрузку по току',
                  'определение максимального вращающего момента',
                  'определение минимального вращающего момента в процессе пуска',
                  'определение начального пускового вращающего момента',
                  'определение начального пускового тока',
                  'испытание при повышенной частоте вращения',
                  'проверка уровня шума',
                  'проверка работоспособности при изменении напряжения и частоты питающей сети',
                  'определения момента инерции вращающихся частей'
                ]).map((test, i) => (
                  <label key={i} className="flex items-start p-2 border rounded-lg hover:bg-gray-50 transition-colors">
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

        {product.id === 'kspad' && (
          <>
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Испытания должны проводиться согласно нормативам</h5>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'ГОСТ 11828-86 Машины электрические вращающиеся. Общие методы испытаний',
                  'ГОСТ 53472-2009 Машины электрические вращающиеся. Двигатели асинхронные. Методы испытаний',
                  'ГОСТ 7217-87 Машины электрические вращающиеся. Двигатели асинхронные. Методы испытаний',
                  'ГОСТ 31606-2012 Машины электрические вращающиеся. Двигатели асинхронные мощностью от 0,12 до 400 кВт включительно. Общие технические требования',
                  'ГОСТ Р МЭК 60034-1-2014 Машины электрические вращающиеся. Номинальные данные и характеристики',
                  'ГОСТ IEC 60034-2-1-2017 Машины электрические вращающиеся. Часть 2-1. Стандартные методы определения потерь и коэффициента полезного действия',
                  'ГОСТ 11929-87 Машины электрические вращающиеся. Общие методы испытаний. Определение уровня шума',
                  'ГОСТ IEC/TS 60034-25-2017 Машины электрические вращающиеся. Часть 25. Электрические машины переменного тока, используемые в системах силового привода. Руководство по применению',
                  'ГОСТ 20815-93 (МЭК 34-14-82) Машины электрические вращающиеся. Механическая вибрация некоторых видов машин с высотой оси вращения 56 мм и более. Измерение, оценка и допустимые значения'
                ].map((standard) => (
                  <label key={standard} className="flex items-center p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600"
                      checked={formState.standards?.includes(standard)}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        standards: e.target.checked 
                          ? [...(prev.standards || []), standard]
                          : (prev.standards || []).filter(s => s !== standard)
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-600">{standard}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Конструктивные особенности объектов испытания</h5>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'На лапах',
                  'Фланцевые',
                  'Вертикальные',
                  'На лапах с фланцем',
                  'Конический вал',
                  'Цилиндрический вал',
                  'Встроенные датчики температуры',
                  'Встроенные датчики вращения',
                  'Принудительная вентиляция',
                  'Независимая вентиляция'
                ].map((feature) => (
                  <label key={feature} className="flex items-center p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600"
                      checked={formState.constructiveFeatures?.includes(feature)}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        constructiveFeatures: e.target.checked 
                          ? [...(prev.constructiveFeatures || []), feature]
                          : (prev.constructiveFeatures || []).filter(f => f !== feature)
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-600">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Технические параметры объектов испытания</h5>
              <div className="space-y-4">
                {['Трехфазные', 'Двухфазные', 'Однофазные'].map((type) => (
                  <div key={type} className="space-y-2 border rounded-lg p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-primary-600"
                        checked={formState.machineTypes?.includes(type)}
                        onChange={(e) => setFormState(prev => {
                          const newMachines = [...(prev.kspadMachines || [])];
                          if (e.target.checked) {
                            newMachines.push({
                              type,
                              power: '',
                              voltage: '',
                              speed: '',
                              phaseRotor: 'короткозамкнутый',
                              coolingType: 'естественное'
                            });
                          } else {
                            const index = newMachines.findIndex(m => m.type === type);
                            if (index > -1) {
                              newMachines.splice(index, 1);
                            }
                          }
                          return {
                            ...prev,
                            machineTypes: e.target.checked 
                              ? [...(prev.machineTypes || []), type]
                              : (prev.machineTypes || []).filter(t => t !== type),
                            kspadMachines: newMachines
                          };
                        })}
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">{type}</span>
                    </div>
                    {formState.machineTypes?.includes(type) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Тип ротора</label>
                          <select
                            className="form-select text-sm w-full"
                            value={formState.kspadMachines?.find(m => m.type === type)?.phaseRotor || 'короткозамкнутый'}
                            onChange={(e) => setFormState(prev => {
                              const newMachines = [...(prev.kspadMachines || [])];
                              const index = newMachines.findIndex(m => m.type === type);
                              if (index > -1) {
                                newMachines[index] = {
                                  ...newMachines[index],
                                  phaseRotor: e.target.value as 'фазный' | 'короткозамкнутый'
                                };
                              }
                              return {
                                ...prev,
                                kspadMachines: newMachines
                              };
                            })}
                          >
                            <option value="короткозамкнутый">Короткозамкнутый</option>
                            <option value="фазный">Фазный</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Тип охлаждения</label>
                          <select
                            className="form-select text-sm w-full"
                            value={formState.kspadMachines?.find(m => m.type === type)?.coolingType || 'естественное'}
                            onChange={(e) => setFormState(prev => {
                              const newMachines = [...(prev.kspadMachines || [])];
                              const index = newMachines.findIndex(m => m.type === type);
                              if (index > -1) {
                                newMachines[index] = {
                                  ...newMachines[index],
                                  coolingType: e.target.value as 'естественное' | 'принудительное'
                                };
                              }
                              return {
                                ...prev,
                                kspadMachines: newMachines
                              };
                            })}
                          >
                            <option value="естественное">Естественное</option>
                            <option value="принудительное">Принудительное</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Мощность, кВт</label>
                          <input
                            type="text"
                            placeholder="0.12 - 400"
                            className="form-input text-sm w-full"
                            value={formState.kspadMachines?.find(m => m.type === type)?.power || ''}
                            onChange={(e) => setFormState(prev => {
                              const newMachines = [...(prev.kspadMachines || [])];
                              const index = newMachines.findIndex(m => m.type === type);
                              if (index > -1) {
                                newMachines[index] = {
                                  ...newMachines[index],
                                  power: e.target.value
                                };
                              }
                              return {
                                ...prev,
                                kspadMachines: newMachines
                              };
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Напряжение, кВ</label>
                          <input
                            type="text"
                            placeholder="0.22 - 0.66"
                            className="form-input text-sm w-full"
                            value={formState.kspadMachines?.find(m => m.type === type)?.voltage || ''}
                            onChange={(e) => setFormState(prev => {
                              const newMachines = [...(prev.kspadMachines || [])];
                              const index = newMachines.findIndex(m => m.type === type);
                              if (index > -1) {
                                newMachines[index] = {
                                  ...newMachines[index],
                                  voltage: e.target.value
                                };
                              }
                              return {
                                ...prev,
                                kspadMachines: newMachines
                              };
                            })}
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Скорость, об/мин</label>
                          <input
                            type="text"
                            placeholder="750 - 3000"
                            className="form-input text-sm w-full"
                            value={formState.kspadMachines?.find(m => m.type === type)?.speed || ''}
                            onChange={(e) => setFormState(prev => {
                              const newMachines = [...(prev.kspadMachines || [])];
                              const index = newMachines.findIndex(m => m.type === type);
                              if (index > -1) {
                                newMachines[index] = {
                                  ...newMachines[index],
                                  speed: e.target.value
                                };
                              }
                              return {
                                ...prev,
                                kspadMachines: newMachines
                              };
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Способ регулировки / подачи напряжения на испытуемом объекте</h5>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Плавный регулируемый',
                  'Плавный нерегулируемый',
                  'Ступенчатый',
                  'Прямое включение в сеть'
                ].map((method) => (
                  <label key={method} className="flex items-center p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="voltageRegulation"
                      className="form-radio h-4 w-4 text-primary-600"
                      checked={formState.voltageRegulation === method}
                      onChange={() => setFormState(prev => ({
                        ...prev,
                        voltageRegulation: method
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-600">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Технические требования к Стенду</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Режим работы</label>
                  <select
                    className="form-select text-sm w-full"
                    value={formState.standRequirements?.operatingMode || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      standRequirements: {
                        ...(prev.standRequirements || {}),
                        operatingMode: e.target.value
                      }
                    }))}
                  >
                    <option value="">Выберите режим работы</option>
                    <option value="S1">S1 - продолжительный</option>
                    <option value="S2">S2 - кратковременный</option>
                    <option value="S3">S3 - повторно-кратковременный</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Потребляемая мощность</label>
                  <input
                    type="text"
                    className="form-input w-full text-sm"
                    placeholder="кВт, 380В, 50Гц"
                    value={formState.standRequirements?.powerConsumption || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      standRequirements: {
                        ...(prev.standRequirements || {}),
                        powerConsumption: e.target.value
                      }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Занимаемая площадь</label>
                  <input
                    type="text"
                    className="form-input w-full text-sm"
                    placeholder="м²"
                    value={formState.standRequirements?.area || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      standRequirements: {
                        ...(prev.standRequirements || {}),
                        area: e.target.value
                      }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Точность СИ</label>
                  <select
                    className="form-select text-sm w-full"
                    value={formState.standRequirements?.measurementAccuracy || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      standRequirements: {
                        ...(prev.standRequirements || {}),
                        measurementAccuracy: e.target.value
                      }
                    }))}
                  >
                    <option value="">Выберите класс точности</option>
                    <option value="0.2">0.2</option>
                    <option value="0.5">0.5</option>
                    <option value="1.0">1.0</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Мобильность</label>
                  <select
                    className="form-select text-sm w-full"
                    value={formState.standRequirements?.mobility || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      standRequirements: {
                        ...(prev.standRequirements || {}),
                        mobility: e.target.value
                      }
                    }))}
                  >
                    <option value="">Выберите тип исполнения</option>
                    <option value="стационарный">Стационарный</option>
                    <option value="мобильный">Мобильный</option>
                    <option value="передвижной">Передвижной</option>
                  </select>
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
                  'измерение сопротивления изоляции обмоток относительно корпуса и между обмотками',
                  'измерение сопротивления изоляции встроенных термодатчиков относительно корпуса и между обмотками',
                  'измерение сопротивления обмоток при постоянном токе в практически холодном состоянии',
                  'измерение сопротивления встроенных термодатчиков при постоянном токе в практически холодном состоянии',
                  'испытание электрической прочности изоляции обмотки относительно корпуса и между обмотками',
                  'испытание электрической прочности изоляции встроенных термодатчиков относительно корпуса и между обмотками',
                  'определение тока и потерь холостого хода с измерением скорости вращения',
                  'определение тока и потерь короткого замыкания',
                  'испытание электрической прочности междувитковой изоляции обмоток',
                  'проверка уровня вибрации',
                  'измерения температуры окружающей среды и частей электрической машины',
                  'обкатка на холостом ходу',
                  'проверка «беличьей клетки»',
                  'проверка встроенных датчиков вращения',
                  'определение коэффициента трансформации',
                  'испытания под нагрузкой'
                ] : [
                  'испытание на нагрев',
                  'определение КПД',
                  'определение коэффициента мощности',
                  'определение скольжения',
                  'испытание на кратковременную перегрузку по моменту',
                  'испытание на кратковременную перегрузку по току',
                  'определение максимального вращающего момента',
                  'определение минимального вращающего момента в процессе пуска',
                  'определение начального пускового вращающего момента',
                  'определение начального пускового тока',
                  'испытание при повышенной частоте вращения',
                  'проверка уровня шума',
                  'проверка работоспособности при изменении напряжения и частоты питающей сети',
                  'определения момента инерции вращающихся частей'
                ]).map((test, i) => (
                  <label key={i} className="flex items-start p-2 border rounded-lg hover:bg-gray-50 transition-colors">
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
              <h5 className="text-sm font-medium text-gray-700 mb-2">Параметры трансформатора</h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Диапазон мощностей, кВА</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="например: 25-2500"
                    value={formState.ksptTransformers[0]?.powerRange || ''}
                    onChange={(e) => {
                      const newTransformers = [...formState.ksptTransformers];
                      if (!newTransformers[0]) {
                        newTransformers[0] = {
                          type: 'Силовой',
                          powerRange: '',
                          voltageClass: '',
                          taps: '',
                          windings: '',
                          lowVoltages: '',
                          highVoltages: '',
                          coolingType: []
                        };
                      }
                      newTransformers[0].powerRange = e.target.value;
                      setFormState(prev => ({...prev, ksptTransformers: newTransformers}));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Класс напряжения, кВ</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="например: до 35"
                    value={formState.ksptTransformers[0]?.voltageClass || ''}
                    onChange={(e) => {
                      const newTransformers = [...formState.ksptTransformers];
                      if (!newTransformers[0]) {
                        newTransformers[0] = {
                          type: 'Силовой',
                          powerRange: '',
                          voltageClass: '',
                          taps: '',
                          windings: '',
                          lowVoltages: '',
                          highVoltages: '',
                          coolingType: []
                        };
                      }
                      const newCoolingTypes = [...newTransformers[0].coolingType];
                      if (e.target.checked) {
                        newCoolingTypes.push(e.target.value);
                      } else {
                        const index = newCoolingTypes.indexOf(e.target.value);
                        if (index > -1) {
                          newCoolingTypes.splice(index, 1);
                        }
                      }
                      newTransformers[0].coolingType = newCoolingTypes;
                      setFormState(prev => ({...prev, ksptTransformers: newTransformers}));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Количество отпаек РПН/ПБВ</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="например: ±9х1,78%"
                    value={formState.ksptTransformers[0]?.taps || ''}
                    onChange={(e) => {
                      const newTransformers = [...formState.ksptTransformers];
                      if (!newTransformers[0]) {
                        newTransformers[0] = {
                          type: 'Силовой',
                          powerRange: '',
                          voltageClass: '',
                          taps: '',
                          windings: '',
                          lowVoltages: '',
                          highVoltages: '',
                          coolingType: []
                        };
                      }
                      newTransformers[0].taps = e.target.value;
                      setFormState(prev => ({...prev, ksptTransformers: newTransformers}));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Количество обмоток</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="например: 2"
                    value={formState.ksptTransformers[0]?.windings || ''}
                    onChange={(e) => {
                      const newTransformers = [...formState.ksptTransformers];
                      if (!newTransformers[0]) {
                        newTransformers[0] = {
                          type: 'Силовой',
                          powerRange: '',
                          voltageClass: '',
                          taps: '',
                          windings: '',
                          lowVoltages: '',
                          highVoltages: '',
                          coolingType: []
                        };
                      }
                      newTransformers[0].windings = e.target.value;
                      setFormState(prev => ({...prev, ksptTransformers: newTransformers}));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Напряжения НН, кВ</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="например: 0.4"
                    value={formState.ksptTransformers[0]?.lowVoltages || ''}
                    onChange={(e) => {
                      const newTransformers = [...formState.ksptTransformers];
                      if (!newTransformers[0]) {
                        newTransformers[0] = {
                          type: 'Силовой',
                          powerRange: '',
                          voltageClass: '',
                          taps: '',
                          windings: '',
                          lowVoltages: '',
                          highVoltages: '',
                          coolingType: []
                        };
                      }
                      newTransformers[0].lowVoltages = e.target.value;
                      setFormState(prev => ({...prev, ksptTransformers: newTransformers}));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Напряжения ВН, кВ</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="например: 6; 10"
                    value={formState.ksptTransformers[0]?.highVoltages || ''}
                    onChange={(e) => {
                      const newTransformers = [...formState.ksptTransformers];
                      if (!newTransformers[0]) {
                        newTransformers[0] = {
                          type: 'Силовой',
                          powerRange: '',
                          voltageClass: '',
                          taps: '',
                          windings: '',
                          lowVoltages: '',
                          highVoltages: '',
                          coolingType: []
                        };
                      }
                      newTransformers[0].highVoltages = e.target.value;
                      setFormState(prev => ({...prev, ksptTransformers: newTransformers}));
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Система охлаждения</h5>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Естественное воздушное охлаждение (AN)',
                  'Естественное масляное охлаждение (ONAN)',
                  'Масляное охлаждение с дутьем и естественной циркуляцией масла (ONAF)',
                  'Масляное охлаждение с дутьем и принудительной циркуляцией масла через воздушные охладители (OFAF)',
                  'Масляное охлаждение с водяными охладителями (OFWF)'
                ].map((type, i) => (
                  <label key={i} className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600"
                      checked={formState.ksptTransformers[0]?.coolingType.includes(type)}
                      onChange={(e) => {
                        const newTransformers = [...formState.ksptTransformers];
                        if (!newTransformers[0]) {
                          newTransformers[0] = {
                            type: 'Силовой',
                            powerRange: '',
                            voltageClass: '',
                            taps: '',
                            windings: '',
                            lowVoltages: '',
                            highVoltages: '',
                            coolingType: []
                          };
                        }
                        const newCoolingTypes = [...newTransformers[0].coolingType];
                        if (e.target.checked) {
                          newCoolingTypes.push(e.target.value);
                        } else {
                          const index = newCoolingTypes.indexOf(e.target.value);
                          if (index > -1) {
                            newCoolingTypes.splice(index, 1);
                          }
                        }
                        newTransformers[0].coolingType = newCoolingTypes;
                        setFormState(prev => ({...prev, ksptTransformers: newTransformers}));
                      }}
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
                  'Испытание грозовым импульсом',
                  'Измерение потерь и тока холостого хода на пониженном напряжении',
                  'Измерение частичных разрядов',
                  'Тепловизионное обследование',
                  'Хроматографический анализ растворенных в масле газов',
                  'Проверка работы системы охлаждения',
                  'Проверка переключающего устройства',
                  'Измерение диэлектрических характеристик изоляции',
                  'Определение динамической стойкости при коротком замыкании'
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

        {/* Базовые поля для измерительных приборов */}
        {['avem-3', 'avem-4', 'avem-7', 'avem-9', 'ikas-10', 'sum-1'].includes(product.id) && (
          <>
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Технические требования</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Требуемая точность измерений</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={formState.accuracy}
                    onChange={(e) => setFormState(prev => ({...prev, accuracy: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Условия эксплуатации</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Температура, влажность и т.д."
                    value={formState.mobile}
                    onChange={(e) => setFormState(prev => ({...prev, mobile: e.target.value}))}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Базовые поля для высоковольтных установок */}
        {['livs', 'viu35k'].includes(product.id) && (
          <>
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Параметры испытаний</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Максимальное испытательное напряжение</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="кВ"
                    value={formState.power}
                    onChange={(e) => setFormState(prev => ({...prev, power: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Требуемый ток испытания</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="мА"
                    value={formState.area}
                    onChange={(e) => setFormState(prev => ({...prev, area: e.target.value}))}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Специфичные поля для ВИУ-35К */}
        {product.id === 'viu35k' && (
          <>
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Параметры испытуемых кабелей</h5>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Тип кабеля</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      'Силовые кабели с бумажной изоляцией',
                      'Силовые кабели с пластмассовой изоляцией',
                      'Силовые кабели с резиновой изоляцией',
                      'Контрольные кабели',
                      'Кабели связи'
                    ].map((type, i) => (
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

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Номинальное напряжение кабелей</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      '0.66 кВ', '1 кВ', '3 кВ', '6 кВ', '10 кВ', '15 кВ', '20 кВ', '35 кВ'
                    ].map((voltage, i) => (
                      <label key={i} className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-primary-600"
                          checked={formState.regulationMethods.includes(voltage)}
                          onChange={(e) => setFormState(prev => ({
                            ...prev,
                            regulationMethods: e.target.checked
                              ? [...prev.regulationMethods, voltage]
                              : prev.regulationMethods.filter(v => v !== voltage)
                          }))}
                        />
                        <span className="ml-2 text-sm text-gray-700">{voltage}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Требуемые виды испытаний</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      'Испытание повышенным напряжением постоянного тока',
                      'Испытание повышенным напряжением переменного тока',
                      'Измерение сопротивления изоляции',
                      'Измерение тангенса угла диэлектрических потерь',
                      'Испытание оболочки кабеля',
                      'Определение целостности жил и фазировки',
                      'Измерение электрической емкости',
                      'Измерение сопротивления жил постоянному току',
                      'Определение длины кабеля',
                      'Определение места повреждения оболочки'
                    ].map((test, i) => (
                      <label key={i} className="flex items-start p-2 border rounded-lg hover:bg-gray-50 transition-colors">
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
              </div>
            </div>
          </>
        )}

        {/* Дополнительные требования для всех продуктов */}
        <div className="space-y-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Дополнительные требования</h5>
          <textarea
            className="w-full p-2 border rounded focus:ring-primary-500 focus:border-primary-500"
            rows={3}
            placeholder="Укажите дополнительные требования..."
            value={formState.additionalTests}
            onChange={(e) => setFormState(prev => ({...prev, additionalTests: e.target.value}))}
          />
        </div>

        {/* Специфичные поля для ВИУ-100Р */}
        {product.id === 'viu-100r' && (
          <>
            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Объекты испытаний</h5>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Генераторы',
                  'Электродвигатели',
                  'Трансформаторы',
                  'Высоковольтные вводы',
                  'Изоляторы',
                  'Кабели',
                  'Разрядники',
                  'Ограничители перенапряжений'
                ].map((object) => (
                  <label key={object} className="flex items-center p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600"
                      checked={formState.viu100r?.testObjects?.includes(object) || false}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        viu100r: {
                          ...(prev.viu100r || {}),
                          testObjects: e.target.checked
                            ? [...(prev.viu100r?.testObjects || []), object]
                            : (prev.viu100r?.testObjects || []).filter(t => t !== object)
                        }
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-600">{object}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Параметры испытаний</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Испытательное напряжение</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="до 100 кВ"
                    value={formState.viu100r?.testVoltage || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      viu100r: {
                        ...(prev.viu100r || {}),
                        testVoltage: e.target.value
                      }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Испытательный ток</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="до 1000 мА"
                    value={formState.viu100r?.testCurrent || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      viu100r: {
                        ...(prev.viu100r || {}),
                        testCurrent: e.target.value
                      }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Частота испытательного напряжения</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={formState.viu100r?.frequency || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      viu100r: {
                        ...(prev.viu100r || {}),
                        frequency: e.target.value
                      }
                    }))}
                  >
                    <option value="">Выберите частоту</option>
                    <option value="50">50 Гц</option>
                    <option value="60">60 Гц</option>
                    <option value="variable">Регулируемая</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Режим работы</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={formState.viu100r?.operatingMode || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      viu100r: {
                        ...(prev.viu100r || {}),
                        operatingMode: e.target.value
                      }
                    }))}
                  >
                    <option value="">Выберите режим</option>
                    <option value="manual">Ручной</option>
                    <option value="automatic">Автоматический</option>
                    <option value="combined">Комбинированный</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Конструктивное исполнение</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Тип управления</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={formState.viu100r?.controlType || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      viu100r: {
                        ...(prev.viu100r || {}),
                        controlType: e.target.value
                      }
                    }))}
                  >
                    <option value="">Выберите тип управления</option>
                    <option value="local">Местное</option>
                    <option value="remote">Дистанционное</option>
                    <option value="combined">Комбинированное</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Мобильность установки</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={formState.viu100r?.mobility || ''}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      viu100r: {
                        ...(prev.viu100r || {}),
                        mobility: e.target.value
                      }
                    }))}
                  >
                    <option value="">Выберите тип исполнения</option>
                    <option value="stationary">Стационарное</option>
                    <option value="mobile">Мобильное</option>
                    <option value="portable">Переносное</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Параметры питающей сети</h5>
              <div>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="например: 380В, 50Гц, 3 фазы"
                  value={formState.viu100r?.powerSupply || ''}
                  onChange={(e) => setFormState(prev => ({
                    ...prev,
                    viu100r: {
                      ...(prev.viu100r || {}),
                      powerSupply: e.target.value
                    }
                  }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Дополнительные опции</h5>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Измерение тока утечки',
                  'Измерение емкости объекта испытаний',
                  'Измерение тангенса угла диэлектрических потерь',
                  'Осциллографирование процессов',
                  'Автоматическая регистрация результатов',
                  'Встроенная система безопасности',
                  'Система блокировок',
                  'Экранирование от помех'
                ].map((option) => (
                  <label key={option} className="flex items-center p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-primary-600"
                      checked={formState.viu100r?.additionalOptions?.includes(option) || false}
                      onChange={(e) => setFormState(prev => ({
                        ...prev,
                        viu100r: {
                          ...(prev.viu100r || {}),
                          additionalOptions: e.target.checked
                            ? [...(prev.viu100r?.additionalOptions || []), option]
                            : (prev.viu100r?.additionalOptions || []).filter(o => o !== option)
                        }
                      }))}
                    />
                    <span className="ml-2 text-sm text-gray-600">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Особые требования</h5>
              <textarea
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Укажите особые требования к установке..."
                value={formState.viu100r?.specialRequirements || ''}
                onChange={(e) => setFormState(prev => ({
                  ...prev,
                  viu100r: {
                    ...(prev.viu100r || {}),
                    specialRequirements: e.target.value
                  }
                }))}
              />
            </div>
          </>
        )}

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
    price: 'от 2 500 000 ₽',
    range: '1-4500 В'
  },
  'avem-3': {
    id: 'avem-3',
    title: 'АВЭМ-3',
    image: '/images/products/avem-3 (1).jpg',
    description: 'Высоковольный измерительный комплекс',
    price: 'от 1 250 000 ₽',
    range: '1-4500 В'
  },
  'avem-4': {
    id: 'avem-4',
    title: 'АВЭМ-4',
    image: '/images/products/avem-4 (1).png',
    description: 'Вольтметр',
    price: 'от 890 000 ₽',
    range: '0-1000 В'
  },
  'avem-7': {
    id: 'avem-7',
    title: 'АВЭМ-7',
    image: '/images/products/avem-7 (1).png',
    description: 'Амперметр',
    price: 'от 1 250 000 ₽',
    range: '0-5000 мА'
  },
  'ikas-10': {
    id: 'ikas-10',
    title: 'ИКАС-10',
    image: '/images/products/ikas (1).jpg',
    description: 'Измеритель сопротивления изоляции',
    price: 'от 1 250 000 ₽',
    range: '300 кОм – 100 ГОм'
  },
  'avem-9': {
    id: 'avem-9',
    title: 'АВЭМ-9',
    image: '/images/products/avem-9 (1).jpg',
    description: 'Измеритель сопротивления изоляции',
    price: 'от 1 250 000 ₽',
    range: '300 кОм – 100 ГОм'
  },
  'kspem': {
    id: 'kspem',
    title: 'Комплексный стенд проверки электрических машин КСПЭМ',
    image: '/images/products/kspem (7).jpg',
    description: 'Автоматизированный испытательный комплекс',
    price: 'от 5 000 00 ₽'
  },
  'kspad': {
    id: 'kspad',
    title: 'Комплексный стенд проверки асинхронных двигателей КСПАД',
    image: '/images/products/kspad (3).jpg',
    description: 'Специализированный стенд для испытаний асинхронных двигателей',
    price: 'от 4 500 000 ₽'
  },
  'kspt': {
    id: 'kspt',
    title: 'Комплексный стенд проверки трансформаторов КСПТ',
    image: '/images/products/КСПТ (1).jpg',
    description: 'Специализированный стенд для испытаний трансформаторов',
    price: 'от 4 800 000 ₽'
  },
  'livs': {
    id: 'livs',
    title: 'Лаборатория испытательная высоковольтная стационарная (ЛИВС)',
    image: '/images/products/ливс4.jpg',
    description: 'Комплекс для испытаний средств защиты в электроустановках',
    price: 'от 3 200 000 ₽'
  },
  'viu-100r': {
    id: 'viu-100r',
    title: 'Высоковольтная испытательная установка ВИУ-100Р',
    image: '/images/products/viu-100r (1).jpg',
    description: 'Установка для высоковольтных испытаний генераторов и другого электрооборудования',
    price: 'от 2 800 000 ₽'
  },
  'viu35k': {
    id: 'viu35k',
    title: 'Высоковольтная испытательная установка ВИУ-35К',
    image: '/images/products/viu35k (1).jpg',
    description: 'Установка для проведения высоковольтных испытаний кабелей',
    price: 'от 2 500 000 ₽'
  },
  'viu10k': {
    id: 'viu10k',
    title: 'ВИУ-10К',
    image: '/images/products/viu10k (3).jpg',
    description: 'Высоковольтная испытательная установка',
    price: 'от 1 000 000 ₽'
  },
  'snim-600': {
    id: 'snim-600',
    title: 'Стенд нагрузочно-имитационный механический СНИМ-600',
    image: '/images/products/snim-600 (1).jpg',
    description: 'Стенд для проведения механических испытаний лестниц, стремянок, площадок обслуживания',
    price: 'от 3 500 000 ₽'
  },
  'unm-20': {
    id: 'unm-20',
    title: 'Универсальная нагрузочная машина УНМ',
    image: '/images/products/unm-20 (1).jpg',
    description: 'Универсальная нагрузочная система',
    price: 'от 2 800 000 ₽'
  },
  'ikpr': {
    id: 'ikpr',
    title: 'Измеритель комплексных параметров радиоэлементов ИКПР',
    image: '/images/products/ikpr (1).jpg',
    description: 'Прибор для измерения параметров электронных компонентов и радиоэлементов',
    price: 'от 1 500 000 ₽'
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
    machines: [],
    tests: [],
    kspemMachines: [],
    kspadMachines: [{ 
      type: 'Трехфазные', 
      phaseRotor: 'короткозамкнутый', 
      power: '', 
      voltage: '', 
      speed: '',
      coolingType: 'IC411'
    }],
    ksptTransformers: [{
      type: 'Силовой',
      powerRange: '',
      voltageClass: '',
      taps: '',
      windings: '',
      lowVoltages: '',
      highVoltages: '',
      coolingType: []
    }],
    transformerTypes: [],
    automationLevels: [],
    additionalTests: '',
    productId: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let response;
      
      if (formState.productId === 'KSPEM') {
        response = await fetch('/api/submit-kspem-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState),
        });
      } else if (formState.productId === 'KSPAD') {
        response = await fetch('/api/submit-kspad-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formState),
        });
      } else {
        response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formState,
            selectedProduct
          }),
        });
      }

      if (!response.ok) {
        throw new Error('Ошибка при отправке формы');
      }

      // Если это запрос на генерацию документа Word, обрабатываем ответ как blob
      if (['KSPEM', 'KSPAD'].includes(formState.productId || '') || selectedProduct?.id === 'viu-100r') {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formState.productId || selectedProduct?.id || 'form'}_form.docx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
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

    // Проверяем, изменилась ли установка
    const newProduct = selectedOption?.productId;
    const oldProduct = getSelectedProduct()?.id;
    
    if (newProduct !== oldProduct) {
      // Если установка изменилась, сбрасываем специфичные поля, сохраняя общие данные заказчика
      setFormState(prev => ({
        ...prev,
        tests: [], // Очищаем список опытов
        transformerTypes: [], // Очищаем типы трансформаторов
        regulationMethods: [], // Очищаем методы регулировки
        power: '', // Очищаем мощность
        area: '', // Очищаем площадь
        accuracy: '', // Очищаем точность
        mobile: '', // Очищаем мобильность
        productId: newProduct?.toUpperCase() || '', // Устанавливаем новый productId
        // Сохраняем общие данные заказчика
        organization: prev.organization,
        contactPerson: prev.contactPerson,
        contactDetails: prev.contactDetails,
        deliveryDate: prev.deliveryDate,
        additionalTests: prev.additionalTests
      }));
    }

    while (currentStepIndex <= stepIndex) {
      const stepConfig: ConfigStep = currentStepIndex === 0
        ? configurationSteps[0]
        : newPath[currentStepIndex - 1];

      const selectedValue = newOptions[currentStepIndex];
      const option = stepConfig.options.find(opt => opt.label === selectedValue);

      if (option?.nextStep) {
        newPath = [...newPath, ...option.nextStep];

        // Автоматически выбираем единственный вариант в следующем шаге
        if (Array.isArray(option.nextStep) && option.nextStep.length === 1 && 
            Array.isArray(option.nextStep[0]?.options) && option.nextStep[0].options.length === 1) {
          const nextStepIndex = currentStepIndex + 1;
          const singleOption = option.nextStep[0].options[0];
          newOptions[nextStepIndex] = singleOption.label;

          // Если у единственного варианта есть следующий шаг, добавляем его в путь
          if (singleOption?.nextStep) {
            newPath = [...newPath, ...singleOption.nextStep];
          }
        }
      }

      currentStepIndex++;
    }

    setSelectedPath(newPath);
    setSelectedOptions(newOptions);
  };

  const getSelectedProduct = () => {
    const allSelectedOptions = selectedPath.flatMap((step, index) =>
      step && step.options ? step.options.find(opt => opt.label === selectedOptions[index + 1]) : []
    ).filter(Boolean);

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
                  className="sticky top-24"
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