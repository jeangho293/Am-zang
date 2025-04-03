import { Stack, Typography } from '@mui/material';
import { ProfileIcon } from '../ProfileIcon';
import { Navigation } from '../Navigation';

export function Header() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Stack css={{ width: '100%' }}>
      <Stack
        direction="row"
        css={{
          borderBottom: '0.1px solid gray',
          height: '56px',
          alignItems: 'center',
          padding: '0 12px',
          justifyContent: 'space-between',
        }}
      >
        {/* 로고 및 상단메뉴 */}
        <Stack direction="row" spacing="12px">
          <Typography css={{ fontSize: '24px', fontWeight: 500 }}>Am-Zang</Typography>
          <Navigation />
        </Stack>

        {/* 프로필 영역 */}
        <ProfileIcon />
      </Stack>
    </Stack>
  );
}
