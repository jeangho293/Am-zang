import { Stack, Typography, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import { useSignOut, useUser } from '@libs';
import LogoutIcon from '@assets/logout-icon.svg?react';
import { Navigate } from '../Navigate';
import { AnogleLogo } from '../AnogleLogo';
import { useState } from 'react';

function Header() {
  // 1. destructure props
  // 2. lib hooks
  const [user] = useUser();
  const [signOut] = useSignOut();

  // 3. state hooks
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const open = Boolean(anchorEl);

  // 7. effect hooks
  // 8. handlers
  const handlerClose = () => {
    setAnchorEl(null);
  };

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
          <Tooltip arrow title={user.email}>
            <IconButton
              disableRipple
              onClick={(e) => setAnchorEl(e.currentTarget)}
              css={{
                'backgroundColor': 'rgba(0, 0, 0, 0.1)',
                'width': '48px',
                'height': '48px',
                'padding': '0',
                ':hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Stack
                css={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: 'rgba(82, 140, 0, 0.45)',
                  borderRadius: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography css={{ fontSize: '24px' }}>{user.email[0].toUpperCase()}</Typography>
              </Stack>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handlerClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            css={{
              '& .MuiPaper-root': {
                width: '144px',
                marginTop: '8px',
              },
            }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={signOut}>
              <Stack
                direction="row"
                css={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography>Logout</Typography>
                <IconButton css={{ padding: '0' }}>
                  <LogoutIcon css={{ width: '24px', height: '24px' }} />
                </IconButton>
              </Stack>
            </MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { Header };
