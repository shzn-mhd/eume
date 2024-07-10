import { useTheme } from '@mui/material/styles';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const UserView = ({ user, closeModal }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <DialogTitle>{t('User Details')}</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3.5 }}>
        <List sx={{ py: 0 }}>
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">{t('First Name')}</Typography>
                      <Typography>{user?.firstName}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">{t('Last Name')}</Typography>
                      <Typography>{user?.lastName}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>

                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">{t('Email')}</Typography>
                      <Typography>{user?.email}</Typography>
                    </Stack>
                  </Grid>
                  
                  {/* TODO: Show role name */}
                  {/* <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">{t('Role')}</Typography>
                      <Typography>{user?.role.}</Typography>
                    </Stack>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 1.5 }}>
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item>
            <Button color="error" onClick={closeModal}>
              {t('Cancel')}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

UserView.propTypes = {
  user: PropTypes.object,
  closeModal: PropTypes.func
};

export default UserView;
