import { useQuery } from '@libs';
import { companyRepository } from '@repositories';
import { useMemo, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Stack, Button } from '@mui/material';
import { AddCompanyDialog, DialogButton, ListViewHeader } from '@components';

function CompanyScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [search, setSearch] = useState<string>();

  // 4. query hooks
  const { data: companies } = useQuery(companyRepository.list, {
    variables: {
      name: search || undefined,
    },
  });

  // 5. form hooks
  // 6. calculate values
  const rows = companies || [];
  const columns = useMemo<GridColDef<(typeof rows)[number]>[]>(() => {
    return [{ field: 'name' }];
  }, []);

  // 7. effect hooks
  // 8. handlers
  return (
    <Stack>
      <ListViewHeader
        title="Company"
        searchProps={{
          placeholder: 'Name',
          onChange: (value: string) => setSearch(value),
        }}
        buttonProps={{
          addButton: (
            <DialogButton render={({ onOpen }) => <Button onClick={onOpen}>hi</Button>}>
              {({ onClose }) => <AddCompanyDialog onClose={onClose} />}
            </DialogButton>
          ),
        }}
      />
      <DataGrid rows={rows} columns={columns} />
    </Stack>
  );
}

export { CompanyScreen };
