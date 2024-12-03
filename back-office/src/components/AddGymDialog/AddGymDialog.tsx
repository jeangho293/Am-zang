import { Button, Dialog, DialogActions, DialogContent, Stack, TextField } from '@mui/material';
import { DialogTitleGroup } from '../DialogTitleGroup';
import { useForm } from 'react-hook-form';
import { useMutation } from '@libs';
import { gymRepository } from '@repositories';
import { useSnackbar } from 'notistack';

function AddGymDialog(props: { companyId: number; onClose: () => void }) {
  // 1. destructure props
  const { companyId, onClose } = props;

  // 2. lib hooks
  const { enqueueSnackbar } = useSnackbar();

  // 3. state hooks
  // 4. query hooks
  console.log(companyId);
  const [add] = useMutation(gymRepository.add, {
    onSuccess: () => {
      enqueueSnackbar('Success!', { variant: 'success' });
      onClose();
    },
  });

  // 5. form hooks
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      branchOffice: '',
      address: '',
      createdOn: '2024-12-01',
    },
  });

  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Dialog open>
      <DialogTitleGroup title="Gym" onClose={onClose} />
      <DialogContent>
        <Stack css={{ width: '480px' }}>
          <TextField {...register('branchOffice')} />
          <TextField {...register('address')} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit(async ({ branchOffice, address, createdOn }) => {
            await add({ variables: { branchOffice, address, createdOn, companyId } });
          })}
        >
          submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { AddGymDialog };
