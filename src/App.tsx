import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Route';
import MovieInformation from './components/MovieInformation/MovieInformation';
import FavoritesPage from './components/FavoritesPage';


const App: React.FC = () => {
  return (
    
      <Router>
        <AppRoutes />
      </Router>
    
  );
};

export default App;
