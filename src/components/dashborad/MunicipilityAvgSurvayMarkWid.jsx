import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { db } from 'config/firebase';
import useAuth from 'hooks/useAuth';

import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const dataFieldKey = [
  'accessibility',
  'catering_services',
  'cleaning_conservation',
  'cultural_offerings',
  'general_assessment',
  'lodging',
  'quality_price_ratio',
  'retailers',
  'signaling',
  'sustainability',
  'tourist_information'
];

const MunicipilityAvgSurvayMarkWid = () => {
  //   const municipalities = ['A Capela', 'As Pontes', 'Cabanas', 'Monfero', 'Pontedeume'];
  const [municipalities, setMunicipalities] = useState([]);
  const survayData = collection(db, 'optional_survey_data');
  const { user } = useAuth();
  const [rows, setRows] = useState({});
  const { t, i18n } = useTranslation();

  const fetchMunicipalities = async (roleIds) => {
    const municipalities = new Set();
    for (const roleId of roleIds) {
      const roleDoc = await getDoc(doc(db, 'roles', roleId));
      if (roleDoc.exists()) {
        const roleData = roleDoc.data();
        if (Array.isArray(roleData.municipality)) {
          roleData.municipality.forEach((municipality) => municipalities.add(municipality));
        }
      }
    }
    return Array.from(municipalities);
  };

  useEffect(() => {
    setUserMunicipalities();
  }, [user.role]);

  const setUserMunicipalities = async () => {
    const municipalities = await fetchMunicipalities(user.role);
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

        const groupedData = filteredData.reduce((acc, item) => {
          // since there is no direct mark filed, iterate dataFieldKey array throug and accss `item` object with key ans sum all the values then assign to acc[item.municipality]
          if (!acc[item.municipality]) {
            acc[item.municipality] = {
              total: 0,
              count: 0
            };
          }
          dataFieldKey.forEach((field) => {
            console.log("Municipility:", item.municipality)
            console.log("Item:", item)
            console.log("Field:", item[field])
            console.log("Acc:", acc[item.municipality])
            acc[item.municipality].total += item[field]??0;
          });
          acc[item.municipality].count++;
          
          return acc;
        }, {});

        // delete undefined key from groupedData
        delete groupedData.undefined;
        console.log('Grouped Data', groupedData);

//       //   res = {
//     "Monfero": {
//       "total": 163,
//       "count": 4
//   },
//   "A Capela": {
//       "total": 56,
//       "count": 2
//   }
// }

        // calculate average of municipality based on result of groupedData
        let result = {};
        for (const municipality in groupedData) {
          result[municipality] = {
            municipality: municipality,
            avg: (groupedData[municipality].total / (groupedData[municipality].count * dataFieldKey.length)).toFixed(2)
          };
        }
        console.log('Final Result:', result);
        setRows(result)
      } catch (err) {
        console.log(err);
        console.log('SearchedData Error', err);
      }
    };

    getEmpList();
  }, [user.role, municipalities]);

  const getSurveyFieldName = (field) => {
    switch (field) {
      case 'accessibility':
        return 'Accessibility';
      case 'catering_services':
        return 'Catering Services';
      case 'cleaning_conservation':
        return 'Cleaning Conservation';
      case 'cultural_offerings':
        return 'Cultural Offerings';
      case 'general_assessment':
        return 'General Assessment';
      case 'lodging':
        return 'Lodging';
      case 'optionalFeedback':
        return 'Optional Feedback';
      case 'quality_price_ratio':
        return 'Quality Price Ratio';
      case 'retailers':
        return 'Retailers';
      case 'signaling':
        return 'Signaling';
      case 'sustainability':
        return 'Sustainability';
      case 'tourist_information':
        return 'Tourist Information';
      default:
        return field;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ width: '100%', height: "400px" }}>
      <Table sx={{ width: '100%' }} aria-label="municipility avg data">
        <TableHead>
          <TableRow>
            <TableCell>{t('Municipility')}</TableCell>
            <TableCell>{t('Average')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {municipalities.map((municipality) => (
            <TableRow>
              <TableCell>{rows[municipality]?.municipality??municipality}</TableCell>
              <TableCell>{rows[municipality]?.avg??0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MunicipilityAvgSurvayMarkWid;
