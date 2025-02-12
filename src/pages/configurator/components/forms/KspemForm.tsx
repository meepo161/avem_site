import React from 'react';
import { FormState } from '../../types';

interface KspemFormProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const KspemForm: React.FC<KspemFormProps> = ({ formState, setFormState }) => (
  <>
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
              organizationType: e.target.value as 'repair',
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
              organizationType: e.target.value as 'manufacturer',
              tests: []
            }))}
            className="form-radio h-4 w-4 text-primary-600"
          />
          <span className="ml-2 text-sm text-gray-700">Для заводов-изготовителей</span>
        </label>
      </div>
    </div>

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
      </div>
    </div>
  </>
); 