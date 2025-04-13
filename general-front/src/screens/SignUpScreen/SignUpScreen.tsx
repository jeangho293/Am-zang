import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMutation } from '@libs/react-query';
import { userRepository, verificationRepository } from '@repositories';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SignUpScreen() {
  // 1. destructure props
  // 2. lib hooks
  const navigator = useNavigate();

  // 3. state hooks
  const [email, setEmail] = useState('');
  const [isSend, setIsSend] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 4. query hooks
  const [sendCode, { loading: sendCodeLoading }] = useMutation(verificationRepository.sendCode, {
    onSuccess: () => setIsSend(true),
  });
  const [signUp, { loading: signUpLoading }] = useMutation(userRepository.signUp);

  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  const handleSendCode = async () => {
    await sendCode({ variables: { email } });
  };
  const handleSignUp = async () => {
    await signUp({ variables: { email, code, password, confirmPassword } });
  };

  return (
    <Stack css={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Stack
        spacing={3}
        css={{
          width: '400px',
          justifyContent: 'center',
          borderRadius: '12px',
          border: '1px solid rgba(0,0,0,0.1)',
          padding: '24px',
        }}
      >
        <Stack
          direction="row"
          css={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <IconButton onClick={() => navigator(-1)} css={{ width: '32px', height: '32px' }}>
            <ArrowBackIcon />
          </IconButton>

          <Typography css={{ fontSize: '32px', fontWeight: 500 }}>회원 가입</Typography>

          <Stack css={{ width: '32px' }}></Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          css={{ width: '100%', alignItems: 'center', marginTop: '8px' }}
        >
          <TextField
            onChange={(e) => setEmail(e.target.value)}
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
          <Button loading={sendCodeLoading} onClick={handleSendCode} css={{ height: '40px' }}>
            {isSend ? '재전송' : '인증'}
          </Button>
        </Stack>
        <TextField onChange={(e) => setCode(e.target.value)} placeholder="인증 번호" />
        <TextField
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="재확인 비밀번호"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button loading={signUpLoading} onClick={handleSignUp} css={{ width: '100%' }}>
          회원 가입
        </Button>
      </Stack>
    </Stack>
  );
}
