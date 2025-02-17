import { Routes, Route } from 'react-router-dom'
import MovieInformation from './components/MovieInformation/MovieInformation'
import MovieList from './components/MovieList/MovieList'
import FavoritesPage from './components/FavoritesPage'
import Layout from './Layout'
import Login from './components/Login'
import Registration from './Registration'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MovieList />} />
                <Route path="movies/:id" element={<MovieInformation />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="Login" element={<Login />} />
                <Route path="Registration" element={<Registration />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
