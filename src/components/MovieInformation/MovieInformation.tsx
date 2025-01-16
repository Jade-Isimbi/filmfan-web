import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Skeleton, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

interface Movie {
  title: string;
  overview: string;
  vote_average: number;
  poster_path: string;
}

const MovieInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [data, setData] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/3/movie/${id}?language=en-US`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
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

  if (loading) {
    return (
      <Grid 
        container 
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '30px',
          gap: '20px',
        }}
      >
        <Grid 
          item 
          xs={12} 
          md={6} 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Skeleton 
            variant="circular" 
            width={60} 
            height={60} 
            animation="wave" 
            style={{
              backgroundColor: '#e0e0e0',
              marginBottom: '20px',
            }} 
          />
          <Skeleton 
            variant="rounded" 
            height={320} 
            animation="wave" 
            style={{
              width: '80%',
              borderRadius: '12px',
              backgroundColor: '#f0f0f0',
            }} 
          />
          <Skeleton 
            variant="rounded" 
            height={50} 
            width="70%" 
            animation="wave" 
            style={{
              borderRadius: '8px',
              marginTop: '20px',
              backgroundColor: '#e8e8e8',
            }} 
          />
        </Grid>
        <Grid 
          item 
          xs={12} 
          md={6} 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Skeleton 
            variant="text" 
            height={40} 
            width="60%" 
            animation="wave" 
            style={{
              borderRadius: '8px',
              backgroundColor: '#f0f0f0',
            }} 
          />
          <Skeleton 
            variant="text" 
            height={40} 
            width="90%" 
            animation="wave" 
            style={{
              borderRadius: '6px',
              backgroundColor: '#e8e8e8',
            }} 
          />
          <Skeleton 
            variant="text" 
            height={40} 
            width="75%" 
            animation="wave" 
            style={{
              borderRadius: '6px',
              backgroundColor: '#e8e8e8',
            }} 
          />
          <Skeleton 
            variant="text" 
            height={40} 
            width="85%" 
            animation="wave" 
            style={{
              borderRadius: '6px',
              backgroundColor: '#f0f0f0',
            }} 
          />
          <Skeleton 
            variant="text" 
            height={40} 
            width="80%" 
            animation="wave" 
            style={{
              borderRadius: '6px',
              backgroundColor: '#e8e8e8',
            }} 
          />
        </Grid>
      </Grid>
    );
  }
  

  if (!data) {
    return <Typography variant="h6" align="center">Movie not found!</Typography>;
  }

  return (
    <Box 
      style={{
        margin: '20px',
        padding: '20px',
      }}
    >
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleBackClick} 
        style={{ marginBottom: '20px' }}
      >
        Back 
      </Button>
      <Grid 
        container 
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}
      >
        <Grid 
          item 
          xs={12} 
          md={6} 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            style={{
              borderRadius: '10px',
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
            }}
          />
        </Grid>

        <Grid 
          item 
          xs={12} 
          md={6} 
          style={{
            padding: '20px',
          }}
        >
          <Typography 
            variant="h4" 
            style={{ 
              marginBottom: '20px', 
              fontWeight: 'bold', 
            }}
          >
            {data.title}
          </Typography>
          <Typography 
            variant="body1" 
            style={{
              marginBottom: '15px',
              lineHeight: '1.6',
            }}
          >
            {data.overview}
          </Typography>
          <Typography 
            variant="subtitle1" 
            style={{ 
              fontStyle: 'italic',
              color: 'gray',
            }}
          >
            Rating: {data.vote_average}/10
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieInformation;
