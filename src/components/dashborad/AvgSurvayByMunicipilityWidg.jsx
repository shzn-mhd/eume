// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// import { db } from 'config/firebase';
// import useAuth from 'hooks/useAuth';
// import { useTranslation } from 'react-i18next';

// import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore';
// import { useEffect, useState } from 'react';

// const dataFieldKey = [
//   'accessibility',
//   'catering_services',
//   'cleaning_conservation',
//   'cultural_offerings',
//   'general_assessment',
//   'lodging',
//   'optionalFeedback',
//   'quality_price_ratio',
//   'retailers',
//   'signaling',
//   'sustainability',
//   'tourist_information'
// ];

// const AvgSurvayByMunicipilityWidg = () => {
//   //   const municipalities = ['A Capela', 'As Pontes', 'Cabanas', 'Monfero', 'Pontedeume'];
//   const [municipalities, setMunicipalities] = useState([]);
//   const survayData = collection(db, 'optional_survey_data');
//   const { user } = useAuth();
//   const [rows, setRows] = useState([]);

//   const { t, i18n } = useTranslation();

//   const fetchMunicipalities = async (roleIds) => {
//     const municipalities = new Set();
//     for (const roleId of roleIds) {
//       const roleDoc = await getDoc(doc(db, 'roles', roleId));
//       if (roleDoc.exists()) {
//         const roleData = roleDoc.data();
//         if (Array.isArray(roleData.municipality)) {
//           roleData.municipality.forEach((municipality) => municipalities.add(municipality));
//         }
//       }
//     }
//     return Array.from(municipalities);
//   };

//   useEffect(() => {
//     setUserMunicipalities();
//   }, [user?.role]);

//   const setUserMunicipalities = async () => {
//     const municipalities = await fetchMunicipalities(user?.role);
//     setMunicipalities(municipalities);
//   };

//   useEffect(() => {
//     const getEmpList = async () => {
//       try {
//         const data = await getDocs(survayData);
//         const filteredData = data.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id
//         }));

//         const groupedData = filteredData.reduce((acc, item) => {
//           if (!acc[item.municipality]) {
//             acc[item.municipality] = [];
//           }
//           acc[item.municipality].push(item);
//           return acc;
//         }, {});

//         let result = {};
//         for (const municipality in groupedData) {
//           result[municipality] = {};
//           for (const field of dataFieldKey) {
//             const sum = groupedData[municipality].reduce((acc, item) => acc + item[field], 0);
//             result[municipality][field] = sum / groupedData[municipality].length;
//           }
//         }
//         // remove undefined key from result
//         delete result.undefined;
//         const preparedRows = prepareRows(result);
//         setRows(preparedRows);
//         console.log('Result', result);
//       } catch (err) {
//         console.log(err);
//         console.log('SearchedData Error', err);
//       }
//     };

//     getEmpList();
//   }, [user?.role, municipalities]);

//   const prepareRows = (data) => {
//     // expected rowsData = [["accessibility", 3.75, 3],["catering_services", 3.25, 2.5],["cleaning_conservation", 3.25, 2.5],["cultural_offerings", 3.75, 2.5],["general_assessment", 3.5, 2.5],["lodging", 3.5, 2],["optionalFeedback", 0, 0],["quality_price_ratio", 3.75, 3.5],["retailers", 3.75, 2],["signaling", 3.75, 2],["sustainability", 3.75, 3],["tourist_information", 3.75, 2.5]]
//     const rowsData = [];
//     if (municipalities.length === 0) return rowsData;
//     for (const field of dataFieldKey) {
//       console.log('Looping 1');
//       const row = [field];
//       console.log('Municipalities', municipalities);

//       municipalities.forEach((municipality) => {
//         if (data[municipality]) {
//           row.push(data[municipality][field] || 0);
//         } else row.push(0);
//       });
   
//       rowsData.push(row);
//     }
//     return rowsData;
//   };


//   const getSurveyFieldName = (field) => {
//     switch (field) {
//       case 'accessibility':
//         return t('Accessibility');
//       case 'catering_services':
//         return t('Catering Services');
//       case 'cleaning_conservation':
//         return t('Cleaning Conservation');
//       case 'cultural_offerings':
//         return t('Cultural Offerings');
//       case 'general_assessment':
//         return t('General Assessment');
//       case 'lodging':
//         return t('Lodging');
//       case 'optionalFeedback':
//         return t('Optional Feedback');
//       case 'quality_price_ratio':
//         return t('Quality Price Ratio');
//       case 'retailers':
//         return t('Retailers');
//       case 'signaling':
//         return t('Signaling');
//       case 'sustainability':
//         return t('Sustainability');
//       case 'tourist_information':
//         return t('Tourist Information');
//       default:
//         return field;
//     }
//   }

  

//   return (
//     <TableContainer component={Paper} sx={{ width: '100%', height: "400px" }}>
//       <Table sx={{ width: '100%' }} aria-label="municipility avg data">
//         <TableHead>
//           <TableRow>
//             <TableCell></TableCell>
//             {municipalities.map((municipality) => (
//               <TableCell>{municipality}</TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, i) => (
//             <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//               {row.map((cell, i) => (
//                 // remove underscore from cell and capitalize first letter
//                 <TableCell key={i}>{getSurveyFieldName(cell)}</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default AvgSurvayByMunicipilityWidg;














// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// import { db } from 'config/firebase';
// import useAuth from 'hooks/useAuth';
// import { useTranslation } from 'react-i18next';

// import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore';
// import { useEffect, useState } from 'react';

// const dataFieldKey = [
//   'accessibility',
//   'catering_services',
//   'cleaning_conservation',
//   'cultural_offerings',
//   'general_assessment',
//   'lodging',
//   'optionalFeedback',
//   'quality_price_ratio',
//   'retailers',
//   'signaling',
//   'sustainability',
//   'tourist_information'
// ];

// const AvgSurvayByMunicipilityWidg = () => {
//   const [municipalities, setMunicipalities] = useState([]);
//   const survayData = collection(db, 'optional_survey_data');
//   const { user } = useAuth();
//   const [rows, setRows] = useState([]);

//   const { t, i18n } = useTranslation();

//   const fetchMunicipalities = async (roleIds) => {
//     console.log('Fetching municipalities for roleIds:', roleIds);
//     const municipalities = new Set();
//     for (const roleId of roleIds) {
//       const roleDoc = await getDoc(doc(db, 'roles', roleId));
//       if (roleDoc.exists()) {
//         const roleData = roleDoc.data();
//         console.log('Role data for roleId', roleId, roleData);
//         if (Array.isArray(roleData.municipality)) {
//           roleData.municipality.forEach((municipality) => municipalities.add(municipality));
//         }
//       }
//     }
//     const municipalityArray = Array.from(municipalities);
//     console.log('Fetched municipalities:', municipalityArray);
//     return municipalityArray;
//   };

//   useEffect(() => {
//     console.log('useEffect triggered by user.role:', user?.role);
//     setUserMunicipalities();
//   }, [user?.role]);

//   const setUserMunicipalities = async () => {
//     const municipalities = await fetchMunicipalities(user?.role);
//     console.log('Setting user municipalities:', municipalities);
//     setMunicipalities(municipalities);
//   };

//   useEffect(() => {
//     const getEmpList = async () => {
//       try {
//         const data = await getDocs(survayData);
//         const filteredData = data.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id
//         }));
//         console.log('Fetched survey data:', filteredData);

//         const groupedData = filteredData.reduce((acc, item) => {
//           if (!acc[item.municipality]) {
//             acc[item.municipality] = [];
//           }
//           acc[item.municipality].push(item);
//           return acc;
//         }, {});
//         console.log('Grouped survey data by municipality:', groupedData);

//         let result = {};
//         for (const municipality in groupedData) {
//           console.log("Current municipality:", municipality);
//           result[municipality] = {};
//           console.log("Initialized result[municipality]:", result[municipality]);
//           for (const field of dataFieldKey) {
//             // const sum = groupedData[municipality].reduce((acc, item) => acc + item[field], 0);
//             const sum = groupedData[municipality].reduce((acc, item) => acc + Number(item[field]), 0);

//             console.log(`Sum for field ${field} in municipality ${municipality}:`, sum);

//             // result[municipality][field] = sum / groupedData[municipality].length;
//             // console.log(`Average for field ${field} in municipality ${municipality}:`, result[municipality][field]);
//             const length = groupedData[municipality].length;
//             console.log(`Length of groupedData[${municipality}]:`, length);

//             result[municipality][field] = sum / length.toFixed(2);
//             console.log(`Average for field ${field} in municipality ${municipality}:`, result[municipality][field]);
//           }
//         }
//         delete result.undefined;

//         console.log('Calculated averages:', result);

//         const preparedRows = prepareRows(result);
//         console.log('Prepared rows for table:', preparedRows);
//         setRows(preparedRows);
//       } catch (err) {
//         console.log('Error fetching survey data:', err);
//       }
//     };

//     console.log('useEffect triggered by user.role or municipalities:', user?.role, municipalities);
//     getEmpList();
//   }, [user?.role, municipalities]);

//   const prepareRows = (data) => {
//     const rowsData = [];
//     if (municipalities.length === 0) return rowsData;
//     for (const field of dataFieldKey) {
//       console.log('Looping through fields:', field);
//       const row = [field];
//       console.log('Municipalities:', municipalities);

//       municipalities.forEach((municipality) => {
//         if (data[municipality]) {
//           row.push(data[municipality][field] || 0);
//         } else row.push(0);
//       });
   
//       rowsData.push(row);
//     }
//     console.log('Prepared rows data:', rowsData);
//     return rowsData;
//   };

//   const getSurveyFieldName = (field) => {
//     switch (field) {
//       case 'accessibility':
//         return t('Accessibility');
//       case 'catering_services':
//         return t('Catering Services');
//       case 'cleaning_conservation':
//         return t('Cleaning Conservation');
//       case 'cultural_offerings':
//         return t('Cultural Offerings');
//       case 'general_assessment':
//         return t('General Assessment');
//       case 'lodging':
//         return t('Lodging');
//       case 'optionalFeedback':
//         return t('Optional Feedback');
//       case 'quality_price_ratio':
//         return t('Quality Price Ratio');
//       case 'retailers':
//         return t('Retailers');
//       case 'signaling':
//         return t('Signaling');
//       case 'sustainability':
//         return t('Sustainability');
//       case 'tourist_information':
//         return t('Tourist Information');
//       default:
//         return field;
//     }
//   }

//   return (
//     <TableContainer component={Paper} sx={{ width: '100%', height: "400px" }}>
//       <Table sx={{ width: '100%' }} aria-label="municipility avg data">
//         <TableHead>
//           <TableRow>
//             <TableCell></TableCell>
//             {municipalities.map((municipality) => (
//               <TableCell key={municipality}>{municipality}</TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, i) => (
//             <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//               {row.map((cell, j) => (
//                 <TableCell key={j}>{getSurveyFieldName(cell)}</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default AvgSurvayByMunicipilityWidg;

















import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { db } from 'config/firebase';
import useAuth from 'hooks/useAuth';
import { useTranslation } from 'react-i18next';

import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const dataFieldKey = [
  'accessibility',
  'catering_services',
  'cleaning_conservation',
  'cultural_offerings',
  'general_assessment',
  'lodging',
  // 'optionalFeedback',
  'quality_price_ratio',
  'retailers',
  'signaling',
  'sustainability',
  'tourist_information'
];

const AvgSurvayByMunicipilityWidg = () => {
  const [municipalities, setMunicipalities] = useState([]);
  const survayData = collection(db, 'optional_survey_data');
  const { user } = useAuth();
  const [rows, setRows] = useState([]);

  const { t, i18n } = useTranslation();

  const fetchMunicipalities = async (roleIds) => {
    console.log('Fetching municipalities for roleIds:', roleIds);
    const municipalities = new Set();
    for (const roleId of roleIds) {
      const roleDoc = await getDoc(doc(db, 'roles', roleId));
      if (roleDoc.exists()) {
        const roleData = roleDoc.data();
        console.log('Role data for roleId', roleId, roleData);
        if (Array.isArray(roleData.municipality)) {
          roleData.municipality.forEach((municipality) => municipalities.add(municipality));
        }
      }
    }
    const municipalityArray = Array.from(municipalities);
    console.log('Fetched municipalities:', municipalityArray);
    return municipalityArray;
  };

  useEffect(() => {
    console.log('useEffect triggered by user.role:', user?.role);
    setUserMunicipalities();
  }, [user?.role]);

  const setUserMunicipalities = async () => {
    const municipalities = await fetchMunicipalities(user?.role);
    console.log('Setting user municipalities:', municipalities);
    setMunicipalities(municipalities);
  };

  useEffect(() => {
    const getEmpList = async () => {
      try {
        const data = await getDocs(survayData);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        console.log('Fetched survey data:', filteredData);

        const groupedData = filteredData.reduce((acc, item) => {
          if (!acc[item.municipality]) {
            acc[item.municipality] = [];
          }
          acc[item.municipality].push(item);
          return acc;
        }, {});
        console.log('Grouped survey data by municipality:', groupedData);

        let result = {};
        for (const municipality in groupedData) {
          console.log("Current municipality:", municipality);
          result[municipality] = {};
          console.log("Initialized result[municipality]:", result[municipality]);
          for (const field of dataFieldKey) {
            const sum = groupedData[municipality].reduce((acc, item) => acc + Number(item[field]), 0);

            console.log(`Sum for field ${field} in municipality ${municipality}:`, sum);

            const length = groupedData[municipality].length;
            console.log(`Length of groupedData[${municipality}]:`, length);

            result[municipality][field] = (sum / length).toFixed(2); // Round to 2 decimals
            console.log(`Average for field ${field} in municipality ${municipality}:`, result[municipality][field]);
          }
        }
        delete result.undefined;

        console.log('Calculated averages:', result);

        const preparedRows = prepareRows(result);
        console.log('Prepared rows for table:', preparedRows);
        setRows(preparedRows);
      } catch (err) {
        console.log('Error fetching survey data:', err);
      }
    };

    console.log('useEffect triggered by user.role or municipalities:', user?.role, municipalities);
    getEmpList();
  }, [user?.role, municipalities]);

  const prepareRows = (data) => {
    const rowsData = [];
    if (municipalities.length === 0) return rowsData;
    for (const field of dataFieldKey) {
      console.log('Looping through fields:', field);
      const row = [field];
      console.log('Municipalities:', municipalities);

      municipalities.forEach((municipality) => {
        if (data[municipality]) {
          row.push(data[municipality][field] || 0);
        } else row.push(0);
      });
   
      rowsData.push(row);
    }
    console.log('Prepared rows data:', rowsData);
    return rowsData;
  };

  const getSurveyFieldName = (field) => {
    switch (field) {
      case 'accessibility':
        return t('Accessibility');
      case 'catering_services':
        return t('Catering Services');
      case 'cleaning_conservation':
        return t('Cleaning Conservation');
      case 'cultural_offerings':
        return t('Cultural Offerings');
      case 'general_assessment':
        return t('General Assessment');
      case 'lodging':
        return t('Lodging');
      case 'optionalFeedback':
        return t('Optional Feedback');
      case 'quality_price_ratio':
        return t('Quality Price Ratio');
      case 'retailers':
        return t('Retailers');
      case 'signaling':
        return t('Signaling');
      case 'sustainability':
        return t('Sustainability');
      case 'tourist_information':
        return t('Tourist Information');
      default:
        return field;
    }
  }

  return (
    <TableContainer component={Paper} sx={{ width: '100%', height: "400px" }}>
      <Table sx={{ width: '100%' }} aria-label="municipility avg data">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {municipalities.map((municipality) => (
              <TableCell key={municipality}>{municipality}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {row.map((cell, j) => (
                <TableCell key={j}>{getSurveyFieldName(cell)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AvgSurvayByMunicipilityWidg;
