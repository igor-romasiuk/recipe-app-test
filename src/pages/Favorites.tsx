import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

export default function Favorites() {
  const { favorites, removeFavorite, getCombinedIngredients } = useFavorites();
  const navigate = useNavigate();
  const combinedIngredients = getCombinedIngredients();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No Favorite Recipes</h2>
        <p className="text-gray-600">
          Start adding recipes to your favorites to see them here!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-6">Your Favorite Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((recipe) => (
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
                    onClick={() => removeFavorite(recipe.idMeal)}
                    className="p-2 rounded-full text-red-500 hover:text-red-600"
                  >
                    ❤
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Combined Ingredients List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {combinedIngredients.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-600">{item.measure}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 