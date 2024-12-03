import { DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import CancelIcon from '@assets/cancel-icon.svg?react';
import type { ReactNode } from 'react';

function DialogTitleGroup(props: { title: string; icon?: ReactNode; onClose: () => void }) {
  // 1. destructure props
  const { title, icon, onClose } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <DialogTitle>
      <Stack direction="row" css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack spacing={2} direction="row" css={{ alignItems: 'center' }}>
          {icon}
          <Typography css={{ fontSize: '24px', fontWeight: 500 }}>{title}</Typography>
        </Stack>
        <IconButton onClick={onClose}>
          <CancelIcon />
        </IconButton>
      </Stack>
    </DialogTitle>
  );
}

export { DialogTitleGroup };
