import { useQuery } from '@libs/react-query';
import { usersRepository } from '@repositories';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import type { UserModel } from '@models';

export function UsersScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // 4. query hooks
  const { data, loading } = useQuery(usersRepository.list);

  // 5. form hooks
  // 6. calculate values
  const userItem = data?.items || [];
  const columns = useMemo((): GridColDef<UserModel>[] => {
    return [
      { field: 'email', headerName: 'email' },
      { field: 'roleType', headerName: 'role' },
    ];
  }, []);

  // 7. effect hooks
  // 8. handlers
  return (
    <div>
      <DataGrid
        rows={userItem}
        columns={columns}
        loading={loading}
        rowHeight={36}
        hideFooter={true}
      />
    </div>
  );
}
