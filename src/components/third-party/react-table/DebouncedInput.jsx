import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';

// ==============================|| FILTER - INPUT ||============================== //

export const DebouncedInput = ({
  value: initialValue,
  onFilterChange,
  debounce = 500,
  size,
  startAdornment = <SearchOutlined />,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = (event) => setValue(event.target.value);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [value]);

  return (
    <OutlinedInput
      {...props}
      value={value}
      onChange={handleInputChange}
      sx={{ minWidth: 100 }}
      {...(startAdornment && { startAdornment })}
      {...(size && { size })}
    />
  );
};

DebouncedInput.propTypes = {
  filename: PropTypes.string,
  data: PropTypes.array,
  value: PropTypes.string,
  onFilterChange: PropTypes.func,
  debounce: PropTypes.number,
  size: PropTypes.string,
  startAdornment: PropTypes.node
};

export default DebouncedInput;
