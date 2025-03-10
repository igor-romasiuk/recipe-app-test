import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '../services/api';
import { Recipe } from '../types/recipe';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import debounce from 'lodash/debounce';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { RecipeCard } from '../components/RecipeCard';
import { Pagination } from '../components/Pagination';
import { Loading } from '../components/Loading';
import { EmptyRecipes } from '../components/EmptyRecipes';

const ITEMS_PER_PAGE = 12;

export default function RecipeList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: recipeApi.getCategories,
  });

  const { data: recipes = [], isLoading, isFetching } = useQuery({
    queryKey: ['recipes', searchQuery],
    queryFn: () => searchQuery ? recipeApi.searchRecipes(searchQuery) : recipeApi.getRecipes(),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const debouncedSearch = debounce((value: string) => {
    setSearchQuery(value);
    setIsSearching(false);
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSearching(true);
    debouncedSearch(value);
  };

  const handleSearchClear = () => {
    setInputValue('');
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter(recipe => recipe.strCategory === selectedCategory)
    : recipes;

  const totalPages = Math.ceil(filteredRecipes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Recipe Collection</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar
            inputValue={inputValue}
            isSearching={isSearching}
            isFetching={isFetching}
            onSearchChange={handleSearchChange}
            onSearchClear={handleSearchClear}
          />
          <CategoryFilter
            selectedCategory={selectedCategory}
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="mt-4 text-sm text-gray-600">
          {searchQuery && (
            <p>
              Found {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} 
              {selectedCategory ? ` in ${selectedCategory}` : ''} 
              {searchQuery ? ` for "${searchQuery}"` : ''}
            </p>
          )}
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : recipes.length === 0 ? (
        <EmptyRecipes searchQuery={searchQuery} selectedCategory={selectedCategory} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedRecipes.map((recipe: Recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                isFavorite={isFavorite(recipe.idMeal)}
                onNavigate={() => navigate(`/recipe/${recipe.idMeal}`)}
                onToggleFavorite={(e) => {
                  e.stopPropagation();
                  isFavorite(recipe.idMeal)
                    ? removeFavorite(recipe.idMeal)
                    : addFavorite(recipe);
                }}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
} 