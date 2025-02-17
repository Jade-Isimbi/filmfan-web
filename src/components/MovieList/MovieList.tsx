import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useGetMovieListQuery } from '../../services/tmdb' 

const MovieList: React.FC = () => {
    const navigate = useNavigate()
    const { data, error, isLoading } = useGetMovieListQuery(undefined)

    if (isLoading) return <Typography>Loading...</Typography>
    if (error) return <Typography>Error fetching movies</Typography>

    return (
        <Box sx={{ padding: '20px' }}>
            <Grid container spacing={3}>
                {data?.results.map((movie: any) => (
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
                            }}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                style={{
                                    width: '100%',
                                    height: '350px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    marginTop: '10px',
                                    textAlign: 'center',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                }}
                            >
                                {movie.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '14px',
                                    color: '#666',
                                    textAlign: 'justify',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {movie.overview}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default MovieList
