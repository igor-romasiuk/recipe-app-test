import React from 'react';
import Select, { components, DropdownIndicatorProps } from 'react-select';
import { customSelectStyles } from '../styles/selectStyles';

interface CategoryFilterProps {
  selectedCategory: string;
  categories: string[];
  onCategoryChange: (value: string) => void;
}

interface OptionType {
  value: string;
  label: string;
}

const DropdownIndicator = (props: DropdownIndicatorProps<OptionType, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        className={`w-5 h-5 transition-transform duration-200 ease-in-out ${props.selectProps.menuIsOpen ? 'rotate-180' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </components.DropdownIndicator>
  );
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  categories,
  onCategoryChange,
}) => {
  const options: OptionType[] = [
    { value: '', label: 'All Categories' },
    ...categories.map(category => ({
      value: category,
      label: category
    }))
  ];

  return (
    <Select
      options={options}
      value={options.find(option => option.value === selectedCategory)}
      onChange={(option) => onCategoryChange(option?.value || '')}
      styles={customSelectStyles}
      isSearchable={true}
      placeholder="Select a category"
      className="react-select-container"
      classNamePrefix="react-select"
      instanceId="category-select"
      components={{ DropdownIndicator }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#f97316',
          primary75: '#fb923c',
          primary50: '#fdba74',
          primary25: '#ffedd5'
        },
        borderRadius: 8,
        spacing: {
          ...theme.spacing,
          baseUnit: 4,
          controlHeight: 40,
          menuGutter: 4
        }
      })}
    />
  );
}; 