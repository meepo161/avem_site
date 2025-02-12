import React from 'react';
import { FormState } from '../../types';

interface KspadFormProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const KspadForm: React.FC<KspadFormProps> = ({ formState, setFormState }) => (
  <>
    <div className="space-y-4">
      <h5 className="text-sm font-medium text-gray-700 mb-2">Испытания должны проводиться согласно нормативам</h5>
      <div className="grid grid-cols-1 gap-2">
        {[
          'ГОСТ 7217-87',
          'ГОСТ Р 51689-2000',
          'ГОСТ 11828-86',
          'ГОСТ 10169-77',
          'ГОСТ 11929-87',
          'ГОСТ 183-74',
          'ГОСТ IEC 60034-1-2014',
          'ГОСТ IEC 60034-2-1-2017'
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
      <h5 className="text-sm font-medium text-gray-700 mb-2">Параметры испытуемых двигателей</h5>
      {[
        { type: 'Трехфазные с короткозамкнутым ротором' },
        { type: 'Трехфазные с фазным ротором' },
        { type: 'Однофазные конденсаторные' }
      ].map((category, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <h6 className="font-medium mb-3">{category.type}</h6>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Мощность, кВт"
              className="p-2 border rounded"
              value={formState.kspadMachines[index]?.power || ''}
              onChange={(e) => {
                const newMachines = [...formState.kspadMachines];
                if (!newMachines[index]) {
                  newMachines[index] = { 
                    type: category.type, 
                    power: '', 
                    voltage: '', 
                    speed: '', 
                    phaseRotor: '', 
                    coolingType: '' 
                  };
                }
                newMachines[index] = { ...newMachines[index], power: e.target.value };
                setFormState(prev => ({...prev, kspadMachines: newMachines}));
              }}
            />
            <input
              type="text"
              placeholder="Напряжение, В"
              className="p-2 border rounded"
              value={formState.kspadMachines[index]?.voltage || ''}
              onChange={(e) => {
                const newMachines = [...formState.kspadMachines];
                if (!newMachines[index]) {
                  newMachines[index] = { 
                    type: category.type, 
                    power: '', 
                    voltage: '', 
                    speed: '', 
                    phaseRotor: '', 
                    coolingType: '' 
                  };
                }
                newMachines[index] = { ...newMachines[index], voltage: e.target.value };
                setFormState(prev => ({...prev, kspadMachines: newMachines}));
              }}
            />
            <input
              type="text"
              placeholder="Скорость, об/мин"
              className="p-2 border rounded"
              value={formState.kspadMachines[index]?.speed || ''}
              onChange={(e) => {
                const newMachines = [...formState.kspadMachines];
                if (!newMachines[index]) {
                  newMachines[index] = { 
                    type: category.type, 
                    power: '', 
                    voltage: '', 
                    speed: '', 
                    phaseRotor: '', 
                    coolingType: '' 
                  };
                }
                newMachines[index] = { ...newMachines[index], speed: e.target.value };
                setFormState(prev => ({...prev, kspadMachines: newMachines}));
              }}
            />
            <select
              className="p-2 border rounded"
              value={formState.kspadMachines[index]?.phaseRotor || ''}
              onChange={(e) => {
                const newMachines = [...formState.kspadMachines];
                if (!newMachines[index]) {
                  newMachines[index] = { 
                    type: category.type, 
                    power: '', 
                    voltage: '', 
                    speed: '', 
                    phaseRotor: '', 
                    coolingType: '' 
                  };
                }
                newMachines[index] = { ...newMachines[index], phaseRotor: e.target.value };
                setFormState(prev => ({...prev, kspadMachines: newMachines}));
              }}
            >
              <option value="">Тип ротора</option>
              <option value="короткозамкнутый">Короткозамкнутый</option>
              <option value="фазный">Фазный</option>
            </select>
            <select
              className="p-2 border rounded"
              value={formState.kspadMachines[index]?.coolingType || ''}
              onChange={(e) => {
                const newMachines = [...formState.kspadMachines];
                if (!newMachines[index]) {
                  newMachines[index] = { 
                    type: category.type, 
                    power: '', 
                    voltage: '', 
                    speed: '', 
                    phaseRotor: '', 
                    coolingType: '' 
                  };
                }
                newMachines[index] = { ...newMachines[index], coolingType: e.target.value };
                setFormState(prev => ({...prev, kspadMachines: newMachines}));
              }}
            >
              <option value="">Тип охлаждения</option>
              <option value="IC411">IC411 (самоохлаждение)</option>
              <option value="IC416">IC416 (принудительное)</option>
              <option value="IC418">IC418 (независимое)</option>
            </select>
          </div>
        </div>
      ))}
    </div>

    <div className="space-y-4">
      <h5 className="text-sm font-medium text-gray-700 mb-2">Технические требования к стенду</h5>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Потребляемая мощность</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="кВт"
            value={formState.power}
            onChange={(e) => setFormState(prev => ({...prev, power: e.target.value}))}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Занимаемая площадь</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="м²"
            value={formState.area}
            onChange={(e) => setFormState(prev => ({...prev, area: e.target.value}))}
          />
        </div>
      </div>
    </div>
  </>
); 