import { useMemo, useState } from 'react';

// material-ui
import { Autocomplete, Box, FormControl, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';

// project import
import Search from './Search';
import Message from './Message';
import Profile from './Profile';
import Localization from './Localization';
import Notification from './Notification';
import FullScreen from './FullScreen';
import Customization from './Customization';
import MobileSection from './MobileSection';
import MegaMenuSection from './MegaMenuSection';

import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/Dashboard/Drawer/DrawerHeader';

import { MenuOrientation } from 'config';
import { useTranslation } from 'react-i18next';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  // const { i18n, menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const localization = useMemo(() => <Localization />, [i18n]);

  const megaMenu = useMemo(() => <MegaMenuSection />, []);
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const languageOptions = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' }
  ];

  const handleLanguageChange = (event, value) => {
    if (value) {
      i18n.changeLanguage(value.code);
      setSelectedLanguage(value.code);
    }
  };

  return (
    <>
    <Stack direction="row" spacing={2} justifyContent="flex-end" width='100%' paddingX={2}>
          <FormControl style={{ width: '150px' }}>
            <Autocomplete
              id="language"
              options={languageOptions}
              getOptionLabel={(option) => option.label}
              value={languageOptions.find((option) => option.code === selectedLanguage) || null}
              onChange={handleLanguageChange}
              sx={{
                borderRadius: '4px',
                bgcolor: theme.palette.background.paper,
                boxShadow: theme.customShadows.primary,
                border: `1px solid ${theme.palette.primary.main}`
              }}
              renderInput={(params) => <TextField {...params} label="Language" />}
              />
          </FormControl>
          </Stack>
      {/* {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />} */}
      {/* {!downLG && <Search />} */}
      {/* {!downLG && megaMenu} */}
      {/* {!downLG && localization} */}
      {/* {downLG && <Box sx={{ width: '100%', ml: 1 }} />} */}

      {/* <Notification /> */}
      {/* <Message /> */}
      {/* {!downLG && <FullScreen />} */}
      {/* <Customization /> */}
      {/* {!downLG && <Profile />} */}
      {/* {downLG && <MobileSection />} */}
    </>
  );
};

export default HeaderContent;
