import { StylesConfig } from 'react-select';

export interface RecipesPerPageOption {
  value: number;
  label: string;
}

export const recipesPerPageStyles: StylesConfig<RecipesPerPageOption, false> = {
  control: (provided, state) => ({
    ...provided,
    minWidth: '140px',
    backgroundColor: 'white',
    borderColor: state.isFocused ? '#f97316' : '#e5e7eb',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(249, 115, 22, 0.2)' : 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      borderColor: '#f97316',
      boxShadow: '0 0 0 2px rgba(249, 115, 22, 0.1)'
    }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? '#f97316' 
      : state.isFocused 
        ? '#fff7ed'
        : 'white',
    color: state.isSelected ? 'white' : '#1f2937',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    padding: '8px 12px',
    fontSize: '0.875rem',
    '&:active': {
      backgroundColor: '#f97316'
    },
    '&:hover': {
      backgroundColor: state.isSelected ? '#f97316' : '#fff7ed'
    }
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    zIndex: 10,
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    animation: 'slideIn 0.2s ease'
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '4px',
    '::-webkit-scrollbar': {
      width: '6px'
    },
    '::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '3px'
    },
    '::-webkit-scrollbar-thumb': {
      background: '#ddd',
      borderRadius: '3px',
      '&:hover': {
        background: '#c1c1c1'
      }
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#1f2937',
    fontSize: '0.875rem'
  }),
  input: (provided) => ({
    ...provided,
    color: '#1f2937',
    fontSize: '0.875rem'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
    fontSize: '0.875rem'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#f97316' : '#9ca3af',
    padding: '6px',
    transition: 'all 0.2s ease',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)',
    '&:hover': {
      color: '#f97316'
    }
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '4px 8px'
  }),
  container: (provided) => ({
    ...provided,
    '@keyframes slideIn': {
      from: {
        opacity: 0,
        transform: 'translateY(-5px)'
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)'
      }
    }
  })
}; 