import { useQuery } from '@libs';
import { companyRepository } from '@repositories';
import { useMemo, useState, Fragment } from 'react';
import { DataGrid, GridColDef, GridRow } from '@mui/x-data-grid';
import { Stack, Button } from '@mui/material';
import { AddCompanyDialog, AddGymDialog, DialogButton, ListViewHeader } from '@components';
import { Gym } from '@models';

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
      {
        field: 'name',
        headerName: 'Name',
        width: 180,
        renderCell: ({ value, row }) => (
          <span>
            {value} ({row.gyms.length})
          </span>
        ),
      },
      { field: 'branchOffice', headerName: 'Spot', width: 120 },
      { field: 'address', headerName: 'Address', width: 240 },
      {
        field: 'createdOn',
        headerName: 'Created on',
        flex: 1,
      },
    ];
  }, []);

  // 7. effect hooks
  // 8. handlers
  const handleRowClick = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <Stack css={{ height: '100%' }}>
      <ListViewHeader
        title="Company"
        searchProps={{
          placeholder: 'Name',
          onChange: (value: string) => setSearch(value),
        }}
        buttonProps={{
          addButton: (
            <DialogButton render={({ onOpen }) => <Button onClick={onOpen}>ADD</Button>}>
              {({ onClose }) => <AddCompanyDialog onClose={onClose} />}
            </DialogButton>
          ),
        }}
      />
      <Stack css={{ height: '720px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={(row) => handleRowClick(row.id as number)}
          slots={{
            row: (props) => {
              const gyms = props.row.gyms as Gym[];
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
                  {isExpanded &&
                    (gyms.length ? (
                      gyms.map((gym, index) => {
                        return (
                          <Fragment key={index}>
                            <Stack direction="row">
                              {props.visibleColumns.map((column, index) => {
                                return (
                                  <Stack
                                    key={index}
                                    css={{
                                      width: column.width,
                                      height: props.rowHeight,
                                      justifyContent: 'center',
                                      flex: column.flex,
                                    }}
                                  >
                                    {
                                      <span
                                        css={{
                                          padding: '0 10px',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          textAlign: column.align,
                                        }}
                                      >
                                        {index !== 0 && gym[column.field as keyof Gym]}
                                      </span>
                                    }
                                  </Stack>
                                );
                              })}
                            </Stack>
                            {index === gyms.length - 1 && (
                              <Stack css={{ justifyContent: 'center' }}>
                                <DialogButton
                                  render={({ onOpen }) => (
                                    <Button
                                      onClick={onOpen}
                                      css={{
                                        height: '28px',
                                        width: '28px',
                                        margin: '16px',
                                      }}
                                    >
                                      +
                                    </Button>
                                  )}
                                >
                                  {({ onClose }) => (
                                    <AddGymDialog companyId={props.row.id} onClose={onClose} />
                                  )}
                                </DialogButton>
                              </Stack>
                            )}
                          </Fragment>
                        );
                      })
                    ) : (
                      <DialogButton
                        render={({ onOpen }) => (
                          <Button
                            onClick={onOpen}
                            css={{
                              height: '28px',
                              width: '28px',
                              margin: '16px',
                            }}
                          >
                            +
                          </Button>
                        )}
                      >
                        {({ onClose }) => (
                          <AddGymDialog companyId={props.row.id} onClose={onClose} />
                        )}
                      </DialogButton>
                    ))}
                </>
              );
            },
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'name', sort: 'desc' }],
            },
          }}
          css={{
            '& .MuiDataGrid-filler': {
              '--rowBorderColor': '#FFFFFF !important',
            },
          }}
          rowHeight={48}
        />
      </Stack>
    </Stack>
  );
}

export { CompanyScreen };
