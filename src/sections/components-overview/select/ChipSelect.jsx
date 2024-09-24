import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Chip, InputLabel, MenuItem, OutlinedInput, Stack, Select } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  };
}

// ==============================|| COMPONENTS - CHIP ||============================== //

export default function ChipSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = useState(['Van Henry', 'Kelly Snyder']);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const chipSelectCodeString = `// ChipSelect.tsx
  <Stack spacing={1}>
    <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
    <Select
      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      value={personName}
      onChange={handleChange}
      input={<OutlinedInput id="select-multiple-chip" placeholder="Chip" />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value} label={value} variant="light" color="primary" size="small" />
          ))}
        </Box>
      )}
      MenuProps={MenuProps}
    >
      {names.map((name) => (
        <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
          {name}
        </MenuItem>
      ))}
    </Select>
  </Stack>`;

  return (
    <MainCard title="With Chip" codeString={chipSelectCodeString}>
      <Stack spacing={1}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" placeholder="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} variant="light" color="primary" size="small" />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </MainCard>
  );
}
