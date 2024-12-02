import { AuthProvider, theme, queryClient } from '@libs';
import { ThemeProvider } from '@mui/material';
import { AppRouter } from './routes';
import { QueryClientProvider } from '@tanstack/react-query';

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
