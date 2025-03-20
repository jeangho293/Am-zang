import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './libs/auth';
import { AppRouter } from './routes';

function App() {
  return (
    <GoogleOAuthProvider clientId="184395828728-cpg99sur6rgt6gt42f78bd1d67ndu5gi.apps.googleusercontent.com">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
