import axiosInstance from './api';

// Fetch genres
export const getGenres = async () => {
  try {
    const { data } = await axiosInstance.get('/genre/movie/list');
    return data.genres; // Returns the genres array
  } catch (error) {
    console.error('Error fetching genres:', error);
    return null;
  }
};

// Fetch popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const { data } = await axiosInstance.get('/movie/popular', {
      params: { page }, // Pass query parameters dynamically
    });
    return data.results; // Returns the movies array
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return null;
  }
};

// Fetch movie details
export const getMovieDetails = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/movie/${id}`, {
      params: { append_to_response: 'videos,credits' },
    });
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    return null;
  }
};
