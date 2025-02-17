import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', 
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff', 
    },
    text: {
      primary: '#333333', 
    },
  },
});

export default theme;
