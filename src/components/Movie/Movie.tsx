import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { getGenres } from './apiCalls';
import { Link } from 'react-router-dom';
import { Grid, Grow, Rating, Tooltip, Typography } from '@mui/material';
import useStyles from './style';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

interface MovieProps {
  movie: Movie; 
  index: number;
}

const Movie: React.FC<MovieProps> = ({ movie, index }) => {
  const classes = useStyles();
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/movies/${movie.id}`)}>
      {/* <h3>{movie.title}</h3>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      /> */}
      {/* <p>{movie.overview}</p> */}
    </div>
  );
};

export default Movie;
