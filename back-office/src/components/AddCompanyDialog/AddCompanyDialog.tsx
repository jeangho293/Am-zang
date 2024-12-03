import { Dialog, DialogActions, DialogContent, Stack, TextField, Button } from '@mui/material';
import { DialogTitleGroup } from '../DialogTitleGroup';
import CompanyIcon from '@assets/company-icon.svg?react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@libs';
import { companyRepository } from '../../repositories';

function AddCompanyDialog(props: { onClose: () => void }) {
  // 1. destructure props
  const { onClose } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  const [add] = useMutation(companyRepository.add);

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
        <Stack css={{ width: '620px' }}>
          <TextField {...register('name')} placeholder="name" />
          <TextField {...register('address')} placeholder="address" />
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
