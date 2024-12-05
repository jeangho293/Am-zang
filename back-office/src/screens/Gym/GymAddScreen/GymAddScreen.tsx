import { Stack, TextField, Typography } from '@mui/material';
import { KakaoSearchMap } from '@components';

function GymAddScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Stack
      css={{ width: '100%', maxWidth: '720px', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography>암장 추가</Typography>

      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <KakaoSearchMap css={{ width: '200px', height: '200px' }} />
    </Stack>
  );
}

export { GymAddScreen };
