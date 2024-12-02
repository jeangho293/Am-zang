import { InputAdornment, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@assets/search-icon.svg?react';

function ListViewHeader(props: {
  title: string;
  searchProps?: { placeholder?: string; onChange: (value: string) => void };
}) {
  // 1. destructure props
  const { title, searchProps } = props;

  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  // 7. effect hooks
  // 8. handlers
  return (
    <Stack direction="column" spacing={2}>
      <Typography css={{ fontSize: '24px', fontWeight: 500 }}>{title}</Typography>
      <TextField
        placeholder={searchProps?.placeholder}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            searchProps?.onChange((event.target as HTMLInputElement).value);
          }
        }}
        css={{ width: '280px' }}
      />
    </Stack>
  );
}

export { ListViewHeader };
