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
  },
});
