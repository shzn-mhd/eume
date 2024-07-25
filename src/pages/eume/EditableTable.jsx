import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
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
import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore';
import usePagination from 'hooks/usePagination';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PopupTransition } from 'components/@extended/Transitions';
import FilterModal from './components/FilterModal';
import Filter from './components/Filter';
import DashboardDefault from 'pages/dashboard/default';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import CSVImport from 'components/third-party/react-table/CSVImport';
import useAuth from 'hooks/useAuth';
// ==============================|| REACT TABLE - EDITABLE ||============================== //

const EditableTable = ({ data }) => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedMotivation, setSelectedMotivation] = useState('');
  const [selectedModality, setSelectedModality] = useState('');
  const [selectedPet, setSelectedPet] = useState('');
  const [selectedStay, setSelectedStay] = useState('');
  const [selectedStayList, setSelectedStayList] = useState('');
  const [selectedDayStay, setSelectedDayStay] = useState('');
  const [selectedAcc, setSelectedAcc] = useState('');
  const [selectedTrans, setSelectedTrans] = useState('');
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
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

  const empCollectionRef = collection(db, 'survey_data');

  const fetchMunicipalities = async (roleIds) => {
    const municipalities = new Set();
    for (const roleId of roleIds) {
      const roleDoc = await getDoc(doc(db, 'roles', roleId));
      if (roleDoc.exists()) {
        const roleData = roleDoc.data();
        if (Array.isArray(roleData.municipality)) {
          roleData.municipality.forEach((municipality) => municipalities.add(municipality));
        }
      }
    }
    return Array.from(municipalities);
  };

  useEffect(() => {
    const getEmpList = async () => {
      try {
        // Fetch the municipalities associated with the user's roles
        const municipalities = await fetchMunicipalities(user.role);
  
        const data = await getDocs(empCollectionRef);
        console.log('Raw data from Firestore:', data.docs.map((doc) => doc.data()));
        
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
  
        // Filter the data based on the user's municipalities
        let searchedData = filteredData.filter((item) => municipalities.includes(item.municipality));
  
        // Apply search filtering if searchValue is present
        if (searchValue) {
          searchedData = searchedData.filter(
            (item) =>
              item.placeOfOrigin.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.province.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.gender.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.motivation.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.modality.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.stayPlace.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.accommodationType.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.transportation.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.age.includes(searchValue) ||
              item.noOfDays.includes(searchValue)
          );
        }
  
        // Apply other filters
        if (selectedGender) {
          searchedData = searchedData.filter((item) => item.gender === selectedGender);
        }
        if (selectedMunicipality) {
          searchedData = searchedData.filter((item) => item.municipality === selectedMunicipality);
        }
        if (selectedCountry) {
          searchedData = searchedData.filter((item) => item.placeOfOrigin === selectedCountry);
        }
        if (selectedProvince) {
          searchedData = searchedData.filter((item) => item.province === selectedProvince);
        }
        if (selectedAge) {
          searchedData = searchedData.filter((item) => item.age === selectedAge);
        }
        if (selectedMotivation) {
          searchedData = searchedData.filter((item) => item.motivation === selectedMotivation);
        }
        if (selectedModality) {
          searchedData = searchedData.filter((item) => item.modality === selectedModality);
        }
        if (selectedPet) {
          searchedData = searchedData.filter((item) => item.withPet === selectedPet);
        }
        if (selectedStay) {
          searchedData = searchedData.filter((item) => item.stayOvernight === selectedStay);
        }
        if (selectedStayList) {
          searchedData = searchedData.filter((item) => item.stayPlace === selectedStayList);
        }
        if (selectedDayStay) {
          searchedData = searchedData.filter((item) => item.noOfDays === selectedDayStay);
        }
        if (selectedAcc) {
          searchedData = searchedData.filter((item) => item.accommodationType === selectedAcc);
        }
        if (selectedTrans) {
          searchedData = searchedData.filter((item) => item.transportation === selectedTrans);
        }

        // if (selectedDateFrom) {
        //   searchedData = searchedData.filter((item) => {
        //     const itemDate = new Date(item.date);
        //     return itemDate >= selectedDateFrom;
        //   });
        // }
        // if (selectedDateTo) {
        //   searchedData = searchedData.filter((item) => {
        //     const itemDate = new Date(item.date);
        //     return itemDate <= selectedDateTo;
        //   });
        // }

        // If selectedDateFrom and selectedDateTo are both set and are equal, do not filter by date
// If both selectedDateFrom and selectedDateTo are set and are equal, filter by that single date
if (selectedDateFrom && selectedDateTo) {
  if (selectedDateFrom.getTime() === selectedDateTo.getTime()) {
    searchedData = searchedData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.toDateString() === selectedDateFrom.toDateString();
    });
  } else {
    searchedData = searchedData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= selectedDateFrom && itemDate <= selectedDateTo;
    });
  }
} else {
  if (selectedDateFrom) {
    searchedData = searchedData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= selectedDateFrom;
    });
  }
  if (selectedDateTo) {
    searchedData = searchedData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate <= selectedDateTo;
    });
  }
}



        // Sort by date (default sorting)
        searchedData.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB -dateA  ;
        
        });
  
        setEmpList(searchedData);
      } catch (err) {
        console.log(err);
      }
    };
  
    getEmpList();
  }, [
    searchValue,
    selectedGender,
    selectedMunicipality,
    selectedCountry,
    selectedProvince,
    selectedAge,
    selectedMotivation,
    selectedModality,
    selectedPet,
    selectedStay,
    selectedStayList,
    selectedDayStay,
    selectedAcc,
    selectedTrans,
    selectedDateFrom,
    selectedDateTo
  ]);
  

  const PER_PAGE = 10;
  // console.log('empList.length', empList.length);
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
        const sortValueA = a[columnId].toLowerCase();
        const sortValueB = b[columnId].toLowerCase();

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
    handleSortingChange(sortValue);
    console.log('sorting id', sortValue);
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
          header: t('Date'),
          accessorKey: 'date',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
        },
    

        {
          header: t('Municipality'),
          accessorKey: 'municipality',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: t('Gender'),
          accessorKey: 'gender',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const gender = row.original.gender;
            return t(gender);
          }
        },
        {
          header: t('Age'),
          accessorKey: 'age',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: t('Reason'),
          accessorKey: 'reason',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: t('Modality'),
          accessorKey: 'modality',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const modality = row.original.modality;
            return t(modality);
          }
        },
        {
          header: t('With Pet'),
          accessorKey: 'withPet',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const withPet = row.original.withPet;
            return t(withPet);
          }
        },
        {
          header: t('Stay Overnight'),
          accessorKey: 'stayOvernight',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const stayOvernight = row.original.stayOvernight;
            return t(stayOvernight);
          }
        },

        {
          header: t('Stay Place'),
          accessorKey: 'stayPlace',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const stayPlace = row.original.stayPlace;
            return t(stayPlace);
          }
        },
        {
          header: t('No of Days'),
          accessorKey: 'noOfDays',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: t('Accommodation Type'),
          accessorKey: 'accommodationType',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const accommodationType = row.original.accommodationType;
            return t(accommodationType);
          }
        },
        {
          header: t('Transportation'),
          accessorKey: 'transportation',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const transportation = row.original.transportation;
            return t(transportation);
          }
        },
        {
          header: t('Activity'),
          accessorKey: 'activity',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const activity = row.original.activity;
            return t(activity);
          }
        },



        // {
        //   header: t('Activity Reason'),
        //   accessorKey: 'activityReason',
        //   dataType: 'text',
        //   meta: {
        //     className: 'cell-center'
        //   }
        // },
     
      
     
        {
          header: t('Language'),
          accessorKey: 'language',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
   
        {
          header: t('Motivation'),
          accessorKey: 'motivation',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const motivation = row.original.motivation;
            return t(motivation);
          }
        },
     
        {
          header: t('No Of People'),
          accessorKey: 'noOfPeople',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
        {
          header: t('Place of Origin'),
          accessorKey: 'placeOfOrigin',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const placeOfOrigin = row.original.placeOfOrigin;
            return t(placeOfOrigin);
          }
        },
        {
          header: t('Province'),
          accessorKey: 'province',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          },
          cell: ({ row }) => {
            const province = row.original.province;
            return t(province);
          }
        },
     
     
    
   
        {
          header: t('Transportation Reason'),
          accessorKey: 'transportationReason',
          dataType: 'text',
          meta: {
            className: 'cell-center'
          }
        },
    
    
      ],
      [t]
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
              return {...old[rowIndex],[columnId]: value};
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
    setSelectedAge('');
    setSelectedMotivation('');
    setSelectedModality('');
    setSelectedPet('');
    setSelectedStay('');
    setSelectedStayList('');
    setSelectedDayStay('');
    setSelectedAcc('');
    setSelectedTrans('');
    setSelectedDateFrom(null);
    setSelectedDateTo(null);
  };

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  const handleLanguageChange = (event, value) => {
    if (value) {
      i18n.changeLanguage(value.code);
      setSelectedLanguage(value.code);
    }
  };

  return (
    <MainCard
      content={false}
      title={t('Survey Table')}
      subheader={empList.length + ' ' + t('Basic Surveys')}
      secondary={
        <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
          <TextField
            // fullWidth
            sx={{
              borderRadius: '4px',
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.customShadows.primary,
              border: `1px solid ${theme.palette.primary.main}`
            }}
            InputProps={{
              startAdornment: <SearchOutlined />,
              placeholder: t('Search'),
              type: 'search'
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <SelectColumnSorting {...{ setSortValue, getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />

          <Button
            size="small"
            sx={{ minWidth: '130px', minHeight: '41.13px' }}
            startIcon={<PlusOutlined />}
            color="primary"
            variant="contained"
            onClick={() => setOpenStoryDrawer((prevState) => !prevState)}
          >
            {t('Filter Options')}
          </Button>

          <Button
            size="small"
            sx={{ minWidth: '130px', minHeight: '41.13px' }}
            color="error"
            variant="contained"
            onClick={() => ResetTable()}
          >
            {t('Reset Filter')}
          </Button>

          <CSVExport
            // data={table.getRowModel().flatRows.map((row) => row.original)}
            data={empList}
            headers={headers}
            filename="basic-survey.csv"
          />
          <CSVImport collectionRef={empCollectionRef} headers={headers} />
          <div></div>
          {/* <Stack direction="row" spacing={2} justifyContent="center">
          <FormControl style={{ width: '150px' }}>
            <Autocomplete
              id="language"
              options={languageOptions}
              getOptionLabel={(option) => option.label}
              value={languageOptions.find((option) => option.code === selectedLanguage) || null}
              onChange={handleLanguageChange}
              sx={{
                borderRadius: '4px',
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.customShadows.primary,
                border: `1px solid ${theme.palette.primary.main}`
              }}
              renderInput={(params) => <TextField {...params} label="Language" />}
              />
          </FormControl>
          </Stack> */}
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
              backgroundColor: '#eeedfc'
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

            <TableRow sx={{ position: 'sticky', bottom: 0, zIndex: '100', backgroundColor: 'white' }}>
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
          selectedAge={selectedAge}
          setSelectedAge={setSelectedAge}
          selectedMotivation={selectedMotivation}
          setSelectedMotivation={setSelectedMotivation}
          selectedModality={selectedModality}
          setSelectedModality={setSelectedModality}
          selectedPet={selectedPet}
          setSelectedPet={setSelectedPet}
          selectedStay={selectedStay}
          setSelectedStay={setSelectedStay}
          selectedStayList={selectedStayList}
          setSelectedStayList={setSelectedStayList}
          selectedDayStay={selectedDayStay}
          setSelectedDayStay={setSelectedDayStay}
          selectedAcc={selectedAcc}
          setSelectedAcc={setSelectedAcc}
          selectedTrans={selectedTrans}
          setSelectedTrans={setSelectedTrans}
        />
      </Dialog>
      <Filter
        ResetTable={ResetTable}
        empList={empList}
        open={openStoryDrawer}
        handleDrawerOpen={handleStoryDrawerOpen}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        selectedMunicipality={selectedMunicipality}
        setSelectedMunicipality={setSelectedMunicipality}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedProvince={selectedProvince}
        setSelectedProvince={setSelectedProvince}
        selectedAge={selectedAge}
        setSelectedAge={setSelectedAge}
        selectedMotivation={selectedMotivation}
        setSelectedMotivation={setSelectedMotivation}
        selectedModality={selectedModality}
        setSelectedModality={setSelectedModality}
        selectedPet={selectedPet}
        setSelectedPet={setSelectedPet}
        selectedStay={selectedStay}
        setSelectedStay={setSelectedStay}
        selectedStayList={selectedStayList}
        setSelectedStayList={setSelectedStayList}
        selectedDayStay={selectedDayStay}
        setSelectedDayStay={setSelectedDayStay}
        selectedAcc={selectedAcc}
        setSelectedAcc={setSelectedAcc}
        selectedTrans={selectedTrans}
        setSelectedTrans={setSelectedTrans}
        selectedDateFrom={selectedDateFrom}
        setSelectedDateFrom={setSelectedDateFrom}
        selectedDateTo={selectedDateTo}
        setSelectedDateTo={setSelectedDateTo}
      />
    </MainCard>
  );
};

EditableTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default EditableTable;
