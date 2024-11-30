import { Button } from '@mui/material';

const GOOGLE_REST_API_KEY = import.meta.env.VITE_GOOGLE_REST_API_KEY;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

function GoogleSignInScreen() {
  return (
    <Button
      href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=token&redirect_uri=${GOOGLE_REDIRECT_URI}&client_id=${GOOGLE_REST_API_KEY}&scope=email profile`}
    >
      로그인 화면
    </Button>
  );
}

export { GoogleSignInScreen };
