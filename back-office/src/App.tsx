import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@libs/auth';
import { AppRouter } from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@libs/react-query';
import { ThemeProvider } from '@mui/material';
import { theme } from '@libs/theme';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <AppRouter />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
