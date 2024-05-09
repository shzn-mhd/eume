import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import { Autocomplete, FormControl, Stack, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';
import countryList from 'data/country';
import provinceList from 'data/province';

const FilterModal = ({ 
    onClose,
    selectedGender,
    setSelectedGender,
    selectedCountry,
    setSelectedCountry,
    selectedProvince,
    setSelectedProvince
 }) => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('md'));
  const gender = ['Muller', 'Viro'];

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
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ p: 3 }}>
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
      </Stack>
    </MainCard>
  );
};

FilterModal.PropTypes = {
  onClose: PropTypes.func
};

export default FilterModal;
