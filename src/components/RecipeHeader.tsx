import React from 'react';
import { Recipe } from '../types/recipe';

interface RecipeHeaderProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  recipe,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <>
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-96 object-cover"
        />
        <button
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 p-3 rounded-full bg-white shadow-lg transform hover:scale-110 transition-transform duration-200 ${
            isFavorite
              ? 'text-red-500 hover:text-red-600'
              : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{recipe.strMeal}</h1>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
            {recipe.strCategory}
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
            {recipe.strArea}
          </span>
        </div>
      </div>
    </>
  );
}; 