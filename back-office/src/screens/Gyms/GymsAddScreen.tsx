import { Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from '../../libs/react-query';
import { gymRepository } from '../../repositories';

export function GymsAddScreen() {
  // 1. destructure props
  // 2. lib hooks
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      phoneNumber: '',
      address1: '',
      address2: '',
    },
  });

  // 3. state hooks
  // 4. query hooks
  const [addGyms, { loading }] = useMutation(gymRepository.add);

  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Stack>
      <TextField {...register('name')} />
      <TextField {...register('phoneNumber')} />
      <TextField {...register('address1')} />
      <TextField {...register('address2')} />

      <Button
        onClick={handleSubmit(async ({ name, phoneNumber, address1, address2 }) => {
          await addGyms({ variables: { name, phoneNumber, address1, address2 } });
        })}
      >
        Submit
      </Button>
    </Stack>
  );
}
