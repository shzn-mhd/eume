import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { InputLabel, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';

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

// ==============================|| COMPONENTS - MULTI-SELECT ||============================== //

export default function MultipleSelect() {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const multipleSelectCodeString = `// MultipleSelect.tsx
  <Stack spacing={1}>
    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
    <Select
      labelId="demo-multiple-name-label"
      id="demo-multiple-name"
      multiple
      value={personName}
      onChange={handleChange}
      input={<OutlinedInput label="Name" />}
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
    <MainCard title="Multiple" codeString={multipleSelectCodeString}>
      <Stack spacing={1}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
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
