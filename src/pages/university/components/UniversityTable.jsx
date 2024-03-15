import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery
} from '@mui/material';

// third-party
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

// project-import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';

import {
  CSVExport,
  DebouncedInput,
  HeaderSort,
  RowSelection,
  SelectColumnSorting,
  TablePagination
} from 'components/third-party/react-table';

import ExpandingUserDetail from 'sections/apps/customer/ExpandingUserDetail';


// assets
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'store';
import { dispatch } from 'store';
import { getUniversities } from 'store/reducers/university';


export const fuzzyFilter = (row, columnId, value, addMeta) => {
    // rank the item
    const itemRank = rankItem(row.getValue(columnId), value);
  
    // store the ranking info
    addMeta(itemRank);
  
    // return if the item should be filtered in/out
    return itemRank.passed;
  };
  
  // ==============================|| REACT TABLE - LIST ||============================== //
  
  function ReactTable({ columns, modalToggler, bulkModalToggler}) {
    const theme = useTheme();
    const {universities: {universities, total},action} =
                useSelector((state)=> state.university);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  
    const [sorting, setSorting] = useState([
      {
        id: 'id',
        desc: true
      }
    ]);
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [numOfPages, setNumOfPages] = useState(10);
    const [name, setName] = useState('');
    const table = useReactTable({
      data : universities,
      columns,
      state: {
        sorting,
        rowSelection,
        globalFilter,
        pageIndex,
        pageSize
      },
      manualPagination: true,
      pageCount: Math.ceil(total / numOfPages),
      autoResetPage: false,
      enableRowSelection: true,
      onSortingChange: setSorting,
      // setPageIndex,
      // setPageSize,
      onRowSelectionChange: setRowSelection,
      onGlobalFilterChange: setGlobalFilter,
      getRowCanExpand: () => true,
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      globalFilterFn: fuzzyFilter,
      debugTable: true
    });
  
    
    console.log("table", table);
    useEffect(() => {
      table.setPageSize(pageSize)
      table.setPageIndex(pageIndex)
      setNumOfPages(pageSize)
      dispatch(getUniversities(pageIndex,pageSize,name));
      // console.log(pageIndex,pageSize,'university event')
    },[action,pageIndex,pageSize,name]);

    const backColor = alpha(theme.palette.primary.lighter, 0.1);
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
      <MainCard content={false}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ padding: 2, ...(matchDownSM && { '& .MuiOutlinedInput-root, & .MuiFormControl-root': { width: '100%' } }) }}
        >
          <DebouncedInput
            value={name ?? ''}
            onFilterChange={(value) => setName(String(value))}
            placeholder={`Search ${total} records...`}
          />
  
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />
            <Stack direction="row" spacing={2} alignItems="center">
              <Button variant="contained" startIcon={<PlusOutlined />} onClick={modalToggler}>
                Add University
              </Button>
              <Button variant="contained" startIcon={<PlusOutlined />} onClick={bulkModalToggler}>
                Bulk Upload
              </Button>
              <CSVExport
                {...{
                  data:
                    table.getSelectedRowModel().flatRows.map((row) => row.original).length === 0
                      ? universities
                      : table.getSelectedRowModel().flatRows.map((row) => row.original),
                  headers,
                  filename: 'univesity-list.csv'
                }}
              />
            </Stack>
          </Stack>
        </Stack>
        <ScrollX>
          <Stack>
            <RowSelection selected={Object.keys(rowSelection).length} />
            <TableContainer>
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
                    <Fragment key={row._id}>
                      <TableRow>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.getIsExpanded() && (
                        <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
                          <TableCell colSpan={row.getVisibleCells().length}>
                            <ExpandingUserDetail data={row.original} />
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <>
              <Divider />
              <Box sx={{ p: 2 }}>
                <TablePagination
                  {...{
                    setPageSize: setPageSize,
                    pageIndex:pageIndex,
                    setPageIndex: setPageIndex,
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
  
  ReactTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    getHeaderProps: PropTypes.func,
    handleAdd: PropTypes.func,
    modalToggler: PropTypes.func,
    renderRowSubComponent: PropTypes.any
  };

export default ReactTable;  