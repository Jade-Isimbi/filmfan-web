import axiosInstance from './axiosInstance';


export const getGenres = async () => {
  try {
    const { data } = await axiosInstance.get('/genre/movie/list');
    return data.genres; 
  } catch (error) {
    console.error('Error fetching genres:', error);
    return null;
  }
};



export const getMovieDetails = async (id: string) => {
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
