import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Box, Chip, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// project imports
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, IndeterminateCheckbox, RowSelection, TablePagination } from 'components/third-party/react-table';

import makeData from 'data/react-table';

const queryClient = new QueryClient();

async function fetchData(options) {
  // simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  const data = makeData(100);

  return {
    rows: data.slice(options.pageIndex * options.pageSize, (options.pageIndex + 1) * options.pageSize),
    pageCount: Math.ceil(data.length / options.pageSize)
  };
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable() {
  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      {
        header: 'Name',
        accessorKey: 'fullName'
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Age',
        accessorKey: 'age',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (cell) => {
          switch (cell.getValue()) {
            case 'Complicated':
              return <Chip color="error" label="Complicated" size="small" variant="light" />;
            case 'Relationship':
              return <Chip color="success" label="Relationship" size="small" variant="light" />;
            case 'Single':
            default:
              return <Chip color="info" label="Single" size="small" variant="light" />;
          }
        }
      },
      {
        header: 'Profile Progress',
        accessorKey: 'progress',
        cell: (cell) => <LinearWithLabel value={cell.getValue()} sx={{ minWidth: 75 }} />
      }
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const fetchDataOptions = { pageIndex, pageSize };

  const { data } = useQuery(['data', fetchDataOptions], () => fetchData(fetchDataOptions), { keepPreviousData: true });

  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: data?.rows ?? defaultData,
    columns,
    pageCount: data?.pageCount ?? -1,
    state: {
      pagination,
      rowSelection
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true
  });

  useEffect(() => setRowSelection({ 1: true, 5: true, 7: true }), []);

  let headers = [];
  columns.map(
    (columns) =>
      // @ts-ignore
      columns.accessorKey &&
      headers.push({
        label: typeof columns.header === 'string' ? columns.header : '#',
        // @ts-ignore
        key: columns.accessorKey
      })
  );

  return (
    <MainCard
      title="Row Selection (Pagination Control)"
      content={false}
      secondary={
        <CSVExport
          {...{
            data:
              table.getSelectedRowModel().flatRows.map((row) => row.original).length === 0
                ? table.getRowModel().rows.map((row) => row.original)
                : table.getSelectedRowModel().flatRows.map((row) => row.original),
            headers,
            filename: 'rsp-control.csv'
          }}
        />
      }
      codeHighlight
      codeString={JSON.stringify({ rowSelection: rowSelection }, null, 2)}
    >
      <ScrollX>
        <Stack>
          <RowSelection selected={Object.keys(rowSelection).length} />
          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} {...header.column.columnDef.meta}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <>
            <Divider />
            <Box sx={{ p: 2 }}>
              <TablePagination
                {...{
                  setPageSize: table.setPageSize,
                  setPageIndex: table.setPageIndex,
                  getState: table.getState,
                  getPageCount: table.getPageCount
                }}
              />
            </Box>
          </>
        </Stack>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| ROW SELECTION - PAGINATION CONTROL ||============================== //

const RSPControl = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactTable />
    </QueryClientProvider>
  );
};

export default RSPControl;
