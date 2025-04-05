import { ThemeProvider } from '@mui/material';
import { AppRouter } from './routes';
import { theme } from '@libs/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@libs/react-query';
import { AuthProvider } from '@libs/auth';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
