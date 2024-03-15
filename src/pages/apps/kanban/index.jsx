import { useEffect, useState } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';

// material-ui
import { Box, Grid, Tab, Tabs } from '@mui/material';

// project-import
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { APP_DEFAULT_PATH } from 'config';
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| APPLICATION - KANBAN ||============================== //

export default function KanbanPage() {
  const { pathname } = useLocation();
  const { menuMaster } = useGetMenuMaster();

  let selectedTab = 0;
  let breadcrumbTitle = '';
  let breadcrumbHeading = '';

  switch (pathname) {
    case '/apps/kanban/backlogs':
      breadcrumbTitle = 'Backlogs';
      breadcrumbHeading = 'Backlogs';
      selectedTab = 1;
      break;
    case '/apps/kanban/board':
    default:
      breadcrumbTitle = 'Board';
      breadcrumbHeading = 'Taskboard';
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Kanban', to: '/apps/kanban/board' },
    { title: breadcrumbTitle }
  ];
  if (selectedTab === 0) {
    breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Kanban' }];
  }

  useEffect(() => {
    if (menuMaster.openedItem !== 'kanban') handlerActiveItem('kanban');
    if (pathname === '/apps/kanban/board') {
      setValue(0);
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <Breadcrumbs custom heading={breadcrumbHeading} links={breadcrumbLinks} />
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Tabs value={value} variant="scrollable" onChange={handleChange}>
              <Tab component={Link} to="/apps/kanban/board" label={value === 0 ? 'Board' : 'View as Board'} {...a11yProps(0)} />
              <Tab component={Link} to="/apps/kanban/backlogs" label={value === 1 ? 'Backlogs' : 'View as Backlog'} {...a11yProps(1)} />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
