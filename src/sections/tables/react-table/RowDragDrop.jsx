import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// material-ui
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import { DndProvider } from 'react-dnd';
import { isMobile } from 'react-device-detect';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

// project-imports
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { CSVExport, DraggableRow } from 'components/third-party/react-table';

import makeData from 'data/react-table';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ defaultColumns, defaultData }) {
  const [columns] = useState(() => [...defaultColumns]);
  const [data, setData] = useState([...defaultData]);

  const reorderRow = (draggedRowIndex, targetRowIndex) => {
    data.splice(targetRowIndex, 0, data.splice(draggedRowIndex, 1)[0]);
    setData([...data]);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(), // good to have guaranteed unique row ids/keys for rendering
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
      title="Row Drag & Drop (Ordering)"
      content={false}
      secondary={
        <CSVExport {...{ data: table.getRowModel().flatRows.map((row) => row.original), headers, filename: 'row-dragable.csv' }} />
      }
    >
      <ScrollX>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                  <TableCell />
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
                <DraggableRow key={row.id} row={row} reorderRow={reorderRow}>
                  <>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </>
                </DraggableRow>
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
  defaultData: PropTypes.array
};

// ==============================|| ROW - DRAG & DROP ||============================== //

const RowDragDrop = () => {
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
      id: 'progress',
      header: 'Profile Progress',
      footer: 'Profile Progress',
      accessorKey: 'progress',
      cell: (props) => <LinearWithLabel value={props.getValue()} sx={{ minWidth: 75 }} />
    }
  ];

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <ReactTable {...{ defaultColumns, defaultData: data }} />
    </DndProvider>
  );
};

RowDragDrop.propTypes = {
  data: PropTypes.array,
  getValue: PropTypes.func
};

export default RowDragDrop;
