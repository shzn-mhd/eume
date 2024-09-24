import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// material-ui
import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import { DndProvider } from 'react-dnd';
import { isMobile } from 'react-device-detect';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

// project-import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, DraggableColumnHeader } from 'components/third-party/react-table';

import makeData from 'data/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ defaultColumns, data }) {
  const [columns] = useState(() => [...defaultColumns]);

  const [columnOrder, setColumnOrder] = useState(
    columns.map((column) => column.id) // must start out with populated columnOrder so we can splice
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true
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
      title="Column Drag & Drop (Ordering)"
      content={false}
      secondary={<CSVExport {...{ data, headers, filename: 'column-dragable.csv' }} />}
    >
      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <DraggableColumnHeader key={header.id} header={header} table={table}>
                      <>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</>
                    </DraggableColumnHeader>
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
}

ReactTable.propTypes = {
  defaultColumns: PropTypes.array,
  data: PropTypes.array
};

// ==============================|| COLUMN - DRAG & DROP ||============================== //

const ColumnDragDrop = () => {
  const data = useMemo(() => makeData(10), []);

  const defaultColumns = [
    {
      id: 'fullName',
      header: 'Name',
      footer: 'Name',
      accessorKey: 'fullName'
    },
    {
      id: 'email',
      header: 'Email',
      footer: 'Email',
      accessorKey: 'email'
    },
    {
      id: 'age',
      header: 'Age',
      footer: 'Age',
      accessorKey: 'age',
      meta: {
        className: 'cell-right'
      }
    },
    {
      id: 'role',
      header: 'Role',
      footer: 'Role',
      accessorKey: 'role'
    },
    {
      id: 'visits',
      header: 'Visits',
      footer: 'Visits',
      accessorKey: 'visits',
      meta: {
        className: 'cell-right'
      }
    },
    {
      id: 'status',
      header: 'Status',
      footer: 'Status',
      accessorKey: 'status',
      cell: (props) => {
        switch (props.getValue()) {
          case 'Complicated':
            return <Chip color="error" label="Complicated" size="small" />;
          case 'Relationship':
            return <Chip color="success" label="Relationship" size="small" />;
          case 'Single':
          default:
            return <Chip color="info" label="Single" size="small" />;
        }
      }
    },
    {
      id: 'progress',
      header: 'Profile Progress',
      footer: 'Profile Progress',
      accessorKey: 'progress',
      cell: (props) => <LinearWithLabel value={props.getValue()} sx={{ minWidth: 75 }} />
    }
  ];

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <ReactTable {...{ defaultColumns, data }} />
    </DndProvider>
  );
};

ColumnDragDrop.propTypes = {
  getValue: PropTypes.func
};

export default ColumnDragDrop;
