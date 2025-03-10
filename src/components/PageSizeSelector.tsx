import React from 'react';
import Select from 'react-select';
import { recipesPerPageStyles, RecipesPerPageOption } from '../styles/recipesPerPageStyles';

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  pageSize,
  onPageSizeChange,
}) => {
  const pageSizeOptions: RecipesPerPageOption[] = [
    { value: 8, label: '8 recipes' },
    { value: 12, label: '12 recipes' },
    { value: 16, label: '16 recipes' },
    { value: 24, label: '24 recipes' }
  ];

  const selectedOption = pageSizeOptions.find(option => option.value === pageSize);

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm text-gray-600 whitespace-nowrap">
        Recipes per page:
      </label>
      <Select<RecipesPerPageOption>
        value={selectedOption}
        onChange={(option) => option && onPageSizeChange(option.value)}
        options={pageSizeOptions}
        styles={recipesPerPageStyles}
        isSearchable={false}
        className="min-w-[140px]"
        classNamePrefix="recipes-per-page"
      />
    </div>
  );
}; 