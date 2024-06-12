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
import { getDocs, collection, query, where, count } from 'firebase/firestore';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { useTranslation } from 'react-i18next';

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

const DashboardDefault = ({
}) => {
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');

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

  useEffect(() => {
    const getEmpList = async () => {
      try {
        const data = await getDocs(empCollectionRef);

        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));

      
        setEmpCount(filteredData.length);

        const maleCount = filteredData.filter(emp => emp.gender === 'Male').length;
        const femaleCount = filteredData.filter(emp => emp.gender === 'Female').length;

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
         const withPetCount = filteredData.filter(emp => emp.withPet === 'Yes').length;
         const withoutPetCount = filteredData.filter(emp => emp.withPet === 'No').length;
 
         setWithPetCount(withPetCount);
         setWithoutPetCount(withoutPetCount);

         // Count entries by stayOverNight
        const stayOverNightYesCount = filteredData.filter(emp => emp.stayOvernight === 'Yes').length;
        const stayOverNightNoCount = filteredData.filter(emp => emp.stayOvernight === 'No').length;

        setStayOverNightYesCount(stayOverNightYesCount);
        setStayOverNightNoCount(stayOverNightNoCount);

        // Count entries by motivation
        const vacationCount = filteredData.filter(emp => emp.motivation === 'Vacation/leisure').length;
        const businessCount = filteredData.filter(emp => emp.motivation === 'Business/meeting').length;
        const visitFamilyFriendsCount = filteredData.filter(emp => emp.motivation === 'Visit family/friends').length;
        const otherCount = filteredData.filter(emp => emp.motivation === 'Other').length;

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

      } catch (err){
        console.log(err);
      }
    };
    getEmpList();
  },[]);


  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">{t("Dashboard")}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{marginBottom: '20px'}}>
        <AnalyticEcommerce title={t("Total Visitors")} count={empCount} percentage={59.3} extra="35,000" />
        </div>
        <AnalyticEcommerce title={t("Male")} count={maleCount} percentage={27.4} isLoss color="warning" extra="1,943" />

       
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{marginBottom : '20px'}}>
        <AnalyticEcommerce title={t("Country Total")}count={totalPlaceOfOriginCount} percentage={27.4} isLoss color="warning" extra="1,943" />

        </div>
        <AnalyticEcommerce title={t("Female")} count={femaleCount} percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{marginBottom: '20px'}}>
        <AnalyticEcommerce title={t("People with Pets")} count={withPetCount} percentage={27.4} isLoss color="warning" extra="1,943" />
        </div>
        <AnalyticEcommerce title={t("People without Pets")} count={withoutPetCount} percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{marginBottom: '20px'}}>
        <AnalyticEcommerce title={t("People Stay")} count={stayOverNightYesCount} percentage={27.4} isLoss color="warning" extra="$20,395" />
        </div>
        <AnalyticEcommerce title={t("People Won't Stay")} count={stayOverNightNoCount} percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{marginBottom : '20px'}}>
        <AnalyticEcommerce title={t("Country wise Total")} count={<ul>
          {Object.entries(countryCounts).map(([country, count]) => (
            <li key={country}>{country}: {count}</li>
          ))}
        </ul>} />
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{marginBottom: '20px'}}>
        <AnalyticEcommerce title={t("Vacation/Leisure")} count={vacationCount} percentage={27.4} isLoss color="warning" extra="1,943" />
        </div>
        <AnalyticEcommerce title={t("Business/Meeting")} count={businessCount} percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <div style={{marginBottom: '20px'}}>
        <AnalyticEcommerce title={t("Family/Friends")} count={visitFamilyFriendsCount} percentage={27.4} isLoss color="warning" extra="$20,395" />
        </div>
        <AnalyticEcommerce title={t("Other")} count={otherCount} percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      {/* <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Unique Visitor</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid> */}
      {/* <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid> */}

      {/* row 3 */}
      {/* <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid> */}
      {/* <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid> */}

      {/* row 4 */}
      {/* <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Sales Report</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.75, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <SalesChart />
      </Grid> */}
      {/* <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'success.main',
                    bgcolor: 'success.lighter'
                  }}
                >
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    78%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                  }}
                >
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    8%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'error.main',
                    bgcolor: 'error.lighter'
                  }}
                >
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid> */}
    </Grid>
  );
};

export default DashboardDefault;
