import { Button, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useForm } from 'react-hook-form';
import { useMutation } from '@libs/react-query';
import { userRepository } from '@repositories';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const yupSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/)
      .required(),
    confirmPassword: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{8,}$/)
      .required(),
  })
  .required();

export function SignUpScreen() {
  // 1. destructure props
  // 2. lib hooks
  const navigate = useNavigate();

  // 3. state hooks
  const [isDuplicated, setIsDuplicated] = useState<boolean | null>(true);

  // 4. query hooks
  const [checkEmail, { loading: checkEmailLoading }] = useMutation(userRepository.checkEmail, {
    onSuccess: (response) => setIsDuplicated(response),
  });
  const [signUp, { loading: signUpLoading }] = useMutation(userRepository.signUp);
  // 5. form hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(yupSchema),
  });

  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Stack css={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Stack
        spacing={3}
        css={{ width: '100%', maxWidth: '360px', padding: '24px', border: '1px solid #e0e0e0' }}
      >
        <IconButton onClick={() => navigate(-1)} css={{ alignSelf: 'start' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography css={{ fontSize: '24px', textAlign: 'center' }}>회원가입</Typography>

        <Stack spacing={2} direction="row" css={{ alignItems: 'center' }}>
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
            error={!!errors.email}
          />
          <Button
            loading={checkEmailLoading}
            onClick={handleSubmit(async ({ email }) => {
              await checkEmail({ variables: { email } });
            })}
            css={{ height: '36px' }}
          >
            <Typography css={{ fontSize: '12px' }}>중복확인</Typography>
          </Button>
        </Stack>

        <TextField
          {...register('password')}
          type="password"
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
          error={!!errors.password}
        />
        <TextField
          {...register('confirmPassword')}
          type="password"
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
          error={!!errors.confirmPassword}
        />
        <Button
          loading={signUpLoading}
          disabled={!!isDuplicated}
          onClick={handleSubmit(async ({ email, password, confirmPassword }) => {
            await signUp({ variables: { email, password, confirmPassword } });
          })}
        >
          회원 가입
        </Button>
      </Stack>
    </Stack>
  );
}
