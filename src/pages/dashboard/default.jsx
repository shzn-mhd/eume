import { useEffect, useState } from 'react';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import IncomeAreaChart from 'sections/dashboard/default/IncomeAreaChart';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import SalesChart from 'sections/dashboard/SalesChart';
import OrdersTable from 'sections/dashboard/default/OrdersTable';
import { db } from 'config/firebase';
import { getDocs, collection, query, where, count, getDoc, doc } from 'firebase/firestore';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { useTranslation } from 'react-i18next';
import useAuth from 'hooks/useAuth';
import AvgSurvayByMunicipilityWidg from 'components/dashborad/AvgSurvayByMunicipilityWidg';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = ({}) => {
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');

  const { user } = useAuth();

  const [empCount, setEmpCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [countryCounts, setCountryCounts] = useState({});
  const [withPetCount, setWithPetCount] = useState(0);
  const [withoutPetCount, setWithoutPetCount] = useState(0);
  const [stayOverNightYesCount, setStayOverNightYesCount] = useState(0);
  const [stayOverNightNoCount, setStayOverNightNoCount] = useState(0);
  const [vacationCount, setVacationCount] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);
  const [visitFamilyFriendsCount, setVisitFamilyFriendsCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const [totalPlaceOfOriginCount, setTotalPlaceOfOriginCount] = useState(0);
  const { t, i18n } = useTranslation();

  const empCollectionRef = collection(db, 'survey_data');

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
    const getEmpList = async () => {
      try {
        // Fetch the municipalities associated with the user's roles
        const municipalities = await fetchMunicipalities(user.role);
        const data = await getDocs(empCollectionRef);

        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));

        // Filter the data based on the user's municipalities
        let filteredData = filterData.filter((item) => municipalities.includes(item.municipality));

        setEmpCount(filteredData.length);

        const maleCount = filteredData.filter((emp) => emp.gender === 'Male').length;
        const femaleCount = filteredData.filter((emp) => emp.gender === 'Female').length;

        setMaleCount(maleCount);
        setFemaleCount(femaleCount);

        // Count entries by placeOfOrigin
        const countryCounts = filteredData.reduce((counts, emp) => {
          const country = emp.placeOfOrigin;
          counts[country] = (counts[country] || 0) + 1;
          return counts;
        }, {});

        setCountryCounts(countryCounts);

        // Count entries by withPet
        const withPetCount = filteredData.filter((emp) => emp.withPet === 'Yes').length;
        const withoutPetCount = filteredData.filter((emp) => emp.withPet === 'No').length;

        setWithPetCount(withPetCount);
        setWithoutPetCount(withoutPetCount);

        // Count entries by stayOverNight
        const stayOverNightYesCount = filteredData.filter((emp) => emp.stayOvernight === 'Yes').length;
        const stayOverNightNoCount = filteredData.filter((emp) => emp.stayOvernight === 'No').length;

        setStayOverNightYesCount(stayOverNightYesCount);
        setStayOverNightNoCount(stayOverNightNoCount);

        // Count entries by motivation
        const vacationCount = filteredData.filter((emp) => emp.motivation === 'Vacation/leisure').length;
        const businessCount = filteredData.filter((emp) => emp.motivation === 'Business/meeting').length;
        const visitFamilyFriendsCount = filteredData.filter((emp) => emp.motivation === 'Visit family/friends').length;
        const otherCount = filteredData.filter((emp) => emp.motivation === 'Other').length;

        setVacationCount(vacationCount);
        setBusinessCount(businessCount);
        setVisitFamilyFriendsCount(visitFamilyFriendsCount);
        setOtherCount(otherCount);

        // Count total entries for placeOfOrigin
        const totalPlaceOfOriginCount = filteredData.reduce((count, emp) => {
          if (emp.placeOfOrigin) {
            return count + 1;
          }
          return count;
        }, 0);

        setTotalPlaceOfOriginCount(totalPlaceOfOriginCount);
      } catch (err) {
        console.log(err);
      }
    };
    getEmpList();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">{t('Dashboard')}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{ marginBottom: '20px' }}>
          <AnalyticEcommerce title={t('Total Visitors')} count={empCount} extra="35,000" />
        </div>
        <AnalyticEcommerce
          title={t('Male')}
          count={maleCount}
          percentage={(maleCount * 100) / empCount}
          isLoss
          color="warning"
          extra="1,943"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{ marginBottom: '20px' }}>
          <AnalyticEcommerce title={t('Country Total')} count={totalPlaceOfOriginCount} color="warning" extra="1,943" />
        </div>
        <AnalyticEcommerce
          title={t('Female')}
          count={femaleCount}
          percentage={(femaleCount * 100) / empCount}
          isLoss
          color="warning"
          extra="1,943"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{ marginBottom: '20px' }}>
          <AnalyticEcommerce
            title={t('People with Pets')}
            count={withPetCount}
            percentage={(withPetCount * 100) / empCount}
            isLoss
            color="warning"
            extra="1,943"
          />
        </div>
        <AnalyticEcommerce
          title={t('People without Pets')}
          count={withoutPetCount}
          percentage={(withoutPetCount * 100) / empCount}
          isLoss
          color="warning"
          extra="1,943"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{ marginBottom: '20px' }}>
          <AnalyticEcommerce
            title={t('People Stay')}
            count={stayOverNightYesCount}
            percentage={(stayOverNightYesCount * 100) / empCount}
            isLoss
            color="warning"
            extra="$20,395"
          />
        </div>
        <AnalyticEcommerce
          title={t("People Won't Stay")}
          count={stayOverNightNoCount}
          percentage={(stayOverNightNoCount * 100) / empCount}
          isLoss
          color="warning"
          extra="$20,395"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={6}>
        <div>
          <AnalyticEcommerce
            title={t('Country wise Total')}
            count={
              <ul>
                {Object.entries(countryCounts).map(([country, count]) => (
                  <li key={country}>
                    {country}: {count}
                  </li>
                ))}
              </ul>
            }
          />
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{ marginBottom: '20px' }}>
          <AnalyticEcommerce
            title={t('Vacation/Leisure')}
            count={vacationCount}
            percentage={(vacationCount * 100) / empCount}
            isLoss
            color="warning"
            extra="1,943"
          />
        </div>
        <AnalyticEcommerce
          title={t('Business/Meeting')}
          count={businessCount}
          percentage={(businessCount * 100) / empCount}
          isLoss
          color="warning"
          extra="1,943"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{ marginBottom: '20px' }}>
          <AnalyticEcommerce
            title={t('Family/Friends')}
            count={visitFamilyFriendsCount}
            percentage={(visitFamilyFriendsCount * 100) / empCount}
            isLoss
            color="warning"
            extra="$20,395"
          />
        </div>
        <AnalyticEcommerce
          title={t('Other')}
          count={otherCount}
          percentage={(otherCount * 100) / empCount}
          isLoss
          color="warning"
          extra="$20,395"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <AnalyticEcommerce
          title={t('Evaluation Table')}
          count={<AvgSurvayByMunicipilityWidg/>}
        />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
    </Grid>
  );
};

export default DashboardDefault;
