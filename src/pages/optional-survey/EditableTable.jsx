import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  FormControl,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
  useTheme
} from '@mui/material';
import MainCard from 'components/MainCard';
import { CSVExport, CellEditable, SelectColumnSorting, TablePagination } from 'components/third-party/react-table';
import ScrollX from 'components/ScrollX';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { db } from 'config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import usePagination from 'hooks/usePagination';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PopupTransition } from 'components/@extended/Transitions';
import FilterModal from './components/FilterModal';
// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTable = ({ data }) => {
  const theme = useTheme();

  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedAccommodation, setSelectedAccommodation] = useState();
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const [sorting, setSorting] = useState([
    {
      id: 'date',
      desc: true
    }
  ]);

  const empCollectionRef = collection(db, 'optional_survey_data');

  useEffect(() => {
    const getEmpList = async () => {
      try {
        const data = await getDocs(empCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));

        let searchedData = filteredData;

        // Apply search filtering if searchValue is present
        if (searchValue) {
          searchedData = filteredData.filter(
            (item) =>
              item.placeOfOrigin.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.province.toLowerCase().includes(searchValue.toLowerCase())
          );
        }

        // Apply gender filtering only if selectedGender is present
        if (selectedGender) {
          searchedData = searchedData.filter((item) => item.gender === selectedGender);
        }

        if (selectedAccommodation) {
          searchedData = searchedData.filter((item) => item.accommodation === selectedAccommodation);
        }

        if (selectedCountry) {
          searchedData = searchedData.filter((item) => item.placeOfOrigin === selectedCountry);
        }

        if (selectedProvince) {
          searchedData = searchedData.filter((item) => item.province === selectedProvince);
        }

        setEmpList(searchedData);
      } catch (err) {
        console.log(err);
      }
    };

    getEmpList();
  }, [searchValue, selectedGender, selectedCountry, selectedProvince,selectedAccommodation]); // Add both searchValue and selectedGender as dependencies

  const PER_PAGE = 10;
  console.log('empList.length', empList.length);
  const count = Math.ceil(empList.length / PER_PAGE);
  let _DATA = usePagination(empList, PER_PAGE);

  const handleChange = (event, value) => {
    setPage(value);
  };
  
  const table = useReactTable({
    // data: _DATA.currentData(),
    // data: empList,
    data: useMemo(() => {
      const begin = (page - 1) * rowsPerPage;
      const end = begin + rowsPerPage;
      return empList.slice(begin, end);
    }, [empList, page, rowsPerPage]),
    columns: useMemo(
      () => [
        {
          header: 'Accommodation',
          accessorKey: 'accommodation',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Service of restauration',
          accessorKey: 'service',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Signaling',
          accessorKey: 'signaling',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Access',
          accessorKey: 'access',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Quality/price ratio of the destination',
          accessorKey: 'qualityPriceRatio',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Cleaning and conservation of the environment',
          accessorKey: 'cleaningConservation',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
      ],
      []
    ),
    state: {
      sorting
    },
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
    onSortingChange: setSorting,
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

  const handleModalClose = () => {
    setOpenFilterModal(false);
  };

  const ResetTable = () => {
    setSelectedGender('');
    setSearchValue('');
    setSelectedCountry('');
    setSelectedProvince('');
  };

  return (
    <MainCard
      content={false}
      title="Optional Survey Table"
      secondary={
        <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
          {/* <TextField
            fullWidth
            sx={{
              borderRadius: '4px',
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.customShadows.primary,
              border: `1px solid ${theme.palette.primary.main}`
            }}
            InputProps={{
              startAdornment: <SearchOutlined />,
              placeholder: 'Search Country/ Province',
              type: 'search'
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          /> */}

          {/* <SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} /> */}

          {/* <Button
            size="small"
            sx={{ minWidth: '130px', minHeight: '41.13px' }}
            startIcon={<PlusOutlined />}
            color="primary"
            variant="contained"
            onClick={() => setOpenFilterModal(true)}
          >
            Filter Options
          </Button> */}

          {/* <Button
            size="small"
            sx={{ minWidth: '130px', minHeight: '41.13px' }}
            color="error"
            variant="contained"
            onClick={() => ResetTable()}
          >
            Reset Filter
          </Button> */}

          <CSVExport data={table.getRowModel().flatRows.map((row) => row.original)} headers={headers} filename="editable-cell.csv" />
        </Stack>
      }
    >
      <Box sx={{ overflowX: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
        <Table>
          <TableHead
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: '100',
              // backgroundColor: theme.palette.background.default
              backgroundColor:'#eeedfc'
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
                <Pagination count={count} variant="outlined" color="primary" size="medium" page={page} onChange={handleChange} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Dialog TransitionComponent={PopupTransition} onClose={handleModalClose} open={openFilterModal} scroll="body">
        <FilterModal
          onClose={handleModalClose}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}

          selectedAccommodation={selectedAccommodation}
          setSelectedAccommodation = {setSelectedAccommodation}
        />
      </Dialog>
    </MainCard>
  );
};

EditableTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default EditableTable;