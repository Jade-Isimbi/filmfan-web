import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Avatar,
  Divider,
  Stack,
  Rating,
  Skeleton,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
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

interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

const MovieInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await axiosInstance.get(`/3/movie/${id}?language=en-US`);
        const creditsResponse = await axiosInstance.get(`/3/movie/${id}/credits?language=en-US`);
        const similarResponse = await axiosInstance.get(`/3/movie/${id}/recommendations?language=en-US&page=1`);

        setMovie(movieResponse.data);
        setCast(creditsResponse.data.cast.slice(0, 6));
        setSimilarMovies(similarResponse.data.results.slice(0, 3)); // Limit to 3 similar movies
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
      <Box sx={{ p: 2 }}>
        {/* Skeleton for Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Skeleton variant="rectangular" width={100} height={40} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 1 }} />
        </Box>

        {/* Skeleton for Movie Details */}
        <Grid container spacing={2}>
          {/* Skeleton for Poster */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={375}
              sx={{ borderRadius: '8px', maxWidth: '250px', mx: 'auto' }}
            />
          </Grid>

          {/* Skeleton for Movie Info */}
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" height={40} width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="40%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="30%" sx={{ mb: 2 }} />
            <Divider sx={{ mb: 1 }} />
            <Skeleton variant="text" height={30} width="30%" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width="100%" height={100} sx={{ mb: 2 }} />
            <Skeleton variant="text" height={30} width="30%" sx={{ mb: 1 }} />

            {/* Skeleton for Top Cast */}
            <Skeleton variant="text" height={40} width="40%" sx={{ mb: 1, mt: 2 }} />
            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Box key={index} sx={{ textAlign: 'center', minWidth: 80 }}>
                  <Skeleton variant="circular" width={60} height={60} sx={{ mx: 'auto', mb: 1 }} />
                  <Skeleton variant="text" width={50} sx={{ mx: 'auto', mb: 1 }} />
                  <Skeleton variant="text" width={60} sx={{ mx: 'auto' }} />
                </Box>
              ))}
            </Stack>

            {/* Skeleton for Similar Movies */}
            <Skeleton variant="text" height={40} width="40%" sx={{ mb: 1, mt: 2 }} />
            <Grid container spacing={2}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={200}
                    sx={{ borderRadius: '8px' }}
                  />
                  <Box sx={{ mt: 1 }}>
                    <Skeleton variant="text" height={30} width="80%" />
                    <Skeleton variant="text" height={20} width="60%" />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!movie) {
    return <Typography variant="h6" align="center">Movie not found!</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Header with Back and View Favorites buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackClick}
          sx={{ borderRadius: 1, textTransform: 'none', fontWeight: 'bold' }}
        >
          Back
        </Button>
        <Link to="/favorites" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: 1,
              textTransform: 'none',
              fontWeight: 'bold',
            }}
            >
            View Favorites
          </Button>
        </Link>
      </Box>

      {/* Movie details */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{ borderRadius: '8px', width: '100%', maxWidth: '250px' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mr: 1 }}>
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
                <Favorite sx={{ fontSize: 30, color: 'red' }} />
              ) : (
                <FavoriteBorder sx={{ fontSize: 30, color: 'gray' }} />
              )}
            </Box>
          </Box>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>
            {movie.genres.map((genre) => genre.name).join(', ')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'success.main', mb: 2 }}>
            Rating: {movie.vote_average}/10
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Synopsis
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie.overview}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Rate this Movie
          </Typography>
          <Rating
            value={userRating || movie.vote_average / 2}
            onChange={handleRatingChange}
            precision={0.5}
            sx={{
              mb: 1,
              '& .MuiRating-iconFilled': { color: 'gold' },
              '& .MuiRating-iconEmpty': { color: 'gray' },
            }}
          />

          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
            Click to rate this movie
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
            Top Cast
          </Typography>
          <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
            {cast.map((member) => (
              <Box key={member.name} sx={{ textAlign: 'center', minWidth: 80 }}>
                <Avatar
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                  sx={{ width: 60, height: 60, mx: 'auto', mb: 1 }}
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

          {/* Similar Movies Section */}
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, mt: 2 }}>
            Similar Movies
          </Typography>
          <Grid container spacing={2}>
            {similarMovies.map((similarMovie) => (
              <Grid item xs={12} sm={6} md={4} key={similarMovie.id}>
                <Card
                  sx={{
                    borderRadius: '8px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/movie/${similarMovie.id}`)}
                >
                  <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w300${similarMovie.poster_path}`}
                    alt={similarMovie.title}
                    sx={{
                      borderRadius: '8px 8px 0 0',
                      height: 200,
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {similarMovie.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Rating: {similarMovie.vote_average}/10
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieInformation;