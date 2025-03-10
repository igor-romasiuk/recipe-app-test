import React from 'react';
import { Recipe } from '../types/recipe';
import { Link } from 'react-router-dom';

interface FavoriteRecipeCardProps {
  recipe: Recipe;
  onRemove: (id: string) => void;
}

export const FavoriteRecipeCard: React.FC<FavoriteRecipeCardProps> = ({
  recipe,
  onRemove,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative group">
        <Link to={`/recipe/${recipe.idMeal}`}>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(recipe.idMeal);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md transform hover:scale-110 transition-transform duration-200 text-red-500 hover:text-red-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <Link 
          to={`/recipe/${recipe.idMeal}`}
          className="block font-semibold text-lg text-gray-900 mb-2 line-clamp-2 hover:text-orange-500 transition-colors"
        >
          {recipe.strMeal}
        </Link>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
            {recipe.strCategory}
          </span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
            {recipe.strArea}
          </span>
        </div>
      </div>
    </div>
  );
}; 