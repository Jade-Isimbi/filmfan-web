import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue color
    },
    background: {
      default: '#f4f6f8', // Light grey
      paper: '#ffffff', // White for cards or surfaces
    },
    text: {
      primary: '#333333', // Dark text color
    },
  },
});

export default theme;
