import React from 'react';

interface Ingredient {
  name: string;
  measure: string;
}

interface CombinedIngredientsProps {
  ingredients: Ingredient[];
}

export const CombinedIngredients: React.FC<CombinedIngredientsProps> = ({ ingredients }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-orange-900">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Combined Ingredients List
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ingredients.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <span className="font-medium text-orange-900">{item.name}</span>
            <span className="text-orange-700 text-sm">{item.measure}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 