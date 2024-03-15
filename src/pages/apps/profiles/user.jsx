import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';

// material-ui
import { Grid } from '@mui/material';

// project import
import ProfileCard from 'sections/apps/profiles/user/ProfileCard';
import ProfileTabs from 'sections/apps/profiles/user/ProfileTabs';
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

// ==============================|| PROFILE - USER ||============================== //

const UserProfile = () => {
  const inputRef = useRef(null);
  const { pathname } = useLocation();
  const { menuMaster } = useGetMenuMaster();

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (menuMaster.openedItem !== 'user-profile') handlerActiveItem('user-profile');
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ProfileCard focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={3}>
        <ProfileTabs focusInput={focusInput} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Outlet context={inputRef} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
