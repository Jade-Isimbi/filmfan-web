import React from "react";
import { Box, Grid, Typography, Skeleton, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFavoritesQuery } from "../services/tmdb";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const FavoritesPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetFavoritesQuery(id!);

  const handleGoBack = () => {
    navigate("/");
  };
  const movies: Movie[] = data?.results || [];
  const sortedMovies = [...movies].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 2,
        width: "70%",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
      >
        Your Favorite Movies
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Back
        </Button>
      </Box>

      {isLoading ? (
        <Grid container spacing={4}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
                sx={{ borderRadius: "16px" }}
              />
              <Skeleton variant="text" width="60%" height={40} sx={{ mt: 2 }} />
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <Typography color="error">Failed to load favorites.</Typography>
      ) : data?.results?.length > 0 ? (
        <Grid container spacing={4}>
          {data.results.map((movie: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Box sx={{ textAlign: "center" }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    borderRadius: "16px",
                    width: "100%",
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
        <Typography variant="body1" sx={{ color: "text.secondary", mt: 4 }}>
          You have no favorite movies yet.
        </Typography>
      )}
    </Box>
  );
};

export default FavoritesPage;
