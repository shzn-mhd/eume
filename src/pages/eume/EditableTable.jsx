import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
  Autocomplete,
  Box,
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
import { CSVExport, CellEditable, TablePagination } from 'components/third-party/react-table';
import ScrollX from 'components/ScrollX';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { db } from 'config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import usePagination from 'hooks/usePagination';
import { SearchOutlined } from '@ant-design/icons';
// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTable = ({ data }) => {
  const theme = useTheme();
  const [tableData, setTableData] = useState(data);

  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const gender = ['Muller', 'Viro'];

  const empCollectionRef = collection(db, 'survey_data');

  useEffect(() => {
    const getEmpList = async () => {
      try {
        const data = await getDocs(empCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        console.log('fff', filteredData);
        // setEmpList(filteredData.reverse());
        setEmpList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getEmpList();
  }, []);

  const PER_PAGE = 10;
  console.log('empList.length', empList.length);
  const count = Math.ceil(empList.length / PER_PAGE);
  let _DATA = usePagination(empList, PER_PAGE);

  console.log('empList', empList);
  console.log('_Data', _DATA);

  const handleChangePage = (e, p) => {
    console.log('p', p);
    console.log('e', e);
    setPage(p);
    _DATA.jump(p);
  };

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
          header: 'Date',
          accessorKey: 'date',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Country',
          accessorKey: 'placeOfOrigin',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: 'Province',
          accessorKey: 'province',
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
          header: 'Age',
          accessorKey: 'age',
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
          header: 'Modality',
          accessorKey: 'modality',
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
          header: 'Number of Days',
          accessorKey: 'noOfDays',
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
          header: 'Transport',
          accessorKey: 'transportation',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        }
        // {
        //   header: 'Activity',
        //   accessorKey: 'activity',
        //   dataType: 'text',
        //   meta: {
        //     className: 'cell-center'
        //   }
        // },
        // {
        //   header: 'Feedback',
        //   accessorKey: 'feedback',
        //   dataType: 'text',
        //   meta: {
        //     className: 'cell-center'
        //   }
        // },
        // {
        //   header: 'Language',
        //   accessorKey: 'language',
        //   dataType: 'text',
        //   meta: {
        //     className: 'cell-center'
        //   }
        // },
        // {
        //   header: 'Number of People',
        //   accessorKey: 'numOfPeople',
        //   dataType: 'text',
        //   meta: {
        //     className: 'cell-center'
        //   }
        // },
        // {
        //   header: 'Rating',
        //   accessorKey: 'rating',
        //   dataType: 'text',
        //   meta: {
        //     className: 'cell-center'
        //   }
        // },
        // {
        //   header: 'Reason',
        //   accessorKey: 'reason',
        //   dataType: 'text',
        //   meta: {
        //     className: 'cell-center'
        //   }
        // },
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

  const handleSearchValue = () => {
    // Construct the Firestore query dynamically based on search input
    let queryRef = empCollectionRef;

    if (searchValue !== '') {
      const countryQuery = query(
        empCollectionRef,
        where('placeOfOrigin', '==', searchValue) // Filter by country
        // orderBy('date', 'desc') // Example: Order by date
      );

      // Add another condition to filter by province
      const provinceQuery = query(
        empCollectionRef,
        where('province', '==', searchValue) // Filter by province
        // .orderBy('province') // Order by province
      );

      // Fetch data based on the constructed queries for country and province
      Promise.all([getDocs(countryQuery), getDocs(provinceQuery)])
        .then((querySnapshots) => {
          const countryData = querySnapshots[0].docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }));
          const provinceData = querySnapshots[1].docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }));
          // Merge the results and remove duplicates
          const filteredData = [...new Set([...countryData, ...provinceData])];
          setEmpList(filteredData);
        })
        .catch((error) => {
          console.error('Error fetching documents: ', error);
        });
    } else {
      // Fetch data based on the constructed query
      getDocs(queryRef)
        .then((querySnapshot) => {
          const filteredData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }));
          setEmpList(filteredData);
        })
        .catch((error) => {
          console.error('Error fetching documents: ', error);
        });
    }
  };

  useEffect(() => {
    handleSearchValue();
  }, [searchValue]);

  const handleGenderSearch = () => {
    let genderQuery = empCollectionRef;

    if (selectedGender !== '') {
      genderQuery = query(empCollectionRef, where('gender', '==', selectedGender));
    }

    getDocs(genderQuery)
      .then((querySnapshot) => {
        const filteredData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setEmpList(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching documents: ', error);
      });
  };

  useEffect(() => {
    handleGenderSearch();
  }, [selectedGender]);

  return (
    <MainCard
      content={false}
      title="Survey Table"
      secondary={
        <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
          <TextField
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
          />
          <FormControl style={{ width: '220px' }}>
            <Autocomplete
              id="gender"
              options={gender}
              getOptionLabel={(option) => option}
              value={gender.find((option) => option === selectedGender) || null}
              onChange={(event, newValue) => {
                setSelectedGender(newValue ? newValue : null);
                // handleGenderSearch(newValue);
              }}
              sx={{
                borderRadius: '4px',
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.customShadows.primary,
                border: `1px solid ${theme.palette.primary.main}`
              }}
              renderInput={(params) => <TextField {...params} label="Gender" />}
            />
          </FormControl>

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
                <Pagination count={count} variant="outlined" color="primary" size="medium" page={page} onChange={handleChange} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </MainCard>
  );
};

EditableTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default EditableTable;
