import { format, useQuery } from '@libs';
import { userRepository } from '@repositories';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import { ListViewHeader } from '../../components';

function UserScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [search, setSearch] = useState<string>();

  // 4. query hooks
  const { data: users, loading } = useQuery(userRepository.list, {
    variables: {
      email: search || undefined,
    },
  });

  // 5. form hooks
  // 6. calculate values
  const rows = users || [];
  const columns = useMemo<GridColDef<(typeof rows)[number]>[]>(() => {
    return [
      {
        field: 'id',
        headerName: 'ID',
        width: 120,
      },
      {
        field: 'email',
        headerName: 'Email',
        width: 280,
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 100,
      },
      {
        field: 'type',
        headerName: 'Login Type',
        width: 120,
      },
      {
        field: 'createdAt',
        headerName: 'Created',
        width: 160,
        renderCell: ({ value }) => <span>{format(value, 'YYYY-MM-DD HH:mm')}</span>,
      },
    ];
  }, []);

  // 7. effect hooks
  // 8. handlers
  return (
    <Stack>
      <ListViewHeader
        title="User"
        searchProps={{
          placeholder: 'Email',
          onChange: (value: string) => setSearch(value),
        }}
      />
      <DataGrid loading={loading} disableRowSelectionOnClick rows={rows} columns={columns} />
    </Stack>
  );
}

export { UserScreen };
