import React from 'react';
import { Recipe } from '../types/recipe';

interface IngredientsListProps {
  recipe: Recipe;
}

export const IngredientsList: React.FC<IngredientsListProps> = ({ recipe }) => {
  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = recipe[`strIngredient${i + 1}` as keyof typeof recipe];
    const measure = recipe[`strMeasure${i + 1}` as keyof typeof recipe];
    return ingredient && ingredient.trim() ? { ingredient, measure } : null;
  }).filter(Boolean);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Ingredients
      </h2>
      <div className="bg-orange-50 rounded-lg p-4">
        <ul className="space-y-2">
          {ingredients.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="font-medium text-orange-900">{item?.ingredient}</span>
              <span className="text-orange-700">{item?.measure}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 