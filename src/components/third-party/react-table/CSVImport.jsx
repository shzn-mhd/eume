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




  const transformKey = (key) => {
    const specialCases = {
     
      "Place of Origin":"placeOfOrigin",
         "No of People": "noOfPeople",
"With Pet":"withPet",
"Stay Overnight":"stayOvernight",
"Stay Place":"stayPlace",
"No of Days":"noOfDays",
"Accommodation Type" : "accommodationType", //basic survey
"Transportation Reason":"transportationReason",
"Activity Reason":"activityReason",

 "Accommodation" : "lodging",  // optional survey
"Shopping" :"retailers",
"Signposting" :"signaling",
"Value for money":"quality_price_ratio",
"Optional Feedback":"optionalFeedback",
      // Add more special cases here if needed
    };
  
    if (specialCases[key]) {
      return specialCases[key]; // Return the special transformation if it matches
    }
    // Check if the key has only one word
    if (!key.includes(' ')) {
      return key.toLowerCase(); // Convert to lowercase if it's a single word
    }
    
    // Convert multi-word keys to lowercase and replace spaces with underscores
    return key.toLowerCase().replace(/\s+/g, '_');
  };

  // const handleImport = () => {
  //   if (!file) return;

  //   Papa.parse(file, {
  //     header: true,
  //     complete: async (results) => {
  //       const data = results.data;
  //       console.log('Parsed CSV Data:', data); // Log parsed data
  //       try {
  //         for (const row of data) {
  //           await addDoc(collectionRef, row);
  //         }
  //         alert('Data successfully imported!');
  //         onImportComplete();
  //       } catch (error) {
  //         console.error('Error adding document: ', error);
  //         alert('Error importing data.');
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error parsing CSV: ', error);
  //       alert('Error parsing CSV.');
  //     }
  //   });
  // };

  const handleImport = () => {
    if (!file) return;
  
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const data = results.data;
        console.log('Parsed CSV Data:', data); // Log parsed data
  
        try {
          for (const row of data) {
            // Transform row keys
            const transformedRow = {};
            for (const key in row) {
              if (row.hasOwnProperty(key)) {
                const transformedKey = transformKey(key);
                transformedRow[transformedKey] = row[key];
              }
            }
           
            // await addDoc(collectionRef, transformedRow);
            // Check if the transformedRow is not empty
          if (Object.keys(transformedRow).length > 0) {
            await addDoc(collectionRef, transformedRow);
          }
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






