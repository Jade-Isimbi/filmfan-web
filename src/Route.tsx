import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import Layout from './Layout';
import MovieInformation from './components/MovieInformation/MovieInformation';
import MovieList from './components/MovieList/MovieList';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MovieList />} />
        <Route path="movies/:id" element={<MovieInformation />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
