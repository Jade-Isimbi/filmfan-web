import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom'; // For routing
import Movie from './components/Movie'; // Correct import for Movie component
import useStyles from './styles';

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          {/* Define route for a single Movie component */}
          <Route path="/" element={<Movie />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
