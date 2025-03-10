import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router future={{ 
        v7_relativeSplatPath: true,
        v7_startTransition: true 
      }}>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-teal-600 text-white py-4">
            <div className="container mx-auto px-4">
              <div className="flex gap-6">
                <a href="/" className="text-lg hover:text-teal-200">
                  Recipes
                </a>
                <a href="/favorites" className="text-lg hover:text-teal-200">
                  Favorites
                </a>
              </div>
            </div>
          </nav>
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
