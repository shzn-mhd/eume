import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// material-ui
import { Link, Stack, Typography } from '@mui/material';

import footerImg from 'assets/images/eume-logo-bottom.png';

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
      <Typography variant="caption">&copy; {t("All rights reserved by Perfect Numbers")}</Typography>
      <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
        <img src={footerImg} alt="EUME-logo" />
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
