import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { KakaoSearchMap } from '../KakaoSearchMap';
import { DialogTitleGroup } from '../DialogTitleGroup';

function SearchMapDialog(props: { onClose: () => void }) {
  // 1. destructure props
  const { onClose } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Dialog open>
      <DialogTitleGroup title="Map" onClose={onClose} />
      <DialogContent>
        <Stack spacing={4} css={{ width: '480px' }}>
          <KakaoSearchMap css={{ width: '100%', height: '240px' }} />
          <Stack spacing={4}>
            <TextField />
            <Divider orientation="horizontal" />
            <Typography>결과</Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button>확인</Button>
      </DialogActions>
    </Dialog>
  );
}

export { SearchMapDialog };
