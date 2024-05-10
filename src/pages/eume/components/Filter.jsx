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

const Filter = ({
  open,
  empList,
  handleDrawerOpen,
  selectedGender,
  setSelectedGender,
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
  setSelectedTrans
}) => {
  const theme = useTheme();
  const gender = ['Muller', 'Viro'];
  const pet = ['Yes', 'No'];
  const stay = ['Yes', 'No'];
  const day = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
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
          maxHeight: '620px'
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
                    Filtering Options
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
                Total Visiters
              </Typography>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="h4" color="inherit">
                    {empList.length}
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </MainCard>
          </Stack>
          
          <Box sx={{ p: 2, maxHeight:'50vh', overflowY:'auto' }}>
            <Stack direction="column" spacing={2}>
              <Grid container gap={1}>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="country"
                      options={countryList}
                      getOptionLabel={(option) => option}
                      value={countryList.find((option) => option === selectedCountry) || null}
                      onChange={(event, newValue) => {
                        setSelectedCountry(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper,
                      }}
                      renderInput={(params) => <TextField {...params} label="Country" />}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="province"
                      options={provinceList}
                      getOptionLabel={(option) => option}
                      value={provinceList.find((option) => option === selectedProvince) || null}
                      onChange={(event, newValue) => {
                        setSelectedProvince(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper,
                      }}
                      renderInput={(params) => <TextField {...params} label="Province" />}
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
                      getOptionLabel={(option) => option}
                      value={gender.find((option) => option === selectedGender) || null}
                      onChange={(event, newValue) => {
                        setSelectedGender(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper,
                      }}
                      renderInput={(params) => <TextField {...params} label="Gender" />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
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
                      }}
                      renderInput={(params) => <TextField {...params} label="Age" />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container gap={1}>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="motivation"
                      options={motivationList}
                      getOptionLabel={(option) => option}
                      value={motivationList.find((option) => option === selectedMotivation) || null}
                      onChange={(event, newValue) => {
                        setSelectedMotivation(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper,
                      }}
                      renderInput={(params) => <TextField {...params} label="Motivation" />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="modality"
                      options={modalityList}
                      getOptionLabel={(option) => option}
                      value={modalityList.find((option) => option === selectedModality) || null}
                      onChange={(event, newValue) => {
                        setSelectedModality(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper,
                      }}
                      renderInput={(params) => <TextField {...params} label="Modality" />}
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
                      getOptionLabel={(option) => option}
                      value={pet.find((option) => option === selectedPet) || null}
                      onChange={(event, newValue) => {
                        setSelectedPet(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper,
                      }}
                      renderInput={(params) => <TextField {...params} label="Pet" />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="stayOvernight"
                      options={stay}
                      getOptionLabel={(option) => option}
                      value={stay.find((option) => option === selectedStay) || null}
                      onChange={(event, newValue) => {
                        setSelectedStay(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper,
                      }}
                      renderInput={(params) => <TextField {...params} label="Stay" />}
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
                      getOptionLabel={(option) => option}
                      value={stayList.find((option) => option === selectedStayList) || null}
                      onChange={(event, newValue) => {
                        setSelectedStayList(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper,
                      }}
                      renderInput={(params) => <TextField {...params} label="Place" />}
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
                        bgcolor: theme.palette.background.paper,
                      }}
                      renderInput={(params) => <TextField {...params} label="Stay Day" />}
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
                      getOptionLabel={(option) => option}
                      value={accList.find((option) => option === selectedAcc) || null}
                      onChange={(event, newValue) => {
                        setSelectedAcc(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper,
                      }}
                      renderInput={(params) => <TextField {...params} label="Accomodation" />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={5.8}>
                  <FormControl fullWidth>
                    <Autocomplete
                      id="transportation"
                      options={transList}
                      getOptionLabel={(option) => option}
                      value={transList.find((option) => option === selectedTrans) || null}
                      onChange={(event, newValue) => {
                        setSelectedTrans(newValue ? newValue : null);
                      }}
                      sx={{
                        borderRadius: '4px',
                        bgcolor: theme.palette.background.paper,
                      }}
                      renderInput={(params) => <TextField {...params} label="Transportation" />}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Stack>
          </Box>
          <Divider />
          <Stack direction="row" alignItems="center" spacing={2} justifyContent='space-between' padding={2}>
            <Tooltip title="Reset Filter">
              <Button
                size="small"
                sx={{ minWidth: '130px', minHeight: '41.13px' }}
                color="error"
                variant="contained"
              >
                Reset Filter
              </Button>
            </Tooltip>
            <Tooltip title="Filter">
              <Button
                size="small"
                sx={{ minWidth: '130px', minHeight: '41.13px' }}
                color="primary"
                variant="contained"
                onClick={handleDrawerOpen}
              >
                Filter
              </Button>
            </Tooltip>
          </Stack>
        </SimpleBar>
      )}
    </Drawer>
  );
};

export default Filter;
