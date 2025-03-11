import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

interface MovieType {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axiosInstance.get(
          '/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc'
        );

        const sortedMovies = response.data.results.sort((a: MovieType, b: MovieType) =>
          a.title.localeCompare(b.title)
        );

        setMovies(sortedMovies);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, []);

  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '450px',
    width: '260px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
  };

  const moviePosterStyle: React.CSSProperties = {
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  const movieTitleStyle: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px',
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  };

  const movieOverviewStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#666',
    textAlign: 'justify',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={movie.id}
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <Box style={cardStyle}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={moviePosterStyle}
              />
              <Typography variant="h6" style={movieTitleStyle}>
                {movie.title}
              </Typography>
              <Typography variant="body2" style={movieOverviewStyle}>
                {movie.overview}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
