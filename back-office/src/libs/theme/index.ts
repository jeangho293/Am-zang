import { createTheme } from '@mui/material';

export const theme = createTheme({
  spacing: 4,
  typography: {
    fontFamily: '"Poppins", sans-serif;',
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
        disableRipple: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          paddingLeft: '8px',
        },
        input: {
          padding: '8px',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
});
