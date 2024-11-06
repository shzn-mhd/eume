import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import { Autocomplete, FormControl, Stack, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';
import countryList from 'data/country';
import provinceList from 'data/province';
import ageList from 'data/age';
import motivationList from 'data/motivation';
import modalityList from 'data/modality';
import stayList from 'data/stay';
import accList from 'data/accomodation';
import transList from 'data/transport';
import { t } from 'i18next';

const FilterModal = ({
  onClose,
  selectedAcc,
  setSelectedAcc,

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
  
  selectedTrans,
  setSelectedTrans,

  selectedPeopleMin,
  setSelectedPeopleMin,
  selectedPeopleMax,
  setSelectedPeopleMax,

  selectedDayStayMin,
  setSelectedDayStayMin,
  selectedDayStayMax,
  setSelectedDayStayMax,
}) => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('md'));
  const gender = ['Male', 'Female'];
  const pet = ['Yes', 'No'];
  const stay = ['Yes', 'No'];
  const day = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <MainCard
      sx={{
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'grey.0',
        borderRadius: '0 4px 4px 0',
        borderLeft: 'none'
      }}
      content={false}
      title="Filters"
    >
      {onClose && (
        <IconButton size="small" sx={{ position: 'absolute', right: 8, top: 8 }} onClick={onClose} color="error">
          <CloseOutlined />
        </IconButton>
      )}
      <Stack direction="column" spacing={2} justifyContent="center" sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <FormControl style={{ width: '220px' }}>
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
          
          <FormControl style={{ width: '220px' }}>
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

          <FormControl style={{ width: '220px' }}>
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

          <FormControl style={{ width: '220px' }}>
            <TextField
              id="peopleMin"
              label={t("Min People")}
              type="number"
              value={selectedPeopleMin}
              onChange={(e) => e.target.value >= 0 && setSelectedPeopleMin(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{
                borderRadius: '4px',
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.customShadows.primary,
                border: `1px solid ${theme.palette.primary.main}`
              }}
            />
          </FormControl>

          <FormControl style={{ width: '220px' }}>
            <TextField
              id="peopleMax"
              label={t("Max People")}
              type="number"
              value={selectedPeopleMax}
              onChange={(e) => e.target.value >= 0 && setSelectedPeopleMax(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{
                borderRadius: '4px',
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.customShadows.primary,
                border: `1px solid ${theme.palette.primary.main}`
              }}
            />
          </FormControl>

          <FormControl style={{ width: '220px' }}>
              <TextField
                id="dayStayMin"
                label={t("Min Days")}
                type="number"
                value={selectedDayStayMin}
                onChange={(e) => e.target.value >= 0 && setSelectedDayStayMin(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
                sx={{
                  borderRadius: '4px',
                  bgcolor: theme.palette.background.paper,
                  boxShadow: theme.customShadows.primary,
                  border: `1px solid ${theme.palette.primary.main}`
                }}
              />
            </FormControl>

            <FormControl style={{ width: '220px' }}>
              <TextField
                id="dayStayMax"
                label={t("Max Days")}
                type="number"
                value={selectedDayStayMax}
                onChange={(e) => e.target.value >= 0 && setSelectedDayStayMax(e.target.value)}
                InputProps={{ inputProps: { min: 0 } }}
                sx={{
                  borderRadius: '4px',
                  bgcolor: theme.palette.background.paper,
                  boxShadow: theme.customShadows.primary,
                  border: `1px solid ${theme.palette.primary.main}`
                }}
              />
            </FormControl>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center">
          <FormControl style={{ width: '220px' }}>
            <Autocomplete
              id="age"
              options={ageList}
              getOptionLabel={(option) => option}
              value={ageList.find((option) => option === selectedAge.toString()) || null}
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
          <FormControl style={{ width: '220px' }}>
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
          <FormControl style={{ width: '220px' }}>
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
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center">
          <FormControl style={{ width: '220px' }}>
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
          <FormControl style={{ width: '220px' }}>
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
          <FormControl style={{ width: '220px' }}>
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
              renderInput={(params) => <TextField {...params} label="Stay List" />}
            />
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center">
          {/* <FormControl style={{ width: '220px' }}>
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
          </FormControl> */}
          <FormControl style={{ width: '220px' }}>
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

          <FormControl style={{ width: '220px' }}>
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
        </Stack>

      </Stack>
    </MainCard>
  );
};

FilterModal.propTypes = {
  onClose: PropTypes.func
};

export default FilterModal;
