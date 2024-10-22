import { useEffect, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { DownloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

const UserRolesCSVExport = ({ data, filename = 'data.csv', headers }) => {
  const [csvData, setCsvData] = useState('');
   const theme = useTheme();

  const flattenPermissions = (permissions) => {
    if (!permissions) return {};
    
    const flattened = {};
    Object.entries(permissions).forEach(([section, perms]) => {
      // Handle Basic Survey and Optional Survey sections
      if (section === 'Basic Survey' || section === 'Optional Survey') {
        flattened[`${section}_View`] = perms.view ? 'Yes' : 'No';
        flattened[`${section}_Add`] = perms.add ? 'Yes' : 'No';
        flattened[`${section}_Edit`] = perms.edit ? 'Yes' : 'No';
        flattened[`${section}_Delete`] = perms.delete ? 'Yes' : 'No';
        flattened[`${section}_Export`] = perms.exportData ? 'Yes' : 'No';
        flattened[`${section}_Import`] = perms.importData ? 'Yes' : 'No';
      }
      // Handle Users and Roles sections
      else if (section === 'Users' || section === 'Roles') {
        flattened[`${section}_View`] = perms.view ? 'Yes' : 'No';
        flattened[`${section}_Add`] = perms.add ? 'Yes' : 'No';
        flattened[`${section}_Edit`] = perms.edit ? 'Yes' : 'No';
        flattened[`${section}_Delete`] = perms.delete ? 'Yes' : 'No';
      }
    });
    return flattened;
  };

  const processDataForCSV = (rawData) => {
    return rawData.map(row => {
      const flattenedPermissions = flattenPermissions(row.permissions);
      return {
        Role: row.roleName,
        Status: row.roleStatus,
        ...flattenedPermissions
      };
    });
  };

  const generateHeaders = () => {
    return [
      { label: 'Role', key: 'Role' },
      { label: 'Status', key: 'Status' },
      // Basic Survey headers
      { label: 'Basic Survey - View', key: 'Basic Survey_View' },
      { label: 'Basic Survey - Add', key: 'Basic Survey_Add' },
      { label: 'Basic Survey - Edit', key: 'Basic Survey_Edit' },
      { label: 'Basic Survey - Delete', key: 'Basic Survey_Delete' },
      { label: 'Basic Survey - Export', key: 'Basic Survey_Export' },
      { label: 'Basic Survey - Import', key: 'Basic Survey_Import' },
      // Optional Survey headers
      { label: 'Optional Survey - View', key: 'Optional Survey_View' },
      { label: 'Optional Survey - Add', key: 'Optional Survey_Add' },
      { label: 'Optional Survey - Edit', key: 'Optional Survey_Edit' },
      { label: 'Optional Survey - Delete', key: 'Optional Survey_Delete' },
      { label: 'Optional Survey - Export', key: 'Optional Survey_Export' },
      { label: 'Optional Survey - Import', key: 'Optional Survey_Import' },
      // Users headers
      { label: 'Users - View', key: 'Users_View' },
      { label: 'Users - Add', key: 'Users_Add' },
      { label: 'Users - Edit', key: 'Users_Edit' },
      { label: 'Users - Delete', key: 'Users_Delete' },
      // Roles headers
      { label: 'Roles - View', key: 'Roles_View' },
      { label: 'Roles - Add', key: 'Roles_Add' },
      { label: 'Roles - Edit', key: 'Roles_Edit' },
      { label: 'Roles - Delete', key: 'Roles_Delete' }
    ];
  };

  useEffect(() => {
    const processedData = processDataForCSV(data);
    const csvHeaders = generateHeaders();
    
    // Create CSV content
    const headerRow = csvHeaders.map(header => `"${header.label}"`).join(',');
    const dataRows = processedData.map(row => {
      return csvHeaders.map(header => {
        const value = row[header.key] || '';
        return `"${value}"`;
      }).join(',');
    });
    
    setCsvData(`${headerRow}\n${dataRows.join('\n')}`);
  }, [data]);

  const downloadCSV = () => {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    // <Button
    //   size="small"
    //   sx={{ minWidth: '130px', minHeight: '41.13px' }}
    //   color="secondary"
    //   variant="contained"
    //   startIcon={<DownloadOutlined />}
    //   onClick={downloadCSV}
    //   disabled={!data.length}
    // >
    //   Export CSV
    // </Button>

    <Tooltip title="CSV Export" onClick={downloadCSV}>
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
  );
};

UserRolesCSVExport.propTypes = {
  data: PropTypes.array.isRequired,
  filename: PropTypes.string,
  headers: PropTypes.array
};

export default UserRolesCSVExport;
