import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Dialog, Stack, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'components/MainCard';

import { db } from 'config/firebase';
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';
import { PlusOutlined } from '@ant-design/icons';
import { PopupTransition } from 'components/@extended/Transitions';
import FilterModal from './components/FilterModal';

import Filter from './components/Filter';
import { useTranslation } from 'react-i18next';
import CSVImport from 'components/third-party/react-table/CSVImport';
import useAuth from 'hooks/useAuth';

const EditableTable = () => {
  const theme = useTheme();
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

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openStoryDrawer, setOpenStoryDrawer] = useState(false);

  const showImportData = user?.rolePermissions['Optional Survey']?.importData;

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

  useEffect(() => {
    const getEmpList = async () => {
      try {
        const municipalities = await fetchMunicipalities(user?.role);
        const data = await getDocs(empCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));

        let searchedData = filteredData.filter((item) => municipalities.includes(item.municipality));

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

        setEmpList(searchedData);
      } catch (err) {
        console.log(err);
      }
    };

    getEmpList();
  }, [
    selectedAcc,
    selectService,
    selectedSignaling,
    selectedAaccess,
    selectedQualityPriceRatio,
    selectedCleaningConservation,
    selectedMunicipality
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
  };

  const columns = useMemo(
    () => [
      {
        field: 'municipality',
        headerName: t('Municipality'),
        flex: 1,
        editable: true
      },

      { field: 'general_assessment', headerName: t('General Assessment'), flex: 1, editable: true },
      { field: 'lodging', headerName: t('Lodging'), flex: 1, editable: true },
      { field: 'catering_services', headerName: t('Catering Services'), flex: 1, editable: true },
      { field: 'retailers', headerName: t('Retailers'), flex: 1, editable: true },
      { field: 'tourist_information', headerName: t('Tourist Information'), flex: 1, editable: true },
      { field: 'signaling', headerName: t('Signaling'), flex: 1, editable: true },
      { field: 'accessibility', headerName: t('Accessibility'), flex: 1, editable: true },
      { field: 'sustainability', headerName: t('Sustainability'), flex: 1, editable: true },
      { field: 'cleaning_conservation', headerName: t('Cleaning Conservation'), flex: 1, editable: true },
      { field: 'cultural_offerings', headerName: t('Cultural Offerings'), flex: 1, editable: true },
      { field: 'quality_price_ratio', headerName: t('Quality Price Ratio'), flex: 1, editable: true },
      { field: 'optionalFeedback', headerName: t('Optional Feedback'), flex: 1, editable: true }
    ],
    [t]
  );

  return (
    <MainCard
      content={false}
      title={t('Optional Survey Table')}
      subheader={empList.length + ' ' + t('Optional Surveys')}
      secondary={
        <Stack direction="row" spacing={5} justifyContent="center" alignItems="center">
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

          {showImportData && (
            <CSVImport collectionRef={empCollectionRef} headers={columns.map((col) => ({ label: col.headerName, key: col.field }))} />
          )}
        </Stack>
      }
    >
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
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
      />
    </MainCard>
  );
};

EditableTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default EditableTable;
