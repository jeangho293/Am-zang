import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@libs/auth';
import { AppRouter } from './routes';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
