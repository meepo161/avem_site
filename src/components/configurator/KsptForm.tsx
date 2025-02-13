import React from 'react';
import { FormState, KSPTFormState, KSPTTransformer } from '@/types/configurator';

interface KsptFormProps {
  formState: KSPTFormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const KsptForm: React.FC<KsptFormProps> = ({ formState, setFormState }) => {
  const updateForm = (updates: Partial<KSPTFormState>) => {
    setFormState(prev => {
      if ('transformerTypes' in prev) {
        return { ...prev as KSPTFormState, ...updates };
      }
      return prev;
    });
  };

  const handleTransformerTypeChange = (type: string) => {
    const updatedTypes = formState.transformerTypes?.includes(type)
      ? formState.transformerTypes.filter(t => t !== type)
      : [...(formState.transformerTypes || []), type];

    updateForm({ transformerTypes: updatedTypes });
  };

  const handleCoolingTypeChange = (transformer: KSPTTransformer, type: string) => {
    const updatedTransformers = formState.ksptTransformers.map(t => {
      if (t === transformer) {
        const updatedTypes = t.coolingType.includes(type)
          ? t.coolingType.filter(ct => ct !== type)
          : [...t.coolingType, type];
        return { ...t, coolingType: updatedTypes };
      }
      return t;
    });

    updateForm({ ksptTransformers: updatedTransformers });
  };

  const addTransformer = () => {
    updateForm({
      ksptTransformers: [
        ...formState.ksptTransformers,
        {
          type: '',
          powerRange: '',
          voltageClass: '',
          taps: '',
          windings: '',
          lowVoltages: '',
          highVoltages: '',
          coolingType: []
        }
      ]
    });
  };

  const removeTransformer = (index: number) => {
    updateForm({
      ksptTransformers: formState.ksptTransformers.filter((_, i) => i !== index)
    });
  };

  const updateTransformer = (index: number, field: string, value: string) => {
    updateForm({
      ksptTransformers: formState.ksptTransformers.map((transformer, i) => {
        if (i === index) {
          return { ...transformer, [field]: value };
        }
        return transformer;
      })
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Тип трансформатора</h5>
        <div className="grid grid-cols-1 gap-2">
          {['Силовой', 'Измерительный', 'Специальный'].map(type => (
            <label key={type} className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
              <input
                type="checkbox"
                checked={formState.transformerTypes?.includes(type)}
                onChange={() => handleTransformerTypeChange(type)}
                className="form-checkbox h-4 w-4 text-primary-600"
              />
              <span className="ml-2 text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h5 className="text-sm font-medium text-gray-700">Параметры трансформаторов</h5>
          <button
            type="button"
            onClick={addTransformer}
            className="px-3 py-1 text-sm text-primary-600 border border-primary-600 rounded hover:bg-primary-50"
          >
            Добавить трансформатор
          </button>
        </div>

        {formState.ksptTransformers?.map((transformer, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h6 className="text-sm font-medium text-gray-700">Трансформатор {index + 1}</h6>
              <button
                type="button"
                onClick={() => removeTransformer(index)}
                className="text-red-600 hover:text-red-700"
              >
                Удалить
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Тип трансформатора
                </label>
                <input
                  type="text"
                  value={transformer.type}
                  onChange={(e) => updateTransformer(index, 'type', e.target.value)}
                  className="form-input w-full rounded-md"
                  placeholder="Например: ТМ, ТМГ, ТСЗ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Диапазон мощностей
                </label>
                <input
                  type="text"
                  value={transformer.powerRange}
                  onChange={(e) => updateTransformer(index, 'powerRange', e.target.value)}
                  className="form-input w-full rounded-md"
                  placeholder="кВА"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Класс напряжения
                </label>
                <input
                  type="text"
                  value={transformer.voltageClass}
                  onChange={(e) => updateTransformer(index, 'voltageClass', e.target.value)}
                  className="form-input w-full rounded-md"
                  placeholder="кВ"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Количество ответвлений
                </label>
                <input
                  type="text"
                  value={transformer.taps}
                  onChange={(e) => updateTransformer(index, 'taps', e.target.value)}
                  className="form-input w-full rounded-md"
                  placeholder="Например: ±2x2.5%"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Схема и группа соединения обмоток
                </label>
                <input
                  type="text"
                  value={transformer.windings}
                  onChange={(e) => updateTransformer(index, 'windings', e.target.value)}
                  className="form-input w-full rounded-md"
                  placeholder="Например: Y/Yн-0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Напряжения НН
                </label>
                <input
                  type="text"
                  value={transformer.lowVoltages}
                  onChange={(e) => updateTransformer(index, 'lowVoltages', e.target.value)}
                  className="form-input w-full rounded-md"
                  placeholder="В"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Напряжения ВН
                </label>
                <input
                  type="text"
                  value={transformer.highVoltages}
                  onChange={(e) => updateTransformer(index, 'highVoltages', e.target.value)}
                  className="form-input w-full rounded-md"
                  placeholder="кВ"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Система охлаждения
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {['Естественное воздушное', 'Естественное масляное', 'Принудительное воздушное', 'Принудительное масляное'].map(type => (
                  <label key={type} className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
                    <input
                      type="checkbox"
                      checked={transformer.coolingType.includes(type)}
                      onChange={() => handleCoolingTypeChange(transformer, type)}
                      className="form-checkbox h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Уровень автоматизации</h5>
        <div className="grid grid-cols-1 gap-2">
          {[
            'Ручное управление',
            'Полуавтоматическое управление',
            'Автоматическое управление',
            'Автоматическое управление с компьютера'
          ].map(level => (
            <label key={level} className="flex items-center p-2 border rounded-lg hover:border-primary-400 transition-colors">
              <input
                type="checkbox"
                checked={formState.automationLevels?.includes(level)}
                onChange={(e) => {
                  const updatedLevels = e.target.checked
                    ? [...(formState.automationLevels || []), level]
                    : formState.automationLevels?.filter(l => l !== level) || [];
                  setFormState(prev => ({
                    ...prev,
                    automationLevels: updatedLevels
                  }));
                }}
                className="form-checkbox h-4 w-4 text-primary-600"
              />
              <span className="ml-2 text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Дополнительные требования к испытаниям</h5>
        <textarea
          value={formState.additionalTests}
          onChange={(e) => setFormState(prev => ({
            ...prev,
            additionalTests: e.target.value
          }))}
          className="form-textarea w-full rounded-md"
          rows={4}
          placeholder="Укажите дополнительные требования к испытаниям"
        />
      </div>
    </div>
  );
}; 