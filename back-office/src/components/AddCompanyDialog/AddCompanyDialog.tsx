import { Dialog, DialogContent, Stack } from '@mui/material';
import { DialogTitleGroup } from '../DialogTitleGroup';
import CompanyIcon from '@assets/company-icon.svg?react';

function AddCompanyDialog(props: { onClose: () => void }) {
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
      <DialogTitleGroup title="Company" icon={<CompanyIcon />} onClose={onClose} />
      <DialogContent>
        <Stack css={{ width: '720px' }}>fda</Stack>
      </DialogContent>
    </Dialog>
  );
}

export { AddCompanyDialog };
