import axios from 'axios';

// const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org',
  params: {
    api_key: '6745abe623272a170b133f94803baa19', 
  },
});

export default axiosInstance;
