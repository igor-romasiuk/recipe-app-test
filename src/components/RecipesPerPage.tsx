import React from 'react';
import { PageSizeSelector } from './PageSizeSelector';

interface RecipesPerPageProps {
  searchQuery: string;
  selectedCategory: string;
  totalResults: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export const RecipesPerPage: React.FC<RecipesPerPageProps> = ({
  searchQuery,
  selectedCategory,
  totalResults,
  pageSize,
  onPageSizeChange,
}) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="text-sm text-gray-600">
        {searchQuery && (
          <p>
            Found {totalResults} {totalResults === 1 ? 'recipe' : 'recipes'} 
            {selectedCategory ? ` in ${selectedCategory}` : ''} 
            {searchQuery ? ` for "${searchQuery}"` : ''}
          </p>
        )}
      </div>
      <PageSizeSelector
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
    </div>
  );
}; 