

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Tooltip, Button, Box } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import { collection, addDoc } from 'firebase/firestore';

const CSVImport = ({ collectionRef, headers,onImportComplete }) => {
  const theme = useTheme();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const data = results.data;
        console.log('Parsed CSV Data:', data); // Log parsed data
        try {
          for (const row of data) {
            await addDoc(collectionRef, row);
          }
          alert('Data successfully imported!');
          onImportComplete();
        } catch (error) {
          console.error('Error adding document: ', error);
          alert('Error importing data.');
        }
      },
      error: (error) => {
        console.error('Error parsing CSV: ', error);
        alert('Error parsing CSV.');
      }
    });
  };

  return (
    <Box>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="csv-upload-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="csv-upload-file">
        <Tooltip title="CSV Import">
          <Button
            component="span"
          >
            <UploadOutlined style={{ fontSize: '24px', color: theme.palette.text.secondary, marginTop: 4, marginRight: 4, marginLeft: 0 }}/>
          </Button>
        </Tooltip>
      </label>
      {file && <Button onClick={handleImport}>Upload</Button>}
    </Box>
  );
};

CSVImport.propTypes = {
  collectionRef: PropTypes.object.isRequired,
  headers: PropTypes.array,
  onImportComplete: PropTypes.func.isRequired,
};

export default CSVImport;



