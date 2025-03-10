import React from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '../services/api';
import { Recipe } from '../types/recipe';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import debounce from 'lodash/debounce';

const ITEMS_PER_PAGE = 12;

export default function RecipeList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: recipeApi.getCategories,
  });

  const { data: recipes = [], isLoading } = useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: () => searchQuery ? recipeApi.searchRecipes(searchQuery) : recipeApi.getRecipes(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Filter recipes by category
  const filteredRecipes = selectedCategory
    ? recipes.filter(recipe => recipe.strCategory === selectedCategory)
    : recipes;

  // Calculate pagination
  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Debounced search handler
  const debouncedSearch = debounce((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search recipes..."
          onChange={handleSearchChange}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedRecipes.map((recipe: Recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{recipe.strMeal}</h3>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <div>{recipe.strCategory}</div>
                  <div>{recipe.strArea}</div>
                </div>
                <button
                  onClick={() => isFavorite(recipe.idMeal) ? removeFavorite(recipe.idMeal) : addFavorite(recipe)}
                  className={`p-2 rounded-full ${
                    isFavorite(recipe.idMeal)
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  ❤
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            ←
          </button>
          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1 ? 'bg-teal-500 text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
          {totalPages > 7 && <span className="px-3 py-1">...</span>}
          {totalPages > 7 && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages ? 'bg-teal-500 text-white' : ''
              }`}
            >
              {totalPages}
            </button>
          )}
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
} 