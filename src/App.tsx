import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Route';
// import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
    
      <Router>
        <AppRoutes />
      </Router>
    
  );
};

export default App;
