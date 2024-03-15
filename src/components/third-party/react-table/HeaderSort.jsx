import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';

// assets
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const SortType = {
  ASC: 'asc',
  DESC: 'desc'
};

const SortToggler = ({ type }) => {
  const theme = useTheme();
  return (
    <Stack sx={{ color: 'secondary.light' }}>
      <CaretUpOutlined
        style={{
          fontSize: '0.625rem',
          color: type === SortType.ASC ? theme.palette.text.secondary : 'inherit'
        }}
      />
      <CaretDownOutlined
        style={{
          fontSize: '0.625rem',
          marginTop: -2,
          color: type === SortType.DESC ? theme.palette.text.secondary : 'inherit'
        }}
      />
    </Stack>
  );
};

SortToggler.propTypes = {
  type: PropTypes.string
};

// ==============================|| SORT HEADER ||============================== //

const HeaderSort = ({ column, sort }) => {
  return (
    <Box {...(sort && { onClick: column.getToggleSortingHandler(), className: 'cursor-pointer prevent-select' })}>
      {{
        asc: <SortToggler type={SortType.ASC} />,
        desc: <SortToggler type={SortType.DESC} />
      }[column.getIsSorted()] ?? <SortToggler />}
    </Box>
  );
};

HeaderSort.propTypes = {
  column: PropTypes.object,
  sort: PropTypes.bool,
  getToggleSortingHandler: PropTypes.func,
  getIsSorted: PropTypes.func
};

export default HeaderSort;
