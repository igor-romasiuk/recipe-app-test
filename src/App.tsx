import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15,
      gcTime: 1000 * 60 * 60,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * (2 ** attemptIndex), 30000),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
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
        <div className="min-h-screen flex flex-col bg-orange-50">
          <Header />
          <Main />
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
