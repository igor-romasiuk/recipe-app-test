import axios from 'axios';
import { Recipe, RecipeResponse } from '../types/recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const api = axios.create({
  baseURL: BASE_URL,
});

export const recipeApi = {
  getRecipes: async (letter: string = 'a'): Promise<Recipe[]> => {
    const response = await api.get<RecipeResponse>(`/search.php?f=${letter}`);
    return response.data.meals || [];
  },

  searchRecipes: async (query: string): Promise<Recipe[]> => {
    const response = await api.get<RecipeResponse>(`/search.php?s=${query}`);
    return response.data.meals || [];
  },

  getRecipeById: async (id: string): Promise<Recipe | null> => {
    const response = await api.get<RecipeResponse>(`/lookup.php?i=${id}`);
    return response.data.meals?.[0] || null;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/list.php?c=list');
    return response.data.meals.map((cat: { strCategory: string }) => cat.strCategory);
  },

  getRecipesByCategory: async (category: string): Promise<Recipe[]> => {
    const response = await api.get<RecipeResponse>(`/filter.php?c=${category}`);
    return response.data.meals || [];
  },
}; 