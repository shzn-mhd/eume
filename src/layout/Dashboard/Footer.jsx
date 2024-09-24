
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme, useMediaQuery } from '@mui/material';

// material-ui
import { Link, Stack, Typography } from '@mui/material';

import footerImg from 'assets/images/eume-logo-bottom.png';

const Footer = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent={{ xs: 'center', sm: 'space-between' }}
      alignItems="center"
      sx={{ p: '24px 16px 0px', mt: 'auto' }}
    >
      <Typography variant="caption">
        &copy; {t("All rights reserved by Perfect Numbers")}
      </Typography>
      <Stack
        spacing={1.5}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: { xs: 2, sm: 0 } }}
      >
        <img 
          src={footerImg} 
          alt="EUME-logo" 
          style={{
            width: '100%', 
            maxWidth: {
              xs: '60px',
              sm: '80px',
              md: '100px',
              lg: '120px'
            }
          }} 
        />
        {/* Uncomment and adjust as needed */}
        {/* <Link component={RouterLink} to="#" target="_blank" variant="caption" color="textPrimary">
          {t("About us")}
        </Link> */}
        {/* <Link component={RouterLink} to="#" target="_blank" variant="caption" color="textPrimary">
          {t("Privacy")}
        </Link>
        <Link component={RouterLink} to="#" target="_blank" variant="caption" color="textPrimary">
          {t("Terms")}
        </Link> */}
      </Stack>
    </Stack>
  );
};

export default Footer;






