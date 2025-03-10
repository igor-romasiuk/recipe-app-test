import { useFavorites } from '../hooks/useFavorites';
import { EmptyFavorites } from '../components/EmptyFavorites';
import { FavoriteRecipeCard } from '../components/FavoriteRecipeCard';
import { CombinedIngredients } from '../components/CombinedIngredients';

export default function Favorites() {
  const { favorites, removeFavorite, getCombinedIngredients } = useFavorites();
  const combinedIngredients = getCombinedIngredients();

  if (favorites.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6 flex items-center text-orange-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          Your Favorite Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
            <FavoriteRecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onRemove={removeFavorite}
            />
          ))}
        </div>
      </div>

      <CombinedIngredients ingredients={combinedIngredients} />
    </div>
  );
} 