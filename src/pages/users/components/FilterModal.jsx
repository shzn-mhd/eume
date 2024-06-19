import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import { Autocomplete, Button, DialogTitle, FormControl, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';
import countryList from 'data/country';
import provinceList from 'data/province';
import {InputLabel} from '@mui/material'

const FilterModal = ({ 
    onClose,
    selectedAcc,
    setSelectedAcc,
 }) => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('md'));
  const gender = ['Muller', 'Viro'];
  const acc = ['1','2','3','4','5'];

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
        <FormControl style={{ display:'flex' }}>
          {/* <InputLabel htmlFor="acc">Accomodation</InputLabel> */}
          <Typography variant='h5'>Accomodation</Typography>
          <Stack direction='row'>
          {acc.map((accOption) => (
              <Button 
                id="acc"
                key={accOption}
                getOptionLabel={(option) => option}
                value={acc.find((option) => option === selectedAcc) || null}
                onChange={(event, newValue) => {
                  setSelectedAcc(newValue ? newValue : null);
                }}
                variant='contained'
                size='small'
                // color={selectedAcc === accOption ? 'primary' : 'default'}
                onClick={() => setSelectedAcc(accOption)}
                sx={{ marginRight: 1, marginTop: 3}}
              >
                {accOption}
              </Button>
            ))}
          </Stack>
            
        </FormControl>
      </Stack>
    </MainCard>
  );
};

FilterModal.PropTypes = {
  onClose: PropTypes.func
};

export default FilterModal;
