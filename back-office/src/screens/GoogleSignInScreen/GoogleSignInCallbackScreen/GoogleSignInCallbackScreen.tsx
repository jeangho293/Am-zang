import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGoogleSignIn, useUser } from '../../../libs/auth';
import { CircularProgress } from '@mui/material';

function GoogleSignInCallbackScreen() {
  // 1. destructure props
  // 2. lib hooks
  const { hash } = useLocation();
  const [signIn] = useGoogleSignIn();
  const [user] = useUser();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  useEffect(() => {
    const accessToken = hash.split('&')[0].split('=')[1];

    if (accessToken) {
      signIn(accessToken);
    }
  }, [hash]);

  // 8. handlers

  return !user ? <CircularProgress /> : <Navigate to="/" />;
}

export { GoogleSignInCallbackScreen };
