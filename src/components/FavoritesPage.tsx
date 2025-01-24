import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Skeleton, Button } from '@mui/material';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get('/3/account/${id}/favorite/movies');
        setFavorites(response.data.results);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  
  const handleGoBack = () => {
    navigate('/');
  };

 
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
        >
          Back
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3,  textAlign:'center',  }}>
          Your Favorite Movies
        </Typography>
        <Grid container spacing={4}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ borderRadius: '16px' }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  
  return (
    <Box
      sx={{
        display: 'flex',
        top:0,
        left:0,
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
      >
        Back
      </Button>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Your Favorite Movies
      </Typography>
      {favorites.length > 0 ? (
        <Grid container spacing={4}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    borderRadius: '16px',
                    width: '100%',
                  }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {movie.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ color: 'text.secondary', mt: 4 }}>
          You have no favorite movies yet.
        </Typography>
      )}
    </Box>
  );
};

export default FavoritesPage;
