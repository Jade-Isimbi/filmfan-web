// src/theme/globalStyles.ts
import { GlobalStyles } from '@mui/material';

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        margin: 0,
        padding: 0,
        backgroundColor: '#f5f5f5',
        fontFamily: "'Roboto', 'Arial', sans-serif",
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
    }}
  />
);

export default globalStyles;
