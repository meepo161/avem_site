import React from 'react';
import { FormState, VIU100RFormState } from '@/types/configurator';

interface Viu100FormProps {
  formState: VIU100RFormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const Viu100RForm: React.FC<Viu100FormProps> = ({ formState, setFormState }) => {
  return (
    <div className="space-y-8">
      {/* Блок объектов испытаний */}
      <div className="space-y-4">
        <h5 className="text-lg font-semibold text-gray-900 mb-4">Объекты испытаний</h5>
        <div className="space-y-4">
          {formState.testObjects.map((obj, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Тип объекта</label>
                  <select
                    className="form-select w-full text-sm"
                    value={obj.type}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      testObjects: prev.testObjects.map((item, i) => 
                        i === index ? {...item, type: e.target.value} : item
                      )
                    }))}
                  >
                    <option value="кабель">Кабель</option>
                    <option value="электродвигатель">Электродвигатель</option>
                    <option value="трансформатор">Трансформатор</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Номинальное напряжение (кВ)</label>
                  <input
                    type="text"
                    className="form-input w-full text-sm"
                    value={obj.ratedVoltage}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      testObjects: prev.testObjects.map((item, i) => 
                        i === index ? {...item, ratedVoltage: e.target.value} : item
                      )
                    }))}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Длительность испытания (мин)</label>
                  <input
                    type="text"
                    className="form-input w-full text-sm"
                    value={obj.testDuration}
                    onChange={(e) => setFormState(prev => ({
                      ...prev,
                      testObjects: prev.testObjects.map((item, i) => 
                        i === index ? {...item, testDuration: e.target.value} : item
                      )
                    }))}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            className="btn btn-primary text-sm"
            onClick={() => setFormState(prev => ({
              ...prev,
              testObjects: [...prev.testObjects, {
                type: 'кабель',
                ratedVoltage: '',
                testVoltage: '',
                testDuration: '',
              }]
            }))}
          >
            Добавить объект
          </button>
        </div>
      </div>

      {/* Блок нормативов */}
      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Нормативы испытаний</h5>
        <div className="grid grid-cols-1 gap-2">
          {[
            'ГОСТ 33407-2015',
            'ГОСТ 34804-2018',
            'МЭК 60243-1:2013',
            'МЭК 60060-1:2010',
          ].map(gost => (
            <label key={gost} className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-primary-600"
                checked={formState.standards.gosts.includes(gost)}
                onChange={(e) => setFormState(prev => ({
                  ...prev,
                  standards: {
                    ...prev.standards,
                    gosts: e.target.checked 
                      ? [...prev.standards.gosts, gost]
                      : prev.standards.gosts.filter(s => s !== gost)
                  }
                }))}
              />
              <span className="ml-2 text-sm text-gray-600">{gost}</span>
            </label>
          ))}
          
          <div className="mt-2">
            <label className="flex items-center p-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-primary-600"
                checked={formState.standards.pue}
                onChange={(e) => setFormState(prev => ({
                  ...prev,
                  standards: {...prev.standards, pue: e.target.checked}
                }))}
              />
              <span className="ml-2 text-sm text-gray-600">ПУЭ 7 издание</span>
            </label>
          </div>
        </div>
      </div>

      {/* Блок требуемых испытаний */}
      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Требуемые виды испытаний</h5>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(formState.requiredTests).map(([key, value]) => {
            if (key === 'other') return null;
            return (
              <label key={key} className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary-600"
                  checked={!!value}
                  onChange={(e) => setFormState(prev => ({
                    ...prev,
                    requiredTests: {...prev.requiredTests, [key]: e.target.checked}
                  }))}
                />
                <span className="ml-2 text-sm text-gray-600">
                  {{
                    highVoltageAC: 'Переменное напряжение',
                    highVoltageDC: 'Постоянное напряжение',
                    insulationResistance: 'Сопротивление изоляции',
                    dielectricLoss: 'Диэлектрические потери',
                    partialDischarge: 'Частичные разряды'
                  }[key]}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Блок параметров напряжения */}
      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Параметры напряжения</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h6 className="text-sm font-medium">Переменное напряжение</h6>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600 mb-1">Максимальное значение (кВ)</label>
              <input
                type="text"
                className="form-input w-full text-sm"
                value={formState.voltageParameters.acVoltage.maxVoltage}
                onChange={(e) => setFormState(prev => ({
                  ...prev,
                  voltageParameters: {
                    ...prev.voltageParameters,
                    acVoltage: {
                      ...prev.voltageParameters.acVoltage,
                      maxVoltage: e.target.value
                    }
                  }
                }))}
              />
              
              <div className="flex gap-4 mt-2">
                {['плавная', 'ступенчатая'].map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="acRegulation"
                      className="form-radio h-4 w-4 text-primary-600"
                      checked={formState.voltageParameters.acVoltage.regulationType === type}
                      onChange={() => setFormState(prev => ({
                        ...prev,
                        voltageParameters: {
                          ...prev.voltageParameters,
                          acVoltage: {
                            ...prev.voltageParameters.acVoltage,
                            regulationType: type as 'плавная' | 'ступенчатая'
                          }
                        }
                      }))}
                    />
                    <span className="ml-2 text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h6 className="text-sm font-medium">Постоянное напряжение</h6>
            <div className="space-y-2">
              <input
                type="text"
                className="form-input w-full text-sm"
                placeholder="Максимальное значение (кВ)"
                value={formState.voltageParameters.dcVoltage.maxVoltage}
                onChange={(e) => setFormState(prev => ({
                  ...prev,
                  voltageParameters: {
                    ...prev.voltageParameters,
                    dcVoltage: {
                      ...prev.voltageParameters.dcVoltage,
                      maxVoltage: e.target.value
                    }
                  }
                }))}
              />
              
              <input
                type="text"
                className="form-input w-full text-sm mt-2"
                placeholder="Пульсации (%)"
                value={formState.voltageParameters.dcVoltage.ripplePercent || ''}
                onChange={(e) => setFormState(prev => ({
                  ...prev,
                  voltageParameters: {
                    ...prev.voltageParameters,
                    dcVoltage: {
                      ...prev.voltageParameters.dcVoltage,
                      ripplePercent: e.target.value
                    }
                  }
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Остальные блоки формы можно добавить по аналогии */}
    </div>
  );
}; 