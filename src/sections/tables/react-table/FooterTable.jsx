import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Chip, Paper, Table, TableBody, TableContainer, TableCell, TableFooter, TableHead, TableRow } from '@mui/material';

// third-party
import { flexRender, useReactTable, getCoreRowModel } from '@tanstack/react-table';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import { CSVExport } from 'components/third-party/react-table';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

import makeData from 'data/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
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
    <MainCard title="Footer" content={false} secondary={<CSVExport {...{ data, headers, filename: 'footer.csv' }} />}>
      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
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
  data: PropTypes.array
};

// ==============================|| REACT TABLE - FOOTER ||============================== //

const FooterTable = () => {
  const data = makeData(10);

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        footer: 'Name',
        accessorKey: 'fullName'
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
        className: 'cell-right'
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
        className: 'cell-right'
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

FooterTable.propTypes = {
  data: PropTypes.array,
  getValue: PropTypes.func
};

export default FooterTable;
