import React from 'react';
import { FormState, KSPADFormState } from '@/types/configurator';

interface KspadFormProps {
  formState: KSPADFormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const KspadForm: React.FC<KspadFormProps> = ({ formState, setFormState }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h5 className="text-lg font-semibold text-gray-900 mb-4">Опросный лист для заказа КСПАД</h5>
        <p className="text-sm text-gray-600 mb-4">
          Комплексный стенд проверки асинхронных двигателей
        </p>
      </div>

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
                checked={(formState.standards as string[])?.includes(standard) || false}
                onChange={(e) => setFormState((prev: FormState) => {
                  if ('standards' in prev && Array.isArray(prev.standards)) {
                    return {
                      ...prev,
                      standards: e.target.checked 
                        ? [...prev.standards, standard]
                        : prev.standards.filter(s => s !== standard)
                    };
                  }
                  return prev;
                })}
              />
              <span className="ml-2 text-sm text-gray-600">{standard}</span>
            </label>
          ))}
          <div className="mt-2">
            <label className="block text-sm text-gray-600 mb-1">Другие стандарты</label>
            <input
              type="text"
              className="form-input w-full text-sm"
              placeholder="Укажите дополнительные стандарты"
              value={formState.additionalTests || ''}
              onChange={(e) => setFormState(prev => ({...prev, additionalTests: e.target.value}))}
            />
          </div>
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
                checked={formState.constructiveFeatures?.includes(feature) || false}
                onChange={(e) => setFormState((prev: FormState) => {
                  if ('constructiveFeatures' in prev) {
                    return {
                      ...prev,
                      constructiveFeatures: e.target.checked 
                        ? [...(prev.constructiveFeatures || []), feature]
                        : (prev.constructiveFeatures || []).filter(f => f !== feature)
                    };
                  }
                  return prev;
                })}
              />
              <span className="ml-2 text-sm text-gray-600">{feature}</span>
            </label>
          ))}
          <div className="col-span-2 mt-2">
            <label className="block text-sm text-gray-600 mb-1">Другие особенности</label>
            <input
              type="text"
              className="form-input w-full text-sm"
              placeholder="Укажите дополнительные конструктивные особенности"
              value={formState.additionalTests || ''}
              onChange={(e) => setFormState(prev => ({...prev, additionalTests: e.target.value}))}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Технические параметры объектов испытания</h5>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {['Трехфазные', 'Двухфазные', 'Однофазные'].map((type) => (
              <div key={type} className="space-y-2 border rounded-lg p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary-600"
                    checked={formState.machineTypes?.includes(type) || false}
                    onChange={(e) => setFormState((prev: FormState) => {
                      if ('machineTypes' in prev) {
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
                            ? [...prev.machineTypes, type]
                            : prev.machineTypes.filter(t => t !== type),
                          kspadMachines: newMachines
                        };
                      }
                      return prev;
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
                        value={formState.kspadMachines.find(m => m.type === type)?.phaseRotor || 'короткозамкнутый'}
                        onChange={(e) => setFormState((prev: FormState) => {
                          if ('kspadMachines' in prev) {
                            const newMachines = [...prev.kspadMachines];
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
                          }
                          return prev;
                        })}
                      >
                        <option value="короткозамкнутый">Короткозамкнутый</option>
                        <option value="фазный">Фазный</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Мощность, кВт</label>
                      <input
                        type="text"
                        placeholder="0.12 - 400"
                        className="form-input text-sm w-full"
                        value={formState.kspadMachines.find(m => m.type === type)?.power || ''}
                        onChange={(e) => setFormState((prev: FormState) => {
                          if ('kspadMachines' in prev) {
                            const newMachines = [...prev.kspadMachines];
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
                          }
                          return prev;
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Напряжение, кВ</label>
                      <input
                        type="text"
                        placeholder="0.22 - 0.66"
                        className="form-input text-sm w-full"
                        value={formState.kspadMachines.find(m => m.type === type)?.voltage || ''}
                        onChange={(e) => setFormState((prev: FormState) => {
                          if ('kspadMachines' in prev) {
                            const newMachines = [...prev.kspadMachines];
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
                          }
                          return prev;
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Скорость, об/мин</label>
                      <input
                        type="text"
                        placeholder="750 - 3000"
                        className="form-input text-sm w-full"
                        value={formState.kspadMachines.find(m => m.type === type)?.speed || ''}
                        onChange={(e) => setFormState((prev: FormState) => {
                          if ('kspadMachines' in prev) {
                            const newMachines = [...prev.kspadMachines];
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
                          }
                          return prev;
                        })}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
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
                onChange={() => setFormState((prev: FormState) => {
                  if ('voltageRegulation' in prev) {
                    return {
                      ...prev,
                      voltageRegulation: method
                    };
                  }
                  return prev;
                })}
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
              onChange={(e) => setFormState((prev: FormState) => {
                if ('standRequirements' in prev) {
                  return {
                    ...prev,
                    standRequirements: {
                      ...(prev.standRequirements || {}),
                      operatingMode: e.target.value
                    }
                  };
                }
                return prev;
              })}
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
              onChange={(e) => setFormState((prev: FormState) => {
                if ('standRequirements' in prev) {
                  return {
                    ...prev,
                    standRequirements: {
                      ...(prev.standRequirements || {}),
                      powerConsumption: e.target.value
                    }
                  };
                }
                return prev;
              })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Занимаемая площадь</label>
            <input
              type="text"
              className="form-input w-full text-sm"
              placeholder="м²"
              value={formState.standRequirements?.area || ''}
              onChange={(e) => setFormState((prev: FormState) => {
                if ('standRequirements' in prev) {
                  return {
                    ...prev,
                    standRequirements: {
                      ...(prev.standRequirements || {}),
                      area: e.target.value
                    }
                  };
                }
                return prev;
              })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Точность СИ</label>
            <select
              className="form-select text-sm w-full"
              value={formState.standRequirements?.measurementAccuracy || ''}
              onChange={(e) => setFormState((prev: FormState) => {
                if ('standRequirements' in prev) {
                  return {
                    ...prev,
                    standRequirements: {
                      ...(prev.standRequirements || {}),
                      measurementAccuracy: e.target.value
                    }
                  };
                }
                return prev;
              })}
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
              onChange={(e) => setFormState((prev: FormState) => {
                if ('standRequirements' in prev) {
                  return {
                    ...prev,
                    standRequirements: {
                      ...(prev.standRequirements || {}),
                      mobility: e.target.value
                    }
                  };
                }
                return prev;
              })}
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
              onChange={(e) => setFormState((prev: FormState) => {
                if ('organizationType' in prev) {
                  return {
                    ...prev,
                    organizationType: e.target.value as 'repair' | 'manufacturer',
                    tests: []
                  };
                }
                return prev;
              })}
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
              onChange={(e) => setFormState((prev: FormState) => {
                if ('organizationType' in prev) {
                  return {
                    ...prev,
                    organizationType: e.target.value as 'repair' | 'manufacturer',
                    tests: []
                  };
                }
                return prev;
              })}
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
                onChange={(e) => setFormState((prev: FormState) => {
                  if ('tests' in prev) {
                    return {
                      ...prev,
                      tests: e.target.checked ? [...prev.tests, test] : prev.tests.filter(t => t !== test)
                    };
                  }
                  return prev;
                })}
              />
              <span className="ml-2 text-sm text-gray-600 leading-tight">{test}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}; 