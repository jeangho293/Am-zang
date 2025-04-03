import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@libs/auth';
import { AppRouter } from './routes';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@libs/react-query';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
