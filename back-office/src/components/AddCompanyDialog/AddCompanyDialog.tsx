import {
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Button,
  InputLabel,
} from '@mui/material';
import CompanyIcon from '@assets/company-icon.svg?react';
import { Controller, useForm } from 'react-hook-form';
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
  const { register, handleSubmit, setValue, getValues, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      address: {
        address1: '',
        address2: '',
        lat: 0,
        lng: 0,
      },
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
          <Stack>
            <InputLabel>법인 이름</InputLabel>
            <TextField {...register('name')} />
          </Stack>
          <Stack spacing={4} direction="row">
            <Stack css={{ width: '100%' }}>
              <InputLabel>주소</InputLabel>
              <Stack direction="row" css={{ justifyContent: 'space-between' }}>
                <Controller
                  control={control}
                  name="address"
                  render={() => (
                    <TextField
                      disabled
                      value={`${getValues('address.address1')} ${getValues('address.address2')}`}
                      css={{ width: '240px' }}
                    />
                  )}
                />
                <DialogButton
                  render={({ onOpen }) => (
                    <Button onClick={onOpen} css={{ height: '32px' }}>
                      주소 찾기
                    </Button>
                  )}
                >
                  {({ onClose }) => (
                    <SearchMapDialog
                      onClose={onClose}
                      setValue={(address) => {
                        setValue('address', address);
                      }}
                    />
                  )}
                </DialogButton>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <InputLabel>대표 이메일</InputLabel>
            <TextField {...register('email')} />
          </Stack>
          <Stack>
            <InputLabel>대표 전화</InputLabel>
            <TextField {...register('phoneNumber')} />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit(async ({ name, address, email, phoneNumber }) => {
            console.log(address);
            // await add({
            //   variables: {
            //     name,
            //     email,
            //     address,
            //     phoneNumber,
            //   },
            // });
          })}
        >
          제출
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { AddCompanyDialog };
