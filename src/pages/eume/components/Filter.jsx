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
          width: { xs: 320, md: 300 },
          border: 'none',
          borderRadius: '0px'
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
          <Box sx={{ p: 3 }}>
            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
              {/* <Stack direction="row" justifyContent="space-between" width="100%"> */}
                <Grid item  sx={{width: '100%'}}
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
                      Filters
                    </Typography>
                    <Tooltip title="Close">
                      <IconButton color="secondary" onClick={handleDrawerOpen} size="small" sx={{ fontSize: '0.875rem' }}>
                        <CloseOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Grid>

                <Grid item sx={{width:'100%'}}>
                  <Stack direction="row" alignItems="center" spacing={2} justifyContent='flex-end'>
                    <Tooltip title="Reset Filter">
                      <Button
                        size="small"
                        sx={{ minWidth: '130px', minHeight: '41.13px' }}
                        color="error"
                        variant="contained"
                        // onClick={() => ResetTable()}
                      >
                        Reset Filter
                      </Button>
                    </Tooltip>
                    
                  </Stack>
                  {/* <AlertStoryDelete title={story.title} open={openModal} handleClose={handleModalClose} /> */}
                </Grid>
              {/* </Stack> */}
            </Grid>
          </Box>
          <Divider />
          <Box sx={{ p: 3 }}>
            <Stack direction="column" spacing={2}>
              {/* <Stack direction="row" spacing={2} justifyContent="center"> */}
                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Country" />}
                  />
                </FormControl>
                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Province" />}
                  />
                </FormControl>
                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Gender" />}
                  />
                </FormControl>
              {/* </Stack> */}
              {/* <Stack direction="row" spacing={2} justifyContent="center"> */}
                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Age" />}
                  />
                </FormControl>
                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Motivation" />}
                  />
                </FormControl>
                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Modality" />}
                  />
                </FormControl>
              {/* </Stack> */}

              {/* <Stack direction="row" spacing={2} justifyContent="center"> */}
                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Pet" />}
                  />
                </FormControl>
                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Stay" />}
                  />
                </FormControl>
                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Place" />}
                  />
                </FormControl>
              {/* </Stack> */}
              {/* <Stack direction="row" spacing={2} justifyContent="center"> */}
                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Stay Day" />}
                  />
                </FormControl>
                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Accomodation" />}
                  />
                </FormControl>

                <FormControl >
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
                      boxShadow: theme.customShadows.primary,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    renderInput={(params) => <TextField {...params} label="Transportation" />}
                  />
                </FormControl>
              {/* </Stack> */}
            </Stack>
          </Box>
        </SimpleBar>
      )}
    </Drawer>
  );
};

export default Filter;
