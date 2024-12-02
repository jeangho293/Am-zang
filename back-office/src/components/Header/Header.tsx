import { Stack, Typography, IconButton, Tooltip } from '@mui/material';
import { useSignOut, useUser } from '@libs';
import LogoutIcon from '@assets/logout-icon.svg?react';
import { Navigate } from '../Navigate';
import { AnogleLogo } from '../AnogleLogo';

function Header() {
  // 1. destructure props
  // 2. lib hooks
  const [user] = useUser();
  const [signOut] = useSignOut();

  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Stack
      css={{
        'height': '60px',
        'justifyContent': 'center',
        'padding': '0 16px',
        'position': 'relative',
        '::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: '16px',
          width: 'calc(100% - 32px)',
          height: '0.2px',
          backgroundColor: '#000000',
        },
      }}
    >
      <Stack direction="row" css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack direction="row">
          <AnogleLogo />
          <Navigate css={{ marginLeft: '60px' }} />
        </Stack>

        <Stack direction="row" spacing={1} css={{ alignItems: 'center' }}>
          <Typography>{user.email}</Typography>
          <Tooltip arrow title="logout">
            <IconButton onClick={signOut}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { Header };
