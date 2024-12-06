import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { KakaoSearchMap } from '@components';
import { useQuery } from '@libs';
import { companyRepository } from '@repositories';
import { Controller, useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useFileUpload } from '../../../libs/storage';

function GymAddScreen() {
  // 1. destructure props
  // 2. lib hooks
  const [upload] = useFileUpload();

  // 3. state hooks
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // 4. query hooks
  const { data: companies, loading } = useQuery(companyRepository.list);

  // 5. form hooks
  const { register, control, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    defaultValues: {
      companyId: '',
      branchImageId: 0,
      branchOffice: '',
      phoneNumber: '',
      managerId: '',
      createdOn: '',
      address: '',
      scale: '',
      difficulty: '',
      sns: '',
    },
  });

  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <Stack css={{ maxWidth: '720px', justifyContent: 'center', alignItems: 'center' }}>
      {/* 법인 선택 */}
      <Stack css={{ width: '100%' }}>
        <InputLabel shrink>법인</InputLabel>
        <Controller
          control={control}
          name="companyId"
          render={({ field: { value, onChange } }) => (
            <Select value={value} onChange={onChange}>
              <MenuItem value="">None</MenuItem>
              {!loading &&
                companies?.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.name}
                  </MenuItem>
                ))}
            </Select>
          )}
        />
      </Stack>

      <Stack
        spacing={18}
        direction="row"
        css={{ width: '100%', justifyContent: 'space-between', marginTop: '24px' }}
      >
        {/* TODO: 해당 지점의 상표 이미지 */}
        <Stack>
          <Box
            onClick={handleFileSelect}
            css={{
              'width': '180px',
              'height': '180px',
              'border': '1px solid #000000',
              ':hover': {
                cursor: 'pointer',
              },
            }}
          >
            {preview ? (
              <img src={preview} css={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Stack css={{ height: '100%', justifyContent: 'center' }}>
                <Typography css={{ fontSize: '48px', textAlign: 'center', color: 'grey' }}>
                  +
                </Typography>
              </Stack>
            )}
          </Box>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file && file.type.startsWith('image')) {
                setPreview(URL.createObjectURL(file));
                const { id } = await upload(file);
                setValue('branchImageId', id);
              }
            }}
            css={{ display: 'none' }}
          />
        </Stack>

        <Stack spacing={4}>
          <div>
            <InputLabel>지점 이름</InputLabel>
            <TextField {...register('branchOffice')} />
          </div>

          <div>
            <InputLabel>지점 전화번호</InputLabel>
            <TextField {...register('phoneNumber')} />
          </div>
          <div>
            <InputLabel>매니저</InputLabel>
            <TextField {...register('managerId')} />
          </div>
        </Stack>
      </Stack>

      <Stack css={{ width: '100%', marginTop: '48px' }}>
        <div>
          <InputLabel>개설 날짜</InputLabel>
          <TextField {...register('createdOn')} />
        </div>
        <div>
          <InputLabel>주소</InputLabel>
          <TextField {...register('address')} />
        </div>
        <div>
          <InputLabel>규모</InputLabel>
          <TextField {...register('scale')} />
        </div>
        <div>
          <InputLabel>난이도 종류</InputLabel>
          <TextField {...register('difficulty')} />
        </div>
        <div>
          <InputLabel>SNS</InputLabel>
          <TextField {...register('sns')} />
        </div>
      </Stack>
      <KakaoSearchMap css={{ width: '200px', height: '200px' }} />
      <Button
        onClick={handleSubmit((a) => {
          console.log(a);
        })}
      >
        button
      </Button>
    </Stack>
  );
}

export { GymAddScreen };
