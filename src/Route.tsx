import { Routes, Route } from 'react-router-dom';
import MovieInformation from './components/MovieInformation/MovieInformation';
import MovieList from './components/MovieList/MovieList';
import FavoritesPage from './components/FavoritesPage';
import Layout from './Layout';

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Layout />}>
        <Route index element={<MovieList />} /> 
        <Route path="movies/:id" element={<MovieInformation />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
       
  );
};

export default AppRoutes;
