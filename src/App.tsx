import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Movies } from '.';
import useStyles from './styles';

// Define the App component using TypeScript
const App: React.FC = () => {
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
