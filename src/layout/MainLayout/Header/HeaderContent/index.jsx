import { useMemo } from 'react';

// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Localization from './Localization';
import MegaMenuSection from './MegaMenuSection';
import MobileSection from './MobileSection';
import Profile from './Profile';

import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/MainLayout/Drawer/DrawerHeader';
import navigation from 'menu-items';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { i18n, menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  //
  const localization = useMemo(() => <Localization />, [i18n]);

  const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
      {/* {!downLG && <Search />} */}
      {!downLG && (
        <Breadcrumbs sx={{ width: '100%', ml: 4, my: 'auto' }} navigation={navigation} title titleBottom card={false} divider={false} />
      )}
      {/* {!downLG && megaMenu} */}
      {/* {!downLG && localization} */}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {/* <Notification /> */}
      {/* <Message /> */}
      {/* <Customization /> */}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
