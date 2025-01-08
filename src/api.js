import axios from 'axios';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', L
  params: {
    api_key: tmdbApiKey, 
  },
});

export default axiosInstance;
