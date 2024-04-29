import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Table, TableBody, TableContainer, TableHead } from '@mui/material';
import MainCard from 'components/MainCard';
import { CSVExport, CellEditable } from 'components/third-party/react-table';
import ScrollX from 'components/ScrollX';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTable = ({ data }) => {
  const [tableData, setTableData] = useState(data);

  const table = useReactTable({
    data: tableData,
    columns: useMemo(
      () => [
        {
          header: 'Name',
          accessorKey: 'fullName',
          dataType: 'text',
        },
        {
          header: 'Email',
          accessorKey: 'email',
          dataType: 'text',
        },
        {
          header: 'Age',
          accessorKey: 'age',
          dataType: 'text',
          meta: {
            className: 'cell-right',
          },
        },
        {
          header: 'Visits',
          accessorKey: 'visits',
          dataType: 'text',
          meta: {
            className: 'cell-right',
          },
        },
        {
          header: 'Profile Progress',
          accessorKey: 'progress',
          dataType: 'progress',
        },
      ],
      []
    ),
    defaultColumn: {
      cell: CellEditable,
    },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  let headers = [];
  table.getAllColumns().forEach((columns) => {
    if (columns.columnDef.accessorKey) {
      headers.push({
        label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
        key: columns.columnDef.accessorKey,
      });
    }
  });

  return (
    <MainCard
      content={false}
      title="EUME Table"
      secondary={<CSVExport data={table.getRowModel().flatRows.map((row) => row.original)} headers={headers} filename="editable-cell.csv" />}
    >
      <ScrollX>
        <TableContainer>
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
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
};

EditableTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default EditableTable;
