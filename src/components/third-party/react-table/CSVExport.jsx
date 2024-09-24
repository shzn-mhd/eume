import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Tooltip } from '@mui/material';
import { CSVLink } from 'react-csv';
import { DownloadOutlined } from '@ant-design/icons';

// Function to filter out the id field
const filterData = (data) => {
  return data.map(({ id, ...rest }) => rest);
};

// ==============================|| CSV EXPORT ||============================== //

const CSVExport = ({ data, filename, headers }) => {
  const theme = useTheme();
  const filteredData = filterData(data);

  return (
    <CSVLink data={filteredData} filename={filename} headers={headers}>
      <Tooltip title="CSV Export">
        <DownloadOutlined
          style={{
            fontSize: '24px',
            color: theme.palette.text.secondary,
            marginTop: 4,
            marginRight: 4,
            marginLeft: 4
          }}
        />
      </Tooltip>
    </CSVLink>
  );
};

CSVExport.propTypes = {
  filename: PropTypes.string,
  data: PropTypes.array,
  headers: PropTypes.array
};

export default CSVExport;
