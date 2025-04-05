import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          paddingLeft: '8px',
        },
        input: {
          padding: '12px 8px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          'backgroundColor': '#8F87F1',
          'color': '#FFFFFF',
          '&.Mui-disabled': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
  spacing: 4,
});
