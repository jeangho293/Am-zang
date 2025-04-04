import {
  Button,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSignInLocal } from '@libs/auth';

export function SignInScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [isShow, setIsShow] = useState(false);

  // 4. query hooks
  const [signIn, { loading }] = useSignInLocal();

  // 5. form hooks
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
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
        spacing={3}
        useFlexGap
        css={{
          width: '100%',
          maxWidth: '400px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
        }}
      >
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
          {...register('password')}
          type={isShow ? 'text' : 'password'}
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
                  <IconButton onClick={() => setIsShow(!isShow)} css={{ padding: 4 }}>
                    {isShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          loading={loading}
          onClick={handleSubmit(({ email, password }) => {
            signIn({ email, password });
          })}
          css={{ width: '80%' }}
        >
          로그인
        </Button>

        <Stack css={{ alignItems: 'center', marginTop: '4px' }}>
          <Typography css={{ fontSize: '12px' }}>회원이 아니신가요?</Typography>
          {/* TODO: Link 및 회원가입 페이지 적용 */}
          <Typography css={{ fontSize: '12px' }}>여기를 눌러 회원가입을 하세요!</Typography>
        </Stack>

        <Divider css={{ width: '80%' }}>
          <Chip label="or" size="small" />
        </Divider>

        <Stack direction="row" spacing={4}>
          <IconButton disableRipple css={{ backgroundColor: '#FAE100' }}>
            <EmailIcon />
          </IconButton>

          <IconButton
            disableRipple
            css={{ backgroundColor: '#FFFFFF', border: '0.1px solid #000000' }}
          >
            <EmailIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
