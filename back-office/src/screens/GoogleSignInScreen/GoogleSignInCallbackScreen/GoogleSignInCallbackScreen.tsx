import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGoogleSignIn, useUser } from '../../../libs/auth';
import { CircularProgress } from '@mui/material';
import queryString from 'query-string';

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
    const { access_token } = queryString.parse(hash) as { access_token: string };

    if (access_token) {
      signIn(access_token);
    }
  }, [hash]);

  // 8. handlers

  return !user ? <CircularProgress /> : <Navigate to="/" />;
}

export { GoogleSignInCallbackScreen };
