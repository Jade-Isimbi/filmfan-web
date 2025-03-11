import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from './services/mystore'; 
import { Provider } from "react-redux";
import AppRoutes from "./Route";

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
    </Provider>
  );
};

export default App;
