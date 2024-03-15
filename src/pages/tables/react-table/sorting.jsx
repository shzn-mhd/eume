import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// material-ui
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Stack,
  Box,
  useMediaQuery
} from '@mui/material';

// third-party
import { getCoreRowModel, getSortedRowModel, flexRender, useReactTable } from '@tanstack/react-table';

// project import
import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, HeaderSort, SelectColumnSorting } from 'components/third-party/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [sorting, setSorting] = useState([
    {
      id: 'age',
      desc: false
    }
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  let headers = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <MainCard
      title={matchDownSM ? 'Sorting' : 'Sorting Table'}
      content={false}
      secondary={
        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
          <SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />
          <CSVExport {...{ data: table.getSortedRowModel().rows.map((d) => d.original), headers, filename: 'sorting.csv' }} />
        </Stack>
      }
    >
      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                      Object.assign(header.column.columnDef.meta, {
                        className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                      });
                    }

                    return (
                      <TableCell
                        key={header.id}
                        {...header.column.columnDef.meta}
                        onClick={header.column.getToggleSortingHandler()}
                        {...(header.column.getCanSort() &&
                          header.column.columnDef.meta === undefined && {
                            className: 'cursor-pointer prevent-select'
                          })}
                      >
                        {header.isPlaceholder ? null : (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                            {header.column.getCanSort() && <HeaderSort column={header.column} />}
                          </Stack>
                        )}
                      </TableCell>
                    );
                  })}
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
            <TableFooter>
              {table.getFooterGroups().map((footerGroup) => (
                <TableRow key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => (
                    <TableCell key={footer.id} {...footer.column.columnDef.meta}>
                      {footer.isPlaceholder ? null : flexRender(footer.column.columnDef.header, footer.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableFooter>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func
};

// ==============================|| REACT TABLE - SORTING ||============================== //

const SortingTable = () => {
  const data = makeData(10);

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        footer: 'Name',
        accessorKey: 'fullName',
        enableSorting: false
      },
      {
        header: 'Email',
        footer: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Age',
        footer: 'Age',
        accessorKey: 'age',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Role',
        footer: 'Role',
        accessorKey: 'role'
      },
      {
        header: 'Visits',
        footer: 'Visits',
        accessorKey: 'visits',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Status',
        footer: 'Status',
        accessorKey: 'status',
        cell: (props) => {
          switch (props.getValue()) {
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
        footer: 'Profile Progress',
        accessorKey: 'progress',
        cell: (props) => <LinearWithLabel value={props.getValue()} sx={{ minWidth: 75 }} />
      }
    ],
    []
  );

  return <ReactTable {...{ data, columns }} />;
};

SortingTable.propTypes = {
  getValue: PropTypes.func
};

export default SortingTable;
