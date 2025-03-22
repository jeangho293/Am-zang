import { GoogleLogin } from '@react-oauth/google';
import { useSignInGoogle } from '@libs/auth';
import { Stack, Typography } from '@mui/material';

export function SignInScreen() {
  const [signInWithGoogle] = useSignInGoogle();

  return (
    <Stack
      css={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        css={{
          width: '400px',
          alignItems: 'center',
          border: '0.5px solid gray',
          borderRadius: '12px',
          padding: '16px',
        }}
      >
        <Typography css={{ fontSize: '36px', fontWeight: 800 }}>Login</Typography>
        <Typography css={{ marginBottom: '12px' }}>Welcome back! Sign in to continue.</Typography>
        <GoogleLogin
          width="360px"
          onSuccess={({ credential }) => {
            if (credential) {
              signInWithGoogle(credential);
            }
          }}
        />
      </Stack>
    </Stack>
  );
}
