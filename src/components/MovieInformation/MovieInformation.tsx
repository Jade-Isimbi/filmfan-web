import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Avatar, Divider, Stack, Rating, Skeleton } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface Movie {
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
  genres: { id: number; name: string }[];
  release_date: string;
}

interface CastMember {
  name: string;
  character: string;
  profile_path: string;
}

const MovieInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await axiosInstance.get(`/3/movie/${id}?language=en-US`);
        const creditsResponse = await axiosInstance.get(`/3/movie/${id}/credits?language=en-US`);

        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast.slice(0, 6));
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleRatingChange = async (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setUserRating(newValue);

    if (newValue !== null && id) {
      try {
        await axiosInstance.post(`/3/movie/${id}/rating`, { value: newValue });

        alert(`Rating submitted successfully! You rated this movie ${newValue} stars.`);
      } catch (error) {
        alert('Failed to submit your rating. Please try again later.');
        console.error('Error posting rating:', error);
      }
    }
  };

  const toggleFavorite = async () => {
    try {
      const action = isFavorite ? 'DELETE' : 'POST';
      await axiosInstance({
        method: action,
        url: `/3/account/${id}/favorite`,
        data: {
          media_type: 'movie',
          media_id: id,
          favorite: !isFavorite,
        },
      });
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
      alert('Failed to update favorites. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        
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
            onClick={handleBackClick}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
          >
            Back
          </Button>

          
          <Link to="/favorites" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              View Favorites
            </Button>
          </Link>
        </Box>

        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Skeleton variant="rectangular" width={300} height={450} sx={{ borderRadius: '16px', mx: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" height={50} width="70%" sx={{ mb: 2 }} />
            <Skeleton variant="text" height={30} width="50%" sx={{ mb: 2 }} />
            <Skeleton variant="text" height={30} width="30%" sx={{ mb: 3 }} />
            <Divider sx={{ mb: 2 }} />
            <Skeleton variant="text" height={40} width="40%" sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={150} sx={{ mb: 3 }} />
            <Skeleton variant="text" height={40} width="40%" sx={{ mb: 2 }} />
            <Stack
              direction="row"
              spacing={3}
              sx={{ flexWrap: 'wrap', overflowX: 'auto', pb: 2 }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <Box key={index} sx={{ textAlign: 'center', minWidth: 100 }}>
                  <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 1 }} />
                  <Skeleton variant="text" width={60} sx={{ mx: 'auto', mb: 1 }} />
                  <Skeleton variant="text" width={80} sx={{ mx: 'auto' }} />
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!movie) {
    return <Typography variant="h6" align="center">Movie not found!</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      
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
          onClick={handleBackClick}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
        >
          Back
        </Button>

        
        <Link to="/favorites" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            View Favorites
          </Button>
        </Link>
      </Box>

      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ borderRadius: '16px', width: '100%', maxWidth: '300px' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 2 }}>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </Typography>
            <Box
              onClick={toggleFavorite}
              sx={{
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 },
              }}
            >
              {isFavorite ? (
                <Favorite sx={{ fontSize: 40, color: 'red' }} />
              ) : (
                <FavoriteBorder sx={{ fontSize: 40, color: 'gray' }} />
              )}
            </Box>
          </Box>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
            {movie.genres.map((genre) => genre.name).join(', ')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'success.main', mb: 3 }}>
            Rating: {movie.vote_average}/10
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Synopsis
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {movie.overview}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Rate this Movie
          </Typography>
          <Rating
            value={userRating || movie.vote_average / 2}
            onChange={handleRatingChange}
            precision={0.5}
            sx={{
              mb: 2,
              '& .MuiRating-iconFilled': { color: 'gold' },
              '& .MuiRating-iconEmpty': { color: 'gray' },
            }}
          />

          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
            Click to rate this movie
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Top Cast
          </Typography>
          <Stack direction="row" spacing={3} sx={{ overflowX: 'auto', pb: 2 }}>
            {cast.map((member) => (
              <Box key={member.name} sx={{ textAlign: 'center', minWidth: 100 }}>
                <Avatar
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                  sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                />
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  {member.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  as {member.character}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieInformation;
