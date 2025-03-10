import axios from 'axios';
import { Recipe, RecipeResponse } from '../types/recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

const api = axios.create({
  baseURL: BASE_URL,
});

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

export const recipeApi = {
  getRecipes: async (): Promise<Recipe[]> => {
    let allRecipes: Recipe[] = [];

    const recipePromises = ALPHABET.map((letter) =>
      api
        .get<RecipeResponse>(`/search.php?f=${letter}`)
        .then((response) => response.data.meals || [])
        .catch(() => {
          console.error(`Error fetching recipes for letter ${letter}`);
          return [];
        })
    );

    const results = await Promise.all(recipePromises);
    allRecipes = results.flat();

    return allRecipes;
  },

  searchRecipes: async (query: string): Promise<Recipe[]> => {
    try {
      const response = await api.get<RecipeResponse>(`/search.php?s=${query}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error searching recipes:', error);
      return [];
    }
  },

  getRecipeById: async (id: string): Promise<Recipe | null> => {
    try {
      const response = await api.get<RecipeResponse>(`/lookup.php?i=${id}`);
      return response.data.meals?.[0] || null;
    } catch (error) {
      console.error('Error fetching recipe by id:', error);
      return null;
    }
  },

  getCategories: async (): Promise<string[]> => {
    try {
      const response = await api.get('/list.php?c=list');
      return response.data.meals.map((cat: { strCategory: string }) => cat.strCategory);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  getRecipesByCategory: async (category: string): Promise<Recipe[]> => {
    try {
      const response = await api.get<RecipeResponse>(`/filter.php?c=${category}`);
      return response.data.meals || [];
    } catch (error) {
      console.error('Error fetching recipes by category:', error);
      return [];
    }
  },
}; 