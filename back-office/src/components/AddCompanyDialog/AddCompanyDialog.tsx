import { Dialog, DialogActions, DialogContent, Stack, TextField, Button } from '@mui/material';
import CompanyIcon from '@assets/company-icon.svg?react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@libs';
import { companyRepository } from '@repositories';
import { useSnackbar } from 'notistack';
import { DialogTitleGroup } from '../DialogTitleGroup';
import { DialogButton } from '../DialogButton';
import { SearchMapDialog } from '../SearchMapDialog';

function AddCompanyDialog(props: { onClose: () => void }) {
  // 1. destructure props
  const { onClose } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  const [add] = useMutation(companyRepository.add, {
    onSuccess: () => {
      enqueueSnackbar('Success!', { variant: 'success' });
      onClose();
    },
    onError: (err) => enqueueSnackbar(err.message, { variant: 'error' }),
  });

  // 5. form hooks
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      address: '',
      phoneNumber: '',
    },
  });

  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Dialog open>
      <DialogTitleGroup title="Company" icon={<CompanyIcon />} onClose={onClose} />
      <DialogContent>
        <Stack spacing={2} css={{ width: '360px' }}>
          <TextField {...register('name')} placeholder="name" />
          <Stack spacing={4} direction="row" css={{ justifyContent: 'space-between' }}>
            <TextField {...register('address')} placeholder="address" css={{ width: '240px' }} />
            <DialogButton
              render={({ onOpen }) => (
                <Button onClick={onOpen} css={{ height: '32px' }}>
                  주소 찾기
                </Button>
              )}
            >
              {({ onClose }) => <SearchMapDialog onClose={onClose} />}
            </DialogButton>
          </Stack>
          <TextField {...register('email')} placeholder="email" />
          <TextField {...register('phoneNumber')} placeholder="phoneNumber" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit(async ({ name, address, email, phoneNumber }) => {
            await add({
              variables: {
                name,
                email,
                address,
                phoneNumber,
              },
            });
          })}
        >
          제출
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { AddCompanyDialog };
