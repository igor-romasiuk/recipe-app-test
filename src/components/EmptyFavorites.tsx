import React from 'react';
import { useNavigate } from 'react-router-dom';

export const EmptyFavorites: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16">
      <div className="mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-orange-900 mb-4">No Favorite Recipes Yet</h2>
      <p className="text-orange-800 mb-6">
        Start exploring and add recipes to your favorites!
      </p>
      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Browse Recipes
      </button>
    </div>
  );
}; 