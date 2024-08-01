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
  }, [user?.role]);

  const setUserMunicipalities = async () => {
    const municipalities = await fetchMunicipalities(user?.role);
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

        // const groupedData = filteredData.reduce((acc, item) => {
        //   if (!acc[item.municipality]) {
        //     acc[item.municipality] = {
        //       total: 0,
        //       count: 0
        //     };
        //   }
        //   dataFieldKey.forEach((field) => {
        //     acc[item.municipality].total += item[field] ?? 0;
        //   });
        //   acc[item.municipality].count++;
          
        //   return acc;
        // }, {});

        // delete groupedData.undefined;

        // let result = {};
        // for (const municipality in groupedData) {
        //   result[municipality] = {
        //     municipality: municipality,
        //     avg: (groupedData[municipality].total / (groupedData[municipality].count * dataFieldKey.length)).toFixed(2)
        //   };
        // }
        // setRows(result);

        const groupedData = filteredData.reduce((acc, item) => {
          if (!acc[item.municipality]) {
            acc[item.municipality] = {
              total: 0,
              count: 0
            };
          }
          dataFieldKey.forEach((field) => {
            acc[item.municipality].total += Number(item[field] ?? 0);
          });
          acc[item.municipality].count++;
        
          return acc;
        }, {});
        
        delete groupedData.undefined;
        
        let result = {};
        for (const municipality in groupedData) {
          result[municipality] = {
            municipality: municipality,
            avg: (groupedData[municipality].total / (groupedData[municipality].count * dataFieldKey.length)).toFixed(2)
          };
        }
        setRows(result);
        

      } catch (err) {
        console.log(err);
        console.log('SearchedData Error', err);
      }
    };

    getEmpList();
  }, [user?.role, municipalities]);

  const sortedMunicipalities = municipalities.sort((a, b) => a.localeCompare(b));

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
          {sortedMunicipalities.map((municipality) => (
            <TableRow key={municipality}>
              <TableCell>{rows[municipality]?.municipality ?? municipality}</TableCell>
              {/* <TableCell>{rows[municipality]?.avg ?? 0}</TableCell> */}
              <TableCell>{Number(rows[municipality]?.avg ?? 0).toFixed(2)}</TableCell>


           

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MunicipilityAvgSurvayMarkWid;



