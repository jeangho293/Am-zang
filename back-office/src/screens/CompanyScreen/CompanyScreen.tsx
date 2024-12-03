import { useQuery } from '@libs';
import { companyRepository } from '@repositories';
import { useMemo, useState } from 'react';
import { DataGrid, GridColDef, GridRow } from '@mui/x-data-grid';
import { Stack, Button } from '@mui/material';
import { AddCompanyDialog, DialogButton, ListViewHeader } from '@components';

function CompanyScreen() {
  // 1. destructure props
  // 2. lib hooks
  // 3. state hooks
  const [search, setSearch] = useState<string>();
  const [expanded, setExpanded] = useState<number | null>(null);

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
    return [
      { field: 'name', headerName: 'Name' },
      { field: 'email', headerName: 'Email' },
      { field: 'address', headerName: 'Address' },
      { field: 'phoneNumber', headerName: 'Phone Number' },
      { field: 'createdAt', headerName: 'Created on', flex: 1 },
    ];
  }, []);

  // 7. effect hooks
  // 8. handlers
  const handleRowClick = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

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
      <DataGrid
        rows={rows}
        columns={columns}
        onRowClick={(row) => handleRowClick(row.id as number)}
        slots={{
          row: (props) => {
            const isExpanded = props.rowId === expanded;
            return (
              <>
                <GridRow
                  {...props}
                  visibleColumns={[props.visibleColumns[0]]}
                  isFirstVisible={true}
                  css={{
                    ':hover': {
                      cursor: 'pointer',
                    },
                  }}
                />
                {isExpanded && (
                  <Stack direction="row">
                    {props.visibleColumns.map((column, index) => {
                      console.log(column);
                      return (
                        <Stack
                          key={column.field}
                          css={{
                            width: column.width,
                            height: props.rowHeight,
                            justifyContent: 'center',
                            flex: column.flex,
                          }}
                        >
                          <span
                            css={{
                              padding: '0 10px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {index !== 0 ? props.row[column.field] : ''}
                          </span>
                        </Stack>
                      );
                    })}
                  </Stack>
                )}
              </>
            );
          },
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
        }}
      />
    </Stack>
  );
}

export { CompanyScreen };
