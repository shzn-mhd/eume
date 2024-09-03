import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Dialog, Stack, useMediaQuery, useTheme, Tooltip, IconButton, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';

import { db } from 'config/firebase';
import { getDocs, collection, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { PopupTransition } from 'components/@extended/Transitions';
import FilterModal from './components/FilterModal';

import Filter from './components/Filter';
import { useTranslation } from 'react-i18next';
import CSVImport from 'components/third-party/react-table/CSVImport';
import useAuth from 'hooks/useAuth';
import { CSVExport } from 'components/third-party/react-table';

const EditableTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const { user } = useAuth();
  const [empList, setEmpList] = useState([]);
  const [page, setPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);
  const [filteredEmpList, setFilteredEmpList] = useState([]);
  const [sortModel, setSortModel] = useState([]);
  const [selectedAcc, setSelectedAcc] = useState('');
  const [selectService, setSelectService] = useState('');

  const [selectedSignaling, setSelectedSignaling] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedAaccess, setSelectedAccess] = useState('');
  const [selectedQualityPriceRatio, setSelectedQualityPriceRatio] = useState('');
  const [selectedCleaningConservation, setSelectedCleaningConservation] = useState('');
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openStoryDrawer, setOpenStoryDrawer] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const showImportData = user?.rolePermissions['Optional Survey']?.importData;
  const showExportData = user?.rolePermissions['Optional Survey'].exportData;

  const handleStoryDrawerOpen = () => {
    setOpenStoryDrawer((prevState) => !prevState);
  };

  const empCollectionRef = collection(db, 'optional_survey_data');

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
      const municipalities = await fetchMunicipalities(user?.role);
      const data = await getDocs(empCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));

      let searchedData = filteredData.filter((item) => municipalities.includes(item.municipality));
      console.log('searchedData optional', searchedData);

      if (selectedAcc) {
        searchedData = searchedData.filter((item) => item.accessibility === selectedAcc);
      }

      if (selectService) {
        searchedData = searchedData.filter((item) => item.catering_services === selectService);
      }

      if (selectedMunicipality) {
        searchedData = searchedData.filter((item) => item.municipality === selectedMunicipality);
      }

      if (selectedSignaling) {
        searchedData = searchedData.filter((item) => item.signaling === selectedSignaling);
      }

      if (selectedAaccess) {
        searchedData = searchedData.filter((item) => item.cleaning_conservation === selectedAaccess);
      }

      if (selectedQualityPriceRatio) {
        searchedData = searchedData.filter((item) => item.quality_price_ratio === selectedQualityPriceRatio);
      }

      if (selectedCleaningConservation) {
        searchedData = searchedData.filter((item) => item.retailers === selectedCleaningConservation);
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
    selectedAcc,
    selectService,
    selectedSignaling,
    selectedAaccess,
    selectedQualityPriceRatio,
    selectedCleaningConservation,
    selectedMunicipality,
    selectedDateFrom,
    selectedDateTo
  ]);

  useEffect(() => {
    let sortedData = [...empList];

    if (sortModel.length > 0) {
      const { field, sort } = sortModel[0];
      sortedData = sortedData.sort((a, b) => {
        if (a[field] < b[field]) return sort === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return sort === 'asc' ? 1 : -1;
        return 0;
      });
    }else {
      // Default sorting by date in descending order
      sortedData = sortedData.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
    }

    const start = page * pageSize;
    const end = start + pageSize;
    setFilteredEmpList(sortedData.slice(start, end));
  }, [empList, page, pageSize, sortModel]);

  const ResetTable = () => {
    setSelectedAcc('');
    setSelectService('');
    setSelectedSignaling('');
    setSelectedAccess('');
    setSelectedQualityPriceRatio('');
    setSelectedCleaningConservation('');
    setSelectedDateFrom(null);
    setSelectedDateTo(null);
  };

  const deleteDocument = async (docId) => {
    try {
      await deleteDoc(doc(db, 'optional_survey_data', docId));
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
      { field: 'date', headerName: t('Date'), flex: 1, editable: true, cellClassName: 'cell-center' },
      { field: 'municipality', headerName: t('Municipality'), flex: 1, editable: true },
      { field: 'general_assessment', headerName: t('General Assessment'), flex: 1, editable: true },

      { field: 'lodging', headerName: t('Lodging'), flex: 1, editable: true },
      { field: 'catering_services', headerName: t('Catering Services'), flex: 1, editable: true },

      { field: 'retailers', headerName: t('Retailers'), flex: 1, editable: true }, //shopping
      { field: 'tourist_information', headerName: t('Tourist Information'), flex: 1, editable: true },
      { field: 'signaling', headerName: t('Signaling'), flex: 1, editable: true },
      { field: 'accessibility', headerName: t('Accessibility'), flex: 1, editable: true },
      { field: 'sustainability', headerName: t('Sustainability'), flex: 1, editable: true },
      { field: 'cleaning_conservation', headerName: t('Cleaning Conservation'), flex: 1, editable: true },
      { field: 'cultural_offerings', headerName: t('Cultural Offerings'), flex: 1, editable: true },

      { field: 'quality_price_ratio', headerName: t('Quality Price Ratio'), flex: 1, editable: true },
      { field: 'optionalFeedback', headerName: t('Optional Feedback'), flex: 1, editable: true },

      {
        field: 'actions',
        headerName: t('Actions'),
        flex: 1,
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

  const translateData = (data) => {
    return data.map((item) => ({
      date: t(item.date),
      municipality: t(item.municipality),
      general_assessment: t(item.general_assessment),
      lodging: t(item.lodging),
      catering_services: t(item.catering_services),
      retailers: t(item.retailers),
      tourist_information: t(item.tourist_information),
      signaling: t(item.signaling),
      accessibility: t(item.accessibility),
      sustainability: t(item.sustainability),
      cleaning_conservation: t(item.cleaning_conservation),
      cultural_offerings: t(item.cultural_offerings),
      quality_price_ratio: t(item.quality_price_ratio),
      optionalFeedback: t(item.optionalFeedback)
    }));
  };

  // Translate empList data
  const translatedEmpList = translateData(empList);

  return (
    <MainCard
      content={false}
      title={t('Optional Survey Table')}
      subheader={empList.length + ' ' + t('Optional Surveys')}
      secondary={
        <Stack direction={isMobile ? 'column' : 'row'} spacing={2} justifyContent="center" alignItems="center">
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
              <CSVExport
                data={translatedEmpList}
                // headers={columns.map((col) => ({ label: col.headerName, key: col.field }))}
                headers={columns
                  .filter((col) => col.headerName !== "Actions")
                  .map((col) => ({ label: col.headerName, key: col.field }))}
                filename="optional-survey.csv"
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
        <div style={{ minWidth: isMobile ? 'auto' : '2500px' , maxHeight: '600px', overflowY: 'auto' }}>
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
        <FilterModal onClose={() => setOpenFilterModal(false)} selectedAcc={selectedAcc} setSelectedAcc={setSelectedAcc} />
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
        selectedDateFrom={selectedDateFrom}
        setSelectedDateFrom={setSelectedDateFrom}
        selectedDateTo={selectedDateTo}
        setSelectedDateTo={setSelectedDateTo}
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
