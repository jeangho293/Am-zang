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
          padding: '4px 0',
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: 'none',
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          top: '4px',
          left: '2px',
        },
      },
    },
  },
});
