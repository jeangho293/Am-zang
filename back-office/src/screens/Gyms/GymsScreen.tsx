import { useQuery } from '@libs/react-query';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { gymRepository } from '@repositories';
import { useState } from 'react';
import { Pagination } from '@components';

export function GymsScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  // TODO: 페이지네이션 만들어놓자
  const [page, setPage] = useState(1);

  // 4. query hooks
  const { data: gyms, loading } = useQuery(gymRepository.list, { variables: { page, limit: 2 } });

  // 5. form hooks
  // 6. calculate values
  const gymItems = gyms?.items ?? [];
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'name', width: 160 },
    { field: 'phoneNumber', headerName: 'phone number', width: 160 },
  ];
  // 7. effect hooks
  // 8. handlers
  return (
    <div>
      <DataGrid rows={gymItems} columns={columns} loading={loading} hideFooter={true} />
      <Pagination page={page} limit={2} totalCount={gyms?.count} onChange={setPage} />
    </div>
  );
}
