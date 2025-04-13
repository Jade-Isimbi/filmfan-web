import React, { useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetMovieListQuery } from "../../services/tmdb";
import { handleError } from "../../util/globals";

interface MovieType {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const MovieList: React.FC = () => {
  const navigate = useNavigate();
  const { data, error, isError, isLoading } = useGetMovieListQuery(undefined);

  useEffect(() => {
    if (isError) {
      handleError(error);
    }
  }, [isError]);

  if (isLoading) return <p>Loading movies...</p>;
  if (error) return <p>Error fetching movies. Please try again.</p>;

  const movies: MovieType[] = data?.results || [];
  const sortedMovies = [...movies].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={5}>
        {sortedMovies.map((movie) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={movie.id}
            onClick={() => navigate(`/movies/${movie.id}`)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                height: 450,
                width: "100%",

                borderRadius: 2,
                overflow: "hidden",

                boxShadow: 3,
                p: 2,
                bgcolor: "#fff", //'grey.900',
                transition: "transform 0.3s",

                cursor: "pointer",
                mx: "auto",

                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  width: "100%",
                  height: 350,
                  objectFit: "cover",
                  borderRadius: 1.5,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                  mt: 1,
                  textAlign: "center",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                {movie.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: 14,
                  color: "text.secondary",
                  textAlign: "justify",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
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
