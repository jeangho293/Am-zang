import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import { useSignOut, useUser } from '@libs/auth';
import { useState } from 'react';

export function ProfileIcon() {
  // 1. destructure props
  // 2. lib hooks
  const [user] = useUser();
  const signOut = useSignOut();

  // 3. state hooks
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const open = Boolean(anchorEl);

  // 7. effect hooks
  // 8. handlers
  return (
    <Stack direction="row" spacing="4px" css={{ alignItems: 'center' }}>
      {/* Profile Icon */}
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <AccountCircleIcon css={{ color: '#000000' }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={signOut}>로그아웃</MenuItem>
      </Menu>

      {/* 사용자 ID */}
      <Tooltip title={user.email}>
        <Typography
          css={{ fontSize: '14px', textOverflow: 'ellipsis', overflow: 'hidden', width: '100px' }}
        >
          {user.email}
        </Typography>
      </Tooltip>
    </Stack>
  );
}
