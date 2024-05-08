import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Box, Table, TableBody, TableContainer, TableHead, useTheme } from '@mui/material';
import MainCard from 'components/MainCard';
import { CSVExport, CellEditable, TablePagination } from 'components/third-party/react-table';
import ScrollX from 'components/ScrollX';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { db } from 'config/firebase';
import { getDocs, collection } from 'firebase/firestore';
// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTable = ({ data }) => {
  const theme = useTheme();
  const [tableData, setTableData] = useState(data);

  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [numOfPages, setNumOfPages] = useState(10);

  const empCollectionRef = collection(db, 'survey_data');

  useEffect(() => {
    const getEmpList = async () => {
      try {
        const data = await getDocs(empCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        console.log(filteredData);
        // setEmpList(filteredData.reverse());
        setEmpList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getEmpList();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const table = useReactTable({
    data: empList,
    columns: useMemo(
      () => [
        {
          header: 'Date',
          accessorKey: 'date',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Accommodation Type',
          accessorKey: 'accommodationType',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Activity',
          accessorKey: 'activity',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Feedback',
          accessorKey: 'feedback',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Gender',
          accessorKey: 'gender',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Language',
          accessorKey: 'language',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Motivation',
          accessorKey: 'motivation',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Number of Days',
          accessorKey: 'numOfDays',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Number of People',
          accessorKey: 'numOfPeople',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Origin',
          accessorKey: 'placeOfOrigin',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Rating',
          accessorKey: 'rating',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Reason',
          accessorKey: 'reason',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Stay',
          accessorKey: 'stayOvernight',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Place',
          accessorKey: 'stayPlace',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Pet',
          accessorKey: 'withPet',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        }
        // {
        //   header: 'Age',
        //   accessorKey: 'age',
        //   dataType: 'text',
        //   meta: {
        //     className: 'cell-right',
        //   },
        // },
        // {
        //   header: 'Visits',
        //   accessorKey: 'visits',
        //   dataType: 'text',
        //   meta: {
        //     className: 'cell-right',
        //   },
        // },
        // {
        //   header: 'Profile Progress',
        //   accessorKey: 'progress',
        //   dataType: 'progress',
        // },
      ],
      []
    ),
    defaultColumn: {
      cell: CellEditable
    },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setEmpList((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value
              };
            }
            return row;
          })
        );
      }
    },
    debugTable: true
  });

  let headers = [];
  table.getAllColumns().forEach((columns) => {
    if (columns.columnDef.accessorKey) {
      headers.push({
        label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
        key: columns.columnDef.accessorKey
      });
    }
  });

  return (
    <MainCard
      content={false}
      title="Survey Table"
      secondary={
        <CSVExport data={table.getRowModel().flatRows.map((row) => row.original)} headers={headers} filename="editable-cell.csv" />
      }
    >
      <Box sx={{ overflowX: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
        {/* <ScrollX> */}
        {/* <TableContainer> */}
        <Table>
          <TableHead
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: '100',
              backgroundColor: theme.palette.background.paper
            }}
          >
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
          <TableBody sx={{ overflowY: 'auto', zIndex: '-100' }}>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={11}>
                {/* <TablePagination
                  serverSidePagination={true}
                  total={total}
                  gotoPage={gotoPage}
                  rows={rows}
                  setPageSize={(size) => {
                    setPageSize(size);
                    setNumOfPages(size);
                  }}
                  pageSize={pageSize}
                  pageIndex={pageIndex}
                /> */}
                {/* <TablePagination
                serverSidePagination={true}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                total={empList.length}
                rows={rowsPerPage}
                gotoPage={page}
                setPageSize={(size) => {
                  setPageSize(size);
                  setNumOfPages(size);
                }}
  // onPageChange={handleChangePage}
  // onRowsPerPageChange={handleChangeRowsPerPage}
/> */}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* </TableContainer> */}
        {/* </ScrollX> */}
      </Box>
    </MainCard>
  );
};

EditableTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default EditableTable;
