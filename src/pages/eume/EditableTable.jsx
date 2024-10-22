import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Button,
  TextField,
  Stack,
  useTheme,
  useMediaQuery,
  Dialog,
  Pagination,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';

import { db } from 'config/firebase';
import { getDocs, collection, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { DeleteOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { PopupTransition } from 'components/@extended/Transitions';
import FilterModal from './components/FilterModal';

import Filter from './components/Filter';
import { useTranslation } from 'react-i18next';
import CSVExport from 'components/third-party/react-table/CSVExport';
import CSVImport from 'components/third-party/react-table/CSVImport';
import useAuth from 'hooks/useAuth';

const EditableTable = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [sorting, setSorting] = useState({
    field: 'date',
    sort: 'desc'
  });

  const [pageSize, setPageSize] = useState(10);
  const [filteredEmpList, setFilteredEmpList] = useState([]);
  const [sortModel, setSortModel] = useState([]);

  const [selectedGender, setSelectedGender] = useState('');

  const [selectService, setSelectService] = useState('');

  const [selectedSignaling, setSelectedSignaling] = useState('');

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
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openStoryDrawer, setOpenStoryDrawer] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const showImportData = user?.rolePermissions['Basic Survey']?.importData;
  const showExportData = user?.rolePermissions['Basic Survey'].exportData;

  const handleStoryDrawerOpen = () => {
    setOpenStoryDrawer((prevState) => !prevState);
  };

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

  const getEmpList = async () => {
    try {
      const municipalities = await fetchMunicipalities(user.role);
      const data = await getDocs(empCollectionRef);
      const filteredData = data?.docs?.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      console.log('municipalities basic', municipalities);
      console.log('data basic', data);
      console.log('filteredData basic', filteredData);

      let searchedData = filteredData.filter((item) => municipalities.includes(item.municipality));
      console.log('searchedData basic', searchedData)


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
        searchedData = searchedData.filter((item) => {
            return item.motivation.toLowerCase() === selectedMotivation.toLowerCase()
        });
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
      
      if (selectedActivity) {
        searchedData = searchedData.filter((item) => item.activity === selectedActivity);
      }

      if (selectedDateFrom && selectedDateTo && selectedDateFrom.getTime() === selectedDateTo.getTime()) {
        // Both dates are equal, filter for the exact date
        searchedData = searchedData.filter((item) => {
          const itemDate = new Date(item.date);
          // Remove time part for the comparison to be only by date
          return (
            itemDate.getFullYear() === selectedDateFrom.getFullYear() &&
            itemDate.getMonth() === selectedDateFrom.getMonth() &&
            itemDate.getDate() === selectedDateFrom.getDate()
          );
        });
      } else {
        // Handle cases where the dates are not equal
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

      setEmpList(searchedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
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
    selectedActivity,
    selectedDateFrom,
    selectedDateTo,
    user.role
  ]);

  // useEffect(() => {
  //   let sortedData = [...empList];
  useEffect(() => {
    let sortedData = [...empList];
  
    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      sortedData = sortedData.sort((a, b) => {
        if (a[field] < b[field]) return sort === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return sort === 'asc' ? 1 : -1;
        return 0;
      });
    } else {
      // Default sorting by date in descending order and secondary sort by a secondary field (e.g., 'id')
      sortedData = sortedData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateB - dateA;
        }
        // Secondary sort by another field (e.g., 'id') to maintain uniqueness
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      });
    }
  
    const start = page * pageSize;
    const end = start + pageSize;
    setFilteredEmpList(sortedData.slice(start, end));
  }, [empList, page, pageSize, sortModel]);

  // useEffect(() => {
  //   let sortedData = [...empList];

  //   if (sortModel.length > 0) {
  //     const { field, sort } = sortModel[0];
  //     sortedData = sortedData.sort((a, b) => {
  //       if (a[field] < b[field]) return sort === 'asc' ? -1 : 1;
  //       if (a[field] > b[field]) return sort === 'asc' ? 1 : -1;
  //       return 0;
  //     });
  //   } else {
  //     // Default sorting by date in descending order
  //     sortedData = sortedData.sort((a, b) => {
  //       const dateA = new Date(a.date);
  //       const dateB = new Date(b.date);
  //       return dateB - dateA;
  //     });
  //   }

  //   const start = page * pageSize;
  //   const end = start + pageSize;
  //   setFilteredEmpList(sortedData.slice(start, end));
  // }, [empList, page, pageSize, sortModel]);

  const ResetTable = () => {
    setSelectedGender('');
    setSearchValue('');
    setSelectedCountry('');
    setSelectedProvince('');
    setSelectedMunicipality('');
    setSelectedAge(null);
    setSelectedMotivation('');
    setSelectedModality('');
    setSelectedPet('');
    setSelectedStay('');
    setSelectedStayList('');
    setSelectedDayStay('');
    setSelectedAcc('');
    setSelectedTrans('');
    setSelectedActivity("");
    setSelectedDateFrom(null);
    setSelectedDateTo(null);
  };

  const deleteDocument = async (docId) => {
    try {
      await deleteDoc(doc(db, 'survey_data', docId));
      setEmpList((prev) => prev.filter((item) => item.id !== docId));
      setSnackbarMessage('Document deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true); // Show snackbar on successful deletion
    } catch (error) {
      console.error('Error deleting document: ', error);
      setSnackbarMessage('Error deleting document');
      setSnackbarSeverity('error');
      setSnackbarOpen(true); // Show snackbar on error
    }
  };

  const columns = useMemo(
    () => [
      {
        field: 'date',
        headerName: t('Date'),
        width: 200,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.date)
      },
      {
        field: 'municipality',
        headerName: t('Municipality'),
        // flex: 1,
        width: 100,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.municipality)
      },

      {
        field: 'language',
        headerName: t('Language'),
        // flex: 1,
        width: 80,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.language)
      },
      {
        field: 'placeOfOrigin',
        headerName: t('Place of Origin'),
        // flex: 1,
        width: 120,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.placeOfOrigin)
      },
      {
        field: 'province',
        headerName: t('Province'),
        // flex: 1,
        width: 120,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.province)
      },
      {
        field: 'gender',
        headerName: t('Gender'),
        // flex: 1,
        width: 80,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.gender)
      },
      { field: 'age', headerName: t('Age'), width: 80, editable: true, cellClassName: 'cell-center', renderCell: ({ row }) => t(row.age) },
      {
        field: 'motivation',
        headerName: t('Motivation'),
        width: 150,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.motivation)
      },
      {
        field: 'reason',
        headerName: t('Reason'),
        width: 180,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.reason)
      },
      {
        field: 'modality',
        headerName: t('Modality'),
        width: 120,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.modality)
      },
      {
        field: 'noOfPeople',
        headerName: t('No Of People'),
        width: 100,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.noOfPeople)
      },
      {
        field: 'withPet',
        headerName: t('With Pet'),
        width: 100,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.withPet)
      },
      {
        field: 'stayOvernight',
        headerName: t('Stay Overnight'),
        width: 100,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.stayOvernight)
      },
      {
        field: 'stayPlace',
        headerName: t('Stay Place'),
        width: 100,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.stayPlace)
      },

      {
        field: 'noOfDays',
        headerName: t('No of Days'),
        width: 100,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.noOfDays)
      },
      {
        field: 'accommodationType',
        headerName: t('Accommodation Type'),
        width: 120,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.accommodationType)
      },
      {
        field: 'transportation',
        headerName: t('Transportation'),
        width: 120,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.transportation)
      },

      {
        field: 'transportationReason',
        headerName: t('Transportation Reason'),
        width: 180,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.transportationReason)
      },

      {
        field: 'activity',
        headerName: t('Activity'),
        width: 100,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.activity)
      },
      {
        field: 'activityReason',
        headerName: t('Activity Reason'),
        width: 200,
        editable: true,
        cellClassName: 'cell-center',
        renderCell: ({ row }) => t(row.activityReason)
      },

      {
        field: 'actions',
        headerName: t('Actions'),
        width: 60,
        renderCell: (params) => (
          <Tooltip title={t('Delete')}>
            <IconButton
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                deleteDocument(params.row.id);
              }}
            >
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        )
      }
    ],
    [t]
  );

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSortChange = (sortModel) => {
    if (sortModel.length > 0) {
      setSorting(sortModel[0]);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const PER_PAGE = 10;
  const count = Math.ceil(empList.length / PER_PAGE);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return empList.slice(start, end);
  }, [empList, page, rowsPerPage]);

  const translateData = (data) => {
    return data.map((item) => ({
      date: t(item.date),
      municipality: t(item.municipality),
      gender: t(item.gender),
      age: t(item.age),
      reason: t(item.reason),
      modality: t(item.modality),
      withPet: t(item.withPet),
      stayOvernight: t(item.stayOvernight),
      stayPlace: t(item.stayPlace),
      noOfDays: t(item.noOfDays),
      accommodationType: t(item.accommodationType),
      transportation: t(item.transportation),
      activity: t(item.activity),
      language: t(item.language),
      motivation: t(item.motivation),
      noOfPeople: t(item.noOfPeople),
      placeOfOrigin: t(item.placeOfOrigin),
      province: t(item.province),
      transportationReason: t(item.transportationReason),
      activityReason: t(item.activityReason)
      
      // Add any other fields that need translation  activityReason
    }));
  };

  // Translate empList data
  const translatedEmpList = translateData(empList);

  useEffect(() => {
    console.log('Selected Motivation changed:', selectedMotivation);
  }, [selectedMotivation]);

  return (
    <MainCard
      content={false}
      title={t('Survey Table')}
      subheader={`${empList.length} ${t('Basic Surveys')}`}
      secondary={
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} justifyContent="center" alignItems="center">
          {/* <TextField
            sx={{
              borderRadius: '4px',
              bgcolor: theme.palette.background.paper,
              boxShadow: theme.customShadows.primary,
              border: `1px solid ${theme.palette.primary.main}`,
            }}
            InputProps={{
              startAdornment: <SearchOutlined />,
              placeholder: t('Search'),
              type: 'search',
            }}
            value={searchValue}
            onChange={handleSearchChange}
          /> */}

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

          <Box display="flex" alignItems="center" gap={1}>
            {showExportData && (
              // <CSVExport
              //   data={translatedEmpList}
              //   headers={columns.map((col) => ({ label: col.headerName, key: col.field }))}
              //   filename="basic-survey.csv"
              // />
              <CSVExport
                data={translatedEmpList}
                headers={columns
                  .filter((col) => col.headerName !== "Actions")
                  .map((col) => ({ label: col.headerName, key: col.field }))}
                filename="basic-survey.csv"
              />

            )}
            {showImportData && (
              <CSVImport
                collectionRef={empCollectionRef}
                onImportComplete={getEmpList}
                headers={columns.map((col) => ({ label: col.headerName, key: col.field }))}
              />
            )}
          </Box>
        </Stack>
      }
    >
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <div style={{ minWidth: isMobile ? 'auto' : '2600px' }}>
          <DataGrid
            rows={filteredEmpList}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            paginationMode="server"
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={(model) => {
              setPage(model.page);
              setPageSize(model.pageSize);
            }}
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            rowCount={empList.length}
          />
        </div>
      </Box>
      <Dialog TransitionComponent={PopupTransition} onClose={() => setOpenFilterModal(false)} open={openFilterModal} scroll="body">
        <FilterModal
          onClose={() => setOpenFilterModal(false)}
          selectedAcc={selectedAcc}
          setSelectedAcc={setSelectedAcc}
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
          selectedTrans={selectedTrans}
          setSelectedTrans={setSelectedTrans}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
        />
      </Dialog>

      <Filter
        empList={empList}
        open={openStoryDrawer}
        ResetTable={ResetTable}
        handleDrawerOpen={handleStoryDrawerOpen}
        selectedAcc={selectedAcc}
        setSelectedAcc={setSelectedAcc}
        selectedMunicipality={selectedMunicipality}
        setSelectedMunicipality={setSelectedMunicipality}
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
        selectedTrans={selectedTrans}
        setSelectedTrans={setSelectedTrans}
        selectedDateFrom={selectedDateFrom}
        setSelectedDateFrom={setSelectedDateFrom}
        selectedDateTo={selectedDateTo}
        setSelectedDateTo={setSelectedDateTo}
        selectedActivity={selectedActivity}
        setSelectedActivity={setSelectedActivity}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

EditableTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default EditableTable;