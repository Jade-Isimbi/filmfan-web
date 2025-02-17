import React from 'react';
import { Box, Grid, Skeleton, Divider, Stack } from '@mui/material';

const MovieSkeleton: React.FC = () => {
  return (
    <Box sx={{ p: 2 }} width={"100%"}>
      
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

      <Grid container spacing={2}>
        <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={375}
            sx={{ borderRadius: '8px', maxWidth: '250px', mx: 'auto' }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Skeleton variant="text" height={40} width="60%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={20} width="40%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={20} width="30%" sx={{ mb: 2 }} />
          <Divider sx={{ mb: 1 }} />
          <Skeleton variant="text" height={30} width="30%" sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width="100%" height={100} sx={{ mb: 2 }} />
          <Skeleton variant="text" height={30} width="30%" sx={{ mb: 1 }} />

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
};

export default MovieSkeleton;
