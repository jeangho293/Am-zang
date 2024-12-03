import { AuthProvider, theme, queryClient } from '@libs';
import { ThemeProvider } from '@mui/material';
import { AppRouter } from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
