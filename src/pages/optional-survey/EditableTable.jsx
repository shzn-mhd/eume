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
import Filter from './components/Filter';
// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTable = ({ data }) => {
  const theme = useTheme();

  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [selectedAcc, setSelectedAcc] = useState('');
  const [selectService, setSelectService] = useState('');
  const [selectedSignaling, setSelectedSignaling] = useState('');
  const [selectedAaccess, setSelectedAccess] = useState('');
  const [selectedQualityPriceRatio,setSelectedQualityPriceRatio] = useState('');
  const [selectedCleaningConservation, setSelectedCleaningConservation] = useState('');

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openStoryDrawer, setOpenStoryDrawer] = useState(false);

  const handleStoryDrawerOpen = () => {
    setOpenStoryDrawer((prevState) => !prevState);
  };

  const [sorting, setSorting] = useState([
    {
      id: 'date',
      desc: true
    }
  ]);

  const [sortValue, setSortValue] = useState('');

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

        if (selectedAcc) {
          // Filter out items with no accommodation value
          const filteredDataWithAccommodation = searchedData.filter((item) => item.accommodation);
          searchedData = filteredDataWithAccommodation.filter((item) => item.accommodation === selectedAcc);
        }

        if (selectService) {
          const filteredDataWithAccommodation = searchedData.filter((item) => item.service);
          searchedData = filteredDataWithAccommodation.filter((item) => item.service === selectService);
        }

        if (selectedSignaling) {
          const filteredDataWithAccommodation = searchedData.filter((item) => item.signaling);
          searchedData = filteredDataWithAccommodation.filter((item) => item.signaling === selectedSignaling);
        }

        if (selectedAaccess) {
          const filteredDataWithAccommodation = searchedData.filter((item) => item.access);
          searchedData = filteredDataWithAccommodation.filter((item) => item.access === selectedAaccess);
        }

        if (selectedQualityPriceRatio) {
          const filteredDataWithAccommodation = searchedData.filter((item) => item.qualityPriceRatio);
          searchedData = filteredDataWithAccommodation.filter((item) => item.qualityPriceRatio === selectedQualityPriceRatio);
        }

        if (selectedCleaningConservation) {
          const filteredDataWithAccommodation = searchedData.filter((item) => item.cleaningConservation);
          searchedData = filteredDataWithAccommodation.filter((item) => item.cleaningConservation === selectedCleaningConservation);
        }

        setEmpList(searchedData);
      } catch (err) {
        console.log(err);
      }
    };

    getEmpList();
  }, [selectedAcc, selectService, selectedSignaling, selectedAaccess, selectedQualityPriceRatio, selectedCleaningConservation]); // Add both searchValue and selectedGender as dependencies

  const PER_PAGE = 10;
  console.log('empList.length', empList.length);
  const count = Math.ceil(empList.length / PER_PAGE);
  let _DATA = usePagination(empList, PER_PAGE);

  const handleChange = (event, value) => {
    setPage(value);
  };
  
  const handleSortingChange = (columnId) => {
    setSorting((oldSorting) => {
      // If the column was already being sorted by, toggle the direction
      if (oldSorting.length > 0 && oldSorting[0].id === columnId) {
        return [{ id: columnId, desc: !oldSorting[0].desc }];
      }
      // Otherwise, sort by the new column in ascending order
      return [{ id: columnId, desc: false }];
    });

    // Sort the empList data based on the columnId and sort direction
    setEmpList((prevEmpList) =>
      prevEmpList.slice().sort((a, b) => {
        const sortValueA = a[columnId];
        const sortValueB = b[columnId];

        if (sortValueA < sortValueB) {
          return sorting[0].desc ? 1 : -1;
        }
        if (sortValueA > sortValueB) {
          return sorting[0].desc ? -1 : 1;
        }
        return 0;
      })
    );
  };

  useEffect(() => {
    console.log('sorting id', sortValue);

    handleSortingChange(sortValue);
  }, [sortValue]);

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
    setSelectedAcc('');
    setSelectService('');
    setSelectedSignaling('');
    setSelectedAccess('');
    setSelectedQualityPriceRatio('');
    setSelectedCleaningConservation('');
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

<SelectColumnSorting {...{ setSortValue, getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />

          <Button
            size="small"
            sx={{ minWidth: '130px', minHeight: '41.13px' }}
            startIcon={<PlusOutlined />}
            color="primary"
            variant="contained"
            onClick={() => setOpenStoryDrawer((prevState) => !prevState)}
          >
            Filter Options
          </Button>

          <Button
            size="small"
            sx={{ minWidth: '130px', minHeight: '41.13px' }}
            color="error"
            variant="contained"
            onClick={() => ResetTable()}
          >
            Reset Filter
          </Button>

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

            <TableRow sx={{ position: 'sticky',bottom: 0, zIndex: '100', backgroundColor: 'white'}}>
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
          selectedAcc={selectedAcc}
          setSelectedAcc={setSelectedAcc}
        />
      </Dialog>
      <Filter
      empList={empList}
      open={openStoryDrawer}
      ResetTable={ResetTable}
        handleDrawerOpen={handleStoryDrawerOpen}
        selectedAcc={selectedAcc}
        setSelectedAcc={setSelectedAcc}
        selectService={selectService}
        setSelectService={setSelectService}
        selectedSignaling={selectedSignaling}
        setSelectedSignaling={setSelectedSignaling}
        selectedAaccess={selectedAaccess}
        setSelectedAccess={setSelectedAccess}
        selectedQualityPriceRatio={selectedQualityPriceRatio}
        setSelectedQualityPriceRatio={setSelectedQualityPriceRatio}
        selectedCleaningConservation={selectedCleaningConservation}
        setSelectedCleaningConservation={setSelectedCleaningConservation}
      />
    </MainCard>
  );
};

EditableTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default EditableTable;
