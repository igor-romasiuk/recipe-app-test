import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '../services/api';
import { useFavorites } from '../hooks/useFavorites';
import { Loading } from '../components/Loading';
import { BackButton } from '../components/BackButton';
import { RecipeHeader } from '../components/RecipeHeader';
import { IngredientsList } from '../components/IngredientsList';
import { Instructions } from '../components/Instructions';
import { VideoTutorial } from '../components/VideoTutorial';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => recipeApi.getRecipeById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <Loading message="Loading recipe..." />;
  }

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recipe not found</h2>
        <BackButton />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <BackButton />

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <RecipeHeader
          recipe={recipe}
          isFavorite={isFavorite(recipe.idMeal)}
          onToggleFavorite={() =>
            isFavorite(recipe.idMeal)
              ? removeFavorite(recipe.idMeal)
              : addFavorite(recipe)
          }
        />

        <div className="p-6 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <IngredientsList recipe={recipe} />
            <Instructions instructions={recipe.strInstructions} />
          </div>

          <VideoTutorial videoUrl={recipe.strYoutube} />

          {recipe.strSource && (
            <div className="flex justify-end">
              <a
                href={recipe.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
                View Original Recipe
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 