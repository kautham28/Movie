// src/theme.js
import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light mode
            primary: { 
              main: '#1976d2',
              light: '#42a5f5',
              dark: '#1565c0' 
            },
            secondary: {
              main: '#E74C3C',
              light: '#ff7961',
              dark: '#ba000d'
            },
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            text: {
              primary: '#121212',
              secondary: '#333333',
            },
          }
        : {
            // Dark mode
            primary: { 
              main: '#90caf9',
              light: '#e3f2fd',
              dark: '#42a5f5' 
            },
            secondary: {
              main: '#f48fb1',
              light: '#f6a5c0',
              dark: '#bf5f82'
            },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
              secondary: '#b0bec5',
            },
          }),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          },
        },
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 500,
      },
    },
  });
};

export default getTheme;