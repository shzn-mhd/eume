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
    "Accommodation Type": "accommodationType", 
    "Transportation Reason":"transportationReason",
    "Activity Reason":"activityReason",
    "Accommodation": "lodging",
    "Shopping" :"retailers",
    "Signposting" :"signaling",
    "Value for money":"quality_price_ratio",
    "Optional Feedback":"optionalFeedback",

    "actividad":"activity",
    "motivo_de_la_actividad":"activityReason",
    "age":"edad",
    "modalidad" : "modality",
    "número_de_personas" : "noOfPeople", 
    "lugar_de_origen":"placeOfOrigin",
    "pasar_la_noche":"stayOvernight",
    "motivo_del_transporte": "transportationReason",
      "accesibilidad" : "accessibility",
      "comentarios_opcionales" : "optionalFeedback",
      "conservación_y_limpieza" : "cleaning_conservation",
      "evaluación_general" : "general_assessment",
      "fecha" : "date",
      "minoristas" : "retailers",
      "municipio" : "municipality",
      "ofertas_culturales" : "cultural_offerings",
      "relación_calidad-precio" : "quality_price_ratio",
      "servicios_de_banquetería" : "catering_services",
      "señalización" : "signaling",
      "sostenibilidad" : "sustainability",
    "accesibilidade" : "accessibility",
    "aloxamento" : "lodging",
    "comentarios_opcionais" : "optionalFeedback",
    "conservación_da_limpeza" : "cleaning_conservation",
    "avaliación_xeral" : "general_assessment",

    "información_turística" : "tourist_information",
    "comerciantes" : "retailers",
    "ofertas_culturais" : "cultural_offerings",
    "relación_calidade-prezo" : "quality_price_ratio",
    "servizos_de_catering" : "catering_services",
    "sinalización" : "signaling",
    "sustentabilidade" : "sustainability",
    "alojamiento": "accommodationType",
    "actividade":"activity",
    "razón_da_actividade":"activityReason",
    "idade":"age",
    "data":"date",
    "sexo": "gender",
    "idioma":"language",
    "modalidade" : "modality",
    "motivación": "motivation",
    "concello" : "municipality",
    "nº_de_días" : "noOfDays",
    "número_de_persoas" : "noOfPeople", 
    "lugar_de_orixe":"placeOfOrigin",
    "provincia":"province",
    "razón":"reason",
    "pernoctar":"stayOvernight",
    "lugar_de_estancia":"stayPlace",
    "transporte": "transportation",
    "medio_de_transporte": "transportationReason",
    "con_mascota":"withPet",

      
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
            // const transformedRow = {};
            // for (const key in row) {
            //   if (row.hasOwnProperty(key)) {
            //     const transformedKey = transformKey(key);
            //     transformedRow[transformedKey] = row[key];
            //   }
            // }
           
            // Check if the transformedRow is not empty
            // if (Object.keys(transformedRow).length > 0) {
            //   await addDoc(collectionRef, transformedRow);
            // }
          }

          // Store the parsed data in local storage
          localStorage.setItem('csvImportData', JSON.stringify(data));

          // Start the batch upload process
          await uploadBatch(0);

          alert('Data import process started. Check console for progress.');
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

  const uploadBatch = async (startIndex) => {
    const batchSize = 100; // Adjust this value based on your needs
    const data = JSON.parse(localStorage.getItem('csvImportData'));

    if (!data || startIndex >= data.length) {
      console.log('Import completed');
      localStorage.removeItem('csvImportData');
      return;
    }

    const batch = data.slice(startIndex, startIndex + batchSize);

    try {
      for (const row of batch) {
        const transformedRow = {};
        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            const transformedKey = transformKey(key);
            transformedRow[transformedKey] = row[key];
          }
        }

        if (Object.keys(transformedRow).length > 0) {
          await addDoc(collectionRef, transformedRow);
        }
      }

      console.log(`Uploaded batch ${startIndex} to ${startIndex + batch.length}`);

      // Schedule the next batch
      setTimeout(() => uploadBatch(startIndex + batchSize), 1000); // 1 second delay between batches
    } catch (error) {
      console.error('Error uploading batch: ', error);
    }
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






