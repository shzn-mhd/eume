import { useState } from 'react';

// material-ui
import { FormHelperText, InputLabel, MenuItem, Select, Stack } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| COMPONENTS - HELPER TEXT ||============================== //

export default function HelperTextSelect() {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const helperSelectCodeString = `<Stack spacing={1}>
  <InputLabel id="demo-simple-select-helper-label">Number</InputLabel>
  <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={age} onChange={handleChange}>
    <MenuItem value="">
      <em>Select Number</em>
    </MenuItem>
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
  <FormHelperText>helper text</FormHelperText>
</Stack>`;

  return (
    <MainCard title="With Helper Text" codeString={helperSelectCodeString}>
      <Stack spacing={1}>
        <InputLabel id="demo-simple-select-helper-label">Number</InputLabel>
        <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={age} onChange={handleChange}>
          <MenuItem value="">
            <em>Select Number</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>helper text</FormHelperText>
      </Stack>
    </MainCard>
  );
}
