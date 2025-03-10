import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RecipeList from '../pages/RecipeList';
import RecipeDetail from '../pages/RecipeDetail';
import Favorites from '../pages/Favorites';

export const Main: React.FC = () => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>
  );
}; 