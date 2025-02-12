import React from 'react';

interface FormState {
  power: string;
  area: string;
  transformerTypes: string[];
  tests: string[];
  automationLevels: string[];
  regulationMethods: string[];
}

interface VIU100RFormProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const VIU100RForm: React.FC<VIU100RFormProps> = ({ formState, setFormState }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Типы испытуемого оборудования</h5>
        <div className="grid grid-cols-1 gap-2">
          {[
            'Генераторы',
            'Электродвигатели',
            'Трансформаторы',
            'Высоковольтные выключатели',
            'Изоляторы',
            'Ограничители перенапряжений',
            'Силовые кабели',
            'Конденсаторы'
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

      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Требуемые виды испытаний</h5>
        <div className="grid grid-cols-1 gap-2">
          {[
            'Испытание повышенным напряжением промышленной частоты',
            'Испытание выпрямленным напряжением',
            'Испытание коммутационным импульсом',
            'Испытание грозовым импульсом',
            'Измерение частичных разрядов',
            'Измерение тангенса угла диэлектрических потерь',
            'Измерение сопротивления изоляции',
            'Испытание с измерением токов утечки',
            'Испытание электрической прочности',
            'Определение уровня радиопомех'
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

      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Требования к системе управления</h5>
        <div className="grid grid-cols-1 gap-2">
          {[
            'Ручное управление',
            'Полуавтоматическое управление',
            'Автоматическое управление',
            'Дистанционное управление',
            'Интеграция в АСУ ТП',
            'Регистрация результатов испытаний',
            'Формирование протоколов испытаний',
            'Архивирование результатов'
          ].map((level, i) => (
            <label key={i} className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-primary-600"
                checked={formState.automationLevels.includes(level)}
                onChange={(e) => setFormState(prev => ({
                  ...prev,
                  automationLevels: e.target.checked
                    ? [...prev.automationLevels, level]
                    : prev.automationLevels.filter(l => l !== level)
                }))}
              />
              <span className="ml-2 text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Требования к безопасности</h5>
        <div className="grid grid-cols-1 gap-2">
          {[
            'Механическая блокировка дверей',
            'Электрическая блокировка дверей',
            'Световая сигнализация',
            'Звуковая сигнализация',
            'Аварийное отключение',
            'Защитное заземление',
            'Контроль изоляции',
            'Защита от перенапряжений'
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
    </div>
  );
}; 
