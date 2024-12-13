import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import EmailIcon from '@assets/email-icon.svg?react';
import AnogleLogoIcon from '@assets/anogle-logo.svg?react';
import GoogleIcon from '@assets/google-icon.svg?react';
import KakaoIcon from '@assets/kakao-icon.svg?react';
import LockIcon from '@assets/lock-icon.svg?react';
import EyeOffIcon from '@assets/eyeOff-icon.svg?react';
import EyeIcon from '@assets/eye-icon.svg?react';
import { useState } from 'react';

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const GOOGLE_REST_API_KEY = import.meta.env.VITE_GOOGLE_REST_API_KEY;
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

const yupSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function SignInScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [isShow, setIsShow] = useState(false);

  // 4. query hooks
  // 5. form hooks
  const { register } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(yupSchema),
  });
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  // return component
  return (
    <Stack
      css={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack
        direction="column"
        css={{ width: '100%', maxWidth: '360px', padding: '144px 60px', alignItems: 'center' }}
      >
        <AnogleLogoIcon />
        <Typography css={{ margin: '40px 0' }}>
          로그인하여 더 많은 서비스를 경험해보세요.
        </Typography>

        <Stack spacing={4} css={{ width: '100%', alignItems: 'center' }}>
          <TextField
            {...register('email')}
            placeholder="이메일"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            type={isShow ? 'text' : 'password'}
            {...register('password')}
            placeholder="비밀번호"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setIsShow(!isShow)}>
                      {isShow ? <EyeIcon /> : <EyeOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button css={{ width: '160px' }}>로그인</Button>
        </Stack>

        <Divider
          css={{
            'marginTop': '28px',
            'marginBottom': '20px',
            'width': '100%',
            '&::before, &::after': {
              border: '1px solid white',
            },
          }}
        >
          <Typography css={{ fontSize: '14px', padding: '0px 8px' }}>또는</Typography>
        </Divider>

        <Stack spacing={4} direction="row">
          <IconButton
            href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=token&redirect_uri=${GOOGLE_REDIRECT_URI}&client_id=${GOOGLE_REST_API_KEY}&scope=email profile`}
            css={{
              ':hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <GoogleIcon />
          </IconButton>
          <IconButton
            href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`}
            css={{
              ':hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <KakaoIcon />
          </IconButton>
        </Stack>

        <Stack spacing={2} css={{ marginTop: '16px', alignItems: 'center' }}>
          <Link to="" css={{ color: '#B0B0B0' }}>
            <Typography css={{ fontSize: '12px', color: 'inherit' }}>
              비밀번호를 잊어버렸나요?
            </Typography>
          </Link>
          <Link to="" css={{ color: '#2364C7' }}>
            <Typography css={{ fontSize: '12px', color: 'inherit' }}>회원가입</Typography>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { SignInScreen };
