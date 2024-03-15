import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Stack } from '@mui/material';

// project-import
import DebouncedInput from './DebouncedInput';

// assets
import { MinusOutlined } from '@ant-design/icons';

// ==============================|| FILTER - NUMBER FIELD ||============================== //

const NumberInput = ({ columnFilterValue, getFacetedMinMaxValues, setFilterValue }) => {
  const minOpt = getFacetedMinMaxValues()?.[0];
  const min = Number(minOpt ?? '');

  const maxOpt = getFacetedMinMaxValues()?.[1];
  const max = Number(maxOpt);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <DebouncedInput
        type="number"
        value={columnFilterValue?.[0] ?? ''}
        onFilterChange={(value) => setFilterValue((old) => [value, old?.[1]])}
        placeholder={`Min ${minOpt ? `(${min})` : ''}`}
        fullWidth
        inputProps={{ min: min, max: max }}
        size="small"
        startAdornment={false}
      />
      <>
        <MinusOutlined />
      </>
      <DebouncedInput
        type="number"
        value={columnFilterValue?.[1] ?? ''}
        onFilterChange={(value) => setFilterValue((old) => [old?.[0], value])}
        placeholder={`Max ${maxOpt ? `(${max})` : ''}`}
        fullWidth
        inputProps={{ min: min, max: max }}
        size="small"
        startAdornment={false}
      />
    </Stack>
  );
};

NumberInput.propTypes = {
  columnFilterValue: PropTypes.array,
  getFacetedMinMaxValues: PropTypes.func,
  setFilterValue: PropTypes.func
};

// ==============================|| FILTER - TEXT FIELD ||============================== //

const TextInput = ({ columnId, columnFilterValue, header, setFilterValue }) => {
  const dataListId = columnId + 'list';

  return (
    <DebouncedInput
      type="text"
      fullWidth
      value={columnFilterValue ?? ''}
      onFilterChange={(value) => setFilterValue(value)}
      placeholder={`Search ${header}`}
      inputProps={{ list: dataListId }}
      size="small"
      startAdornment={false}
    />
  );
};

TextInput.propTypes = {
  columnId: PropTypes.string,
  columnFilterValue: PropTypes.string,
  header: PropTypes.string,
  setFilterValue: PropTypes.func
};

// ==============================|| FILTER - INPUT ||============================== //

export function Filter({ column, table }) {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();
  const uniqueValues = column.getFacetedUniqueValues();

  const sortedUniqueValues = useMemo(
    () => (typeof firstValue === 'number' ? [] : Array.from(uniqueValues.keys()).sort()),
    // eslint-disable-next-line
    [uniqueValues]
  );

  return typeof firstValue === 'number' ? (
    <NumberInput
      columnFilterValue={columnFilterValue}
      getFacetedMinMaxValues={column.getFacetedMinMaxValues}
      setFilterValue={column.setFilterValue}
    />
  ) : (
    <TextInput
      columnId={column.id}
      columnFilterValue={columnFilterValue}
      setFilterValue={column.setFilterValue}
      sortedUniqueValues={sortedUniqueValues}
      header={column.columnDef.header}
    />
  );
}
Filter.propTypes = {
  column: PropTypes.object,
  table: PropTypes.object,
  header: PropTypes.string,
  setFilterValue: PropTypes.func,
  getPreFilteredRowModel: PropTypes.func,
  id: PropTypes.number,
  getFilterValue: PropTypes.func,
  getFacetedUniqueValues: PropTypes.func,
  getFacetedMinMaxValues: PropTypes.func,
  columnDef: PropTypes.func
};
export default Filter;
