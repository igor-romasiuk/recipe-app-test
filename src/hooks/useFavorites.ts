import { useState, useEffect } from 'react';
import { Recipe, Ingredient } from '../types/recipe';

const FAVORITES_KEY = 'favoriteRecipes';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (recipe: Recipe) => {
    const newFavorites = [...favorites, recipe];
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const removeFavorite = (recipeId: string) => {
    const newFavorites = favorites.filter(recipe => recipe.idMeal !== recipeId);
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const isFavorite = (recipeId: string) => {
    return favorites.some(recipe => recipe.idMeal === recipeId);
  };

  const getCombinedIngredients = (): Ingredient[] => {
    const ingredientMap = new Map<string, Ingredient>();

    favorites.forEach(recipe => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
        const measure = recipe[`strMeasure${i}` as keyof Recipe];

        if (ingredient && ingredient.trim()) {
          const existingIngredient = ingredientMap.get(ingredient);
          if (existingIngredient) {
            existingIngredient.measure += `, ${measure}`;
          } else {
            ingredientMap.set(ingredient, {
              name: ingredient,
              measure: measure?.toString() || '',
            });
          }
        }
      }
    });

    return Array.from(ingredientMap.values());
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getCombinedIngredients,
  };
}; 