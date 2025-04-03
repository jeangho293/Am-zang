import { useQuery } from '@libs/react-query';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { gymRepository } from '@repositories';
import { useMemo, useState } from 'react';
import { Pagination } from '@components';
import { Stack } from '@mui/material';
import type { GymModel } from '@models';

export function GymsScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [page, setPage] = useState(1);

  // 4. query hooks
  const { data: gyms, loading } = useQuery(gymRepository.list, { variables: { page, limit: 2 } });

  // 5. form hooks
  // 6. calculate values
  const gymItems = gyms?.items ?? [];
  const columns = useMemo((): GridColDef<GymModel>[] => {
    return [
      {
        field: 'name',
        headerName: 'name',
        minWidth: 160,
        flex: 1,
      },
      {
        field: 'phoneNumber',
        headerName: 'phone number',
        minWidth: 160,
        flex: 1,
      },
      {
        field: 'address',
        minWidth: 160,
        flex: 1,
        renderCell: ({ row }) => (
          <span>
            {row.address.address1} {row.address.address2}
          </span>
        ),
      },
    ];
  }, []);

  // 7. effect hooks
  // 8. handlers
  return (
    <Stack spacing={4} css={{ width: '100%', alignItems: 'center' }}>
      <Stack css={{ width: '100%' }}>
        <DataGrid rows={gymItems} columns={columns} loading={loading} hideFooter={true} />
      </Stack>
      <Pagination page={page} limit={2} totalCount={gyms?.count} onChange={setPage} />
    </Stack>
  );
}
