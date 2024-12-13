import { createTheme } from '@mui/material';

export const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#855AFF',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif;',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'primary',
        disableElevation: true,
        disableRipple: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          paddingLeft: '8px',
          paddingRight: '8px',
          backgroundColor: '#FFFFFF',
        },
        input: {
          padding: '8px 0',
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
  },
});
