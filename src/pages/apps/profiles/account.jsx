import { useEffect, useState } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { APP_DEFAULT_PATH } from 'config';
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

// assets
import { ContainerOutlined, FileTextOutlined, LockOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

// ==============================|| PROFILE - ACCOUNT ||============================== //

const AccountProfile = () => {
  const { pathname } = useLocation();
  const { menuMaster } = useGetMenuMaster();

  let selectedTab = 0;
  let breadcrumbTitle = '';
  let breadcrumbHeading = '';
  switch (pathname) {
    case '/apps/profiles/account/personal':
      breadcrumbTitle = 'Personal';
      breadcrumbHeading = 'Personal';
      selectedTab = 1;
      break;
    case '/apps/profiles/account/my-account':
      breadcrumbTitle = 'My Account';
      breadcrumbHeading = 'My Account';
      selectedTab = 2;
      break;
    case '/apps/profiles/account/password':
      breadcrumbTitle = 'Change Password';
      breadcrumbHeading = 'Change Password';
      selectedTab = 3;
      break;
    case '/apps/profiles/account/role':
      breadcrumbTitle = 'Role';
      breadcrumbHeading = 'Accountant';
      selectedTab = 4;
      break;
    case '/apps/profiles/account/settings':
      breadcrumbTitle = 'Settings';
      breadcrumbHeading = 'Account Settings';
      selectedTab = 5;
      break;
    case '/apps/profiles/account/basic':
    default:
      breadcrumbTitle = 'Basic';
      breadcrumbHeading = 'Basic Account';
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Account Profile', to: '/apps/profiles/account/basic' },
    { title: breadcrumbTitle }
  ];
  if (selectedTab === 0) {
    breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Account Profile' }];
  }

  useEffect(() => {
    if (menuMaster.openedItem !== 'account-profile') handlerActiveItem('account-profile');
    if (pathname === '/apps/profiles/account/basic') {
      setValue(0);
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <Breadcrumbs custom heading={breadcrumbHeading} links={breadcrumbLinks} />
      <MainCard border={false} boxShadow>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
            <Tab label="Profile" component={Link} to="/apps/profiles/account/basic" icon={<UserOutlined />} iconPosition="start" />
            <Tab label="Personal" component={Link} to="/apps/profiles/account/personal" icon={<FileTextOutlined />} iconPosition="start" />
            <Tab
              label="My Account"
              component={Link}
              to="/apps/profiles/account/my-account"
              icon={<ContainerOutlined />}
              iconPosition="start"
            />
            <Tab
              label="Change Password"
              component={Link}
              to="/apps/profiles/account/password"
              icon={<LockOutlined />}
              iconPosition="start"
            />
            <Tab label="Role" component={Link} to="/apps/profiles/account/role" icon={<TeamOutlined />} iconPosition="start" />
            <Tab label="Settings" component={Link} to="/apps/profiles/account/settings" icon={<SettingOutlined />} iconPosition="start" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          <Outlet />
        </Box>
      </MainCard>
    </>
  );
};

export default AccountProfile;
