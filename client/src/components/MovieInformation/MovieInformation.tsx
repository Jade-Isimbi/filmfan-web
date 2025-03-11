import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  useGetMovieQuery,
  useGetCreditsQuery,
  useGetSimilarMoviesQuery,
  usePostRatingMutation,
  usePostFavoriteMutation,
} from "../../services/tmdb";

interface Movie {
  movie: string;
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

  const [loading, setLoading] = useState<boolean>(true);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { data: movie, isLoading: isMovieLoading } = useGetMovieQuery(id!);
  const { data: credits, isLoading: isCreditsLoading } = useGetCreditsQuery(
    id!
  );
  const { data: similarMovies, isLoading: isSimilarMoviesLoading } =
    useGetSimilarMoviesQuery(id!);
  const [postRating, { isLoading: isRatingLoading }] = usePostRatingMutation();
  const [postFavorite, { isLoading: isFavoriteLoading, isError }] =
    usePostFavoriteMutation();

  const cast: CastMember[] = credits?.cast.slice(0, 6) || [];
  const similar: SimilarMovie[] = similarMovies?.results.slice(0, 3) || [];

  const handleBackClick = () => {
    navigate("/");
  };

  const handleRatingChange = async (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setUserRating(newValue);

    if (newValue !== null && id) {
      try {
        await postRating({ id, rating: newValue }).unwrap();
        alert(
          `Rating submitted successfully! You rated this movie ${newValue} stars.`
        );
      } catch (error) {
        alert("Failed to submit your rating. Please try again later.");
        console.error("Error posting rating:", error);
      }
    }
  };

  const toggleFavorite = async () => {
    try {
      await postFavorite({
        media_type: "movie",
        media_id: id,
        favorite: !isFavorite,
      }).unwrap();
      setIsFavorite(!isFavorite);
      alert("Updated to favorite");
    } catch (error) {
      console.error("Error updating favorites:", error);
      alert("Failed to update favorites. Please try again.");
    }
  };

  if (isMovieLoading || isCreditsLoading || isSimilarMoviesLoading) {
    return (
      <Box sx={{ p: 2 }} width={"100%"}>
        <Skeleton
          variant="rectangular"
          width={100}
          height={40}
          sx={{ borderRadius: 1 }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={375}
              sx={{ borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" height={40} width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="40%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="30%" sx={{ mb: 2 }} />
            <Divider sx={{ mb: 1 }} />
            <Skeleton variant="text" height={30} width="30%" sx={{ mb: 1 }} />
            <Skeleton
              variant="rectangular"
              width="215vh"
              height={100}
              sx={{ mb: 2 }}
            />
            <Skeleton variant="text" height={30} width="30%" />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Typography variant="h6" align="center">
        Movie not found!
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackClick}
          sx={{
            borderRadius: 1,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Back
        </Button>
        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: 1,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            View Favorites
          </Button>
        </Link>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{
              borderRadius: "8px",
              width: "100%",
              maxWidth: "250px",
              position: "sticky",
              top: "60px",
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mr: 1 }}>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </Typography>
            <Box
              onClick={toggleFavorite}
              sx={{
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
            >
              {isFavorite ? (
                <Favorite sx={{ fontSize: 30, color: "red" }} />
              ) : (
                <FavoriteBorder sx={{ fontSize: 30, color: "gray" }} />
              )}
            </Box>
          </Box>
          <Typography variant="h6" sx={{ color: "success.main", mb: 2 }}>
            Rating: {movie.vote_average}/10
          </Typography>

          <Divider sx={{ mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Synopsis
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie.overview}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Rate this Movie
          </Typography>
          <Rating
            value={userRating || movie.vote_average / 2}
            onChange={handleRatingChange}
            precision={0.5}
            sx={{
              mb: 1,
              "& .MuiRating-iconFilled": { color: "gold" },
              "& .MuiRating-iconEmpty": { color: "gray" },
            }}
          />
          <Typography variant="caption" sx={{ color: "text.secondary", mt: 1 }}>
            Click to rate this movie
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
            Top Cast
          </Typography>
          <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: 1 }}>
            {cast.map((member) => (
              <Box
                key={member.name}
                sx={{
                  textAlign: "center",
                  width: 80,
                  position: "relative",
                }}
              >
                <Avatar
                  alt={member.name}
                  src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {member.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {member.character}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            Similar Movies
          </Typography>
          <Grid container spacing={2}>
            {similar.map((similarMovie) => (
              <Grid item xs={12} md={4} key={similarMovie.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                    alt={similarMovie.title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {similarMovie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
