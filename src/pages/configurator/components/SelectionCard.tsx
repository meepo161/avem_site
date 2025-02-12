import React from 'react';

interface SelectionCardProps {
  title: string;
  options: { label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export const SelectionCard: React.FC<SelectionCardProps> = ({
  title,
  options,
  selectedValue,
  onSelect
}) => (
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