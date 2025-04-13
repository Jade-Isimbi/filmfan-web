import { Routes, Route } from "react-router-dom";
import MovieInformation from "../components/MovieInformation/MovieInformation";
import MovieList from "../components/MovieList/MovieList";
import FavoritesPage from "../components/FavoritesPage";
import Layout from "../components/Layout";
import Login from "../components/Login";
import Register from "../components/Registration";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MovieList />} />
        <Route path="movies/:id" element={<MovieInformation />} />
        <Route path="favorites" element={<FavoritesPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
