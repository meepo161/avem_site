import React from 'react';
import { FormState, KSPEMFormState } from '@/types/configurator';

interface KspemFormProps {
  formState: KSPEMFormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const KspemForm: React.FC<KspemFormProps> = ({ formState, setFormState }) => {
  const updateForm = (updates: Partial<KSPEMFormState>) => {
    setFormState(prev => {
      if ('norms' in prev) { // Type guard для KSPEMFormState
        return { ...prev as KSPEMFormState, ...updates };
      }
      return prev;
    });
  };

  return (
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
                onChange={(e) => updateForm({
                  norms: e.target.checked ? [...formState.norms, norm] : formState.norms.filter((n: string) => n !== norm)
                })}
              />
              <span className="ml-2 text-sm text-gray-700">{norm}</span>
            </label>
          ))}
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
                onChange={(e) => updateForm({
                  constructionFeatures: e.target.checked
                    ? [...formState.constructionFeatures, feature]
                    : formState.constructionFeatures.filter((f: string) => f !== feature)
                })}
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
                    newMachines[index] = { type, power: '', voltage: '', speed: '' };
                  }
                  newMachines[index] = { ...newMachines[index], type, power: e.target.value };
                  updateForm({ kspemMachines: newMachines });
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
                    newMachines[index] = { type, power: '', voltage: '', speed: '' };
                  }
                  newMachines[index] = { ...newMachines[index], type, voltage: e.target.value };
                  updateForm({ kspemMachines: newMachines });
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
                    newMachines[index] = { type, power: '', voltage: '', speed: '' };
                  }
                  newMachines[index] = { ...newMachines[index], type, speed: e.target.value };
                  updateForm({ kspemMachines: newMachines });
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
                  updateForm({ kspemMachines: newMachines });
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
                onChange={(e) => updateForm({
                  regulationMethods: e.target.checked
                    ? [...formState.regulationMethods, method]
                    : formState.regulationMethods.filter((m: string) => m !== method)
                })}
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
              onChange={(e) => updateForm({ power: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Занимаемая площадь</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formState.area}
              onChange={(e) => updateForm({ area: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Мобильность</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formState.mobile}
              onChange={(e) => updateForm({ mobile: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Точность СИ</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formState.accuracy}
              onChange={(e) => updateForm({ accuracy: e.target.value })}
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
              onChange={(e) => updateForm({
                organizationType: e.target.value as 'repair' | 'manufacturer',
                tests: []
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
              onChange={(e) => updateForm({
                organizationType: e.target.value as 'repair' | 'manufacturer',
                tests: []
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
                onChange={(e) => updateForm({
                  tests: e.target.checked ? [...formState.tests, test] : formState.tests.filter((t: string) => t !== test)
                })}
              />
              <span className="ml-2 text-sm text-gray-600 leading-tight">{test}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}; 