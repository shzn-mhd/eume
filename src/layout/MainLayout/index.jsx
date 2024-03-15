import { Outlet } from 'react-router-dom';

// material-ui
import { Box, Container, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import Drawer from './Drawer';
import HorizontalBar from './Drawer/HorizontalBar';
import Footer from './Footer';
import Header from './Header';

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { container, miniDrawer, menuOrientation } = useConfig();

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // set media wise responsive drawer
  // useEffect(() => {
  //   if (!miniDrawer) {
  //     dispatch(openDrawer(!matchDownXL));
  //   }
  //   //
  // }, [matchDownXL]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      {!isHorizontal ? <Drawer /> : <HorizontalBar />}
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar sx={{ mt: isHorizontal ? 8 : 'inherit' }} />
        <Container
          maxWidth={container ? 'xl' : false}
          sx={{
            ...(container && { px: { xs: 0, sm: 2 } }),
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} /> */}
          <Outlet />
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
