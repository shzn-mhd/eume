import { CloseOutlined } from '@ant-design/icons';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import accList from 'data/accomodation';
import ageList from 'data/age';
import countryList from 'data/country';
import modalityList from 'data/modality';
import motivationList from 'data/motivation';
import provinceList from 'data/province';
import stayList from 'data/stay';
import transList from 'data/transport';
import { useTranslation } from 'react-i18next';

const Filter = ({
  ResetTable,
  open,
  empList,
  handleDrawerOpen,
  selectedGender,
  setSelectedGender,
  selectedMunicipality,
  setSelectedMunicipality,
  selectedCountry,
  setSelectedCountry,
  selectedProvince,
  setSelectedProvince,
  selectedAge,
  setSelectedAge,
  selectedMotivation,
  setSelectedMotivation,
  selectedModality,
  setSelectedModality,
  selectedPet,
  setSelectedPet,
  selectedStay,
  setSelectedStay,
  selectedStayList,
  setSelectedStayList,
  selectedDayStay,
  setSelectedDayStay,
  selectedAcc,
  setSelectedAcc,
  selectedTrans,
  setSelectedTrans,
  selectedDateFrom,
  setSelectedDateFrom,
  selectedDateTo,
  setSelectedDateTo
}) => {
  const theme = useTheme();
  const gender = ['Male', 'Female'];
  const pet = ['Yes', 'No'];
  const stay = ['Yes', 'No'];
  const day = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const municipalities = ['A Capela', 'As Pontes', 'Cabanas', 'Monfero', 'Pontedeume'];
  const { t, i18n } = useTranslation();
  return (
    <Drawer
      sx={{
        ml: open ? 3 : 0,
        flexShrink: 0,
        zIndex: 1200,
        overflowX: 'hidden',
        width: { xs: 320, md: 450 },
        '& .MuiDrawer-paper': {
          width: { xs: 320, md: 400 },
          border: 'none',
          borderRadius: '20px',
          margin: '30px',
          maxHeight: '680px'
        }
      }}
      variant="temporary"
      anchor="right"
      open={open}
      ModalProps={{ keepMounted: true }}
      onClose={() => {
        handleDrawerOpen();
        // formik.resetForm();
      }}
    >
      {open && (
        <SimpleBar
          sx={{
            overflowX: 'hidden',
            height: '100vh'
          }}
        >
          <Box sx={{ p: 2 }}>
            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
              {/* <Stack direction="row" justifyContent="space-between" width="100%"> */}
              <Grid
                item
                sx={{ width: '100%' }}
                // sx={{ width: 'calc(100% - 64px)' }}
              >
                <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between">
                  <Typography
                    variant="h4"
                    sx={{
                      display: 'inline-block',
                      width: 'calc(100% - 34px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      verticalAlign: 'middle'
                    }}
                  >
                    {t('Filtering Options1')}
                  </Typography>
                  <Tooltip title="Close">
                    <IconButton color="secondary" onClick={handleDrawerOpen} size="small" sx={{ fontSize: '0.875rem' }}>
                      <CloseOutlined />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Grid>
              {/* </Stack> */}
            </Grid>
          </Box>
          <Divider />
          <Stack padding={2}>
            <MainCard contentSX={{ p: 2.25 }}>
              <Stack spacing={0.5}>
                <Typography variant="h6" color="textSecondary">
                  {t('Total Visitors')}
                </Typography>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography variant="h4" color="inherit">
                      {empList.length}
                    </Typography>
                  </Grid>
                  {/* {percentage && (
          <Grid item>
            <Chip
              variant="combined"
              color={color}
              icon={
                <>
                  {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                  {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                </>
              }
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1 }}
              size="small"
            />
          </Grid>
        )} */}
                </Grid>
              </Stack>
            </MainCard>
          </Stack>

          <Box sx={{ p: 2, maxHeight: '50vh', overflowY: 'auto' }}>
            <Stack direction="column" spacing={2}>
              <Grid container gap={1}>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        id="dateFrom"
                        label={t('Date - From')}
                        inputFormat="MM/dd/yyyy"
                        value={selectedDateFrom}
                        onChange={(newValue) => setSelectedDateFrom(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        id="dateTo"
                        label={t('Date - To')}
                        inputFormat="MM/dd/yyyy"
                        value={selectedDateTo}
                        onChange={(newValue) => setSelectedDateTo(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="country"
                      options={countryList}
                      getOptionLabel={(option) => t(option)}
                      value={countryList.find((option) => option === selectedCountry) || null}
                      onChange={(event, newValue) => {
                        setSelectedCountry(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('Country')} />}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="province"
                      options={provinceList}
                      getOptionLabel={(option) => t(option)}
                      value={provinceList.find((option) => option === selectedProvince) || null}
                      onChange={(event, newValue) => {
                        setSelectedProvince(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('Province')} />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item xs={11.6}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="municiplaity"
                      options={municipalities}
                      getOptionLabel={(option) => t(option)}
                      value={municipalities.find((option) => option === selectedMunicipality) || null}
                      onChange={(event, newValue) => {
                        setSelectedMunicipality(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('Municipality')} />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="gender"
                      options={gender}
                      getOptionLabel={(option) => t(option)}
                      value={gender.find((option) => option === selectedGender) || null}
                      onChange={(event, newValue) => {
                        setSelectedGender(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('Gender')} />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <TextField
                      id="age"
                      value={selectedAge || null}
                      // onChange={(event, newValue) => {
                      //   console.log("newww",newValue);
                      //   setSelectedAge(newValue ? newValue : null);
                      // }}
                      onChange={(e) => setSelectedAge(e.target.value)}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      label={t('Age')}
                      type="number"
                    />
                    {/* <Autocomplete
                      id="age"
                      options={ageList}
                      getOptionLabel={(option) => option}
                      value={ageList.find((option) => option === selectedAge) || null}
                      onChange={(event, newValue) => {
                        setSelectedAge(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper,
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label="Age" />}
                    /> */}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="motivation"
                      options={motivationList}
                      getOptionLabel={(option) => t(option)}
                      value={motivationList.find((option) => option === selectedMotivation) || null}
                      onChange={(event, newValue) => {
                        setSelectedMotivation(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('Motivation')} />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="modality"
                      options={modalityList}
                      getOptionLabel={(option) => t(option)}
                      value={modalityList.find((option) => option === selectedModality) || null}
                      onChange={(event, newValue) => {
                        setSelectedModality(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('Modality')} />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="withPet"
                      options={pet}
                      getOptionLabel={(option) => t(option)}
                      value={pet.find((option) => option === selectedPet) || null}
                      onChange={(event, newValue) => {
                        setSelectedPet(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('With Pet')} />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="stayOvernight"
                      options={stay}
                      getOptionLabel={(option) => t(option)}
                      value={stay.find((option) => option === selectedStay) || null}
                      onChange={(event, newValue) => {
                        setSelectedStay(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('Stay Overnight')} />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="stayPlace"
                      options={stayList}
                      getOptionLabel={(option) => t(option)}
                      value={stayList.find((option) => option === selectedStayList) || null}
                      onChange={(event, newValue) => {
                        setSelectedStayList(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('Stay Place')} />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="noOfDays"
                      options={day}
                      getOptionLabel={(option) => option}
                      value={day.find((option) => option === selectedDayStay) || null}
                      onChange={(event, newValue) => {
                        setSelectedDayStay(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('No of Days')} />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="accommodationType"
                      options={accList}
                      getOptionLabel={(option) => t(option)}
                      value={accList.find((option) => option === selectedAcc) || null}
                      onChange={(event, newValue) => {
                        setSelectedAcc(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('Accomodation Type')} />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="transportation"
                      options={transList}
                      getOptionLabel={(option) => t(option)}
                      value={transList.find((option) => option === selectedTrans) || null}
                      onChange={(event, newValue) => {
                        setSelectedTrans(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper
                        // boxShadow: theme.customShadows.primary,
                        // border: `1px solid ${theme.palette.primary.main}`
                      }}
                      renderInput={(params) => <TextField {...params} label={t('Transport')} />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Stack>
          </Box>
          <Divider />
          {/* <Grid item sx={{width:'100%'}}> */}
          <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between" padding={2}>
            <Tooltip title="Reset Filter">
              <Button
                size="small"
                sx={{ minWidth: '130px', minHeight: '41.13px' }}
                color="error"
                variant="contained"
                onClick={() => ResetTable()}
              >
                {t('Reset Filter')}
              </Button>
            </Tooltip>
            <Tooltip title="Filter">
              <Button
                size="small"
                sx={{ minWidth: '130px', minHeight: '41.13px' }}
                // startIcon={<PlusOutlined />}
                color="primary"
                variant="contained"
                onClick={handleDrawerOpen}
              >
                {t('Filter')}
              </Button>
            </Tooltip>
          </Stack>
          {/* <AlertStoryDelete title={story.title} open={openModal} handleClose={handleModalClose} /> */}
          {/* </Grid> */}
        </SimpleBar>
      )}
    </Drawer>
  );
};

export default Filter;
