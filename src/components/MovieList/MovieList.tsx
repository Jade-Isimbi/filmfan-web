import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import axiosInstance from '../../axiosInstance';
import style from './style';
import { useNavigate } from 'react-router-dom';

interface MovieType {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

const MovieList: React.FC = () => {
  const navigate = useNavigate()
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axiosInstance.get(
          '/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc'
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, []);

  

  return (
    <Box sx={style.container}>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id} onClick={() => navigate(`/movies/${movie.id}`)}>
            <Box sx={style.card}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={style.moviePoster as React.CSSProperties}
              />
              <Typography variant="h6" sx={style.movieTitle}>
                {movie.title}
              </Typography>
              <Typography variant="body2" sx={style.movieOverview}>
                {movie.overview.length >= 100
                  ? `${movie.overview.substring(0, 100)}...`
                  : movie.overview}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
