import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useSignInGoogle } from '@libs/auth';

export function SignInScreen() {
  const [signInWithGoogle, { loading }] = useSignInGoogle();

  return (
    <GoogleLogin
      onSuccess={({ credential }) => {
        if (credential) {
          signInWithGoogle(credential);
        }
      }}
    />
  );
}
