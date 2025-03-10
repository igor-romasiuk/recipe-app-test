import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => recipeApi.getRecipeById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!recipe) {
    return <div className="text-center text-red-500">Recipe not found</div>;
  }

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = recipe[`strIngredient${i + 1}` as keyof typeof recipe];
    const measure = recipe[`strMeasure${i + 1}` as keyof typeof recipe];
    return ingredient && ingredient.trim() ? { ingredient, measure } : null;
  }).filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-96 object-cover"
          />
          <button
            onClick={() => isFavorite(recipe.idMeal) ? removeFavorite(recipe.idMeal) : addFavorite(recipe)}
            className={`absolute top-4 right-4 p-3 rounded-full bg-white shadow-md ${
              isFavorite(recipe.idMeal)
                ? 'text-red-500 hover:text-red-600'
                : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            ❤
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
            <div className="flex gap-4 text-gray-600">
              <span>{recipe.strCategory}</span>
              <span>•</span>
              <span>{recipe.strArea}</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {ingredients.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item?.ingredient}</span>
                  <span className="text-gray-600">{item?.measure}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Instructions</h2>
            <div className="space-y-4">
              {recipe.strInstructions.split('\r\n').filter(Boolean).map((step, index) => (
                <p key={index}>{step}</p>
              ))}
            </div>
          </div>

          {recipe.strYoutube && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Video Tutorial</h2>
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700"
              >
                Watch on YouTube
              </a>
            </div>
          )}

          {recipe.strSource && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Source</h2>
              <a
                href={recipe.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700"
              >
                Original Recipe
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 