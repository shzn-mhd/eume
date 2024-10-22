import { useTheme } from '@mui/material/styles';
import {
  Button,
  Chip,
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
  const rolePermissions = user?.permissions?.['Roles'] || {};
  const basicSurveyPermissions = user?.permissions?.['Basic Survey'] || {};
  const optionalSurveyPermissions = user?.permissions?.['Optional Survey'] || {};
  const userPermissions = user?.permissions?.['Users'] || {};
  const cabanaPermissions = user?.permissions?.['Cabanas'] || {};

  return (
    <>
      <DialogTitle>{t('Role Details')}</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3.5 }}>
        <List sx={{ py: 0 }}>
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">{t('Role Name')}</Typography>
                      <Typography>{user?.roleName}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">{t('Role Status')}</Typography>
                      <Typography>{user?.roleStatus}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          <Typography variant="h5" padding={2}>
            {t('Role Permissions')}:{' '}
          </Typography>
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">{t('Basic Survey')}</Typography>
                      {/* <Typography>{user?.email}</Typography> */}
                      <Grid container md={12} spacing={1}>
                        <Grid md={2.5} item>
                          <Chip color={basicSurveyPermissions.add ? 'success' : 'error'} label={t("Add")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={basicSurveyPermissions.edit ? 'success' : 'error'} label={t("Edit")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={basicSurveyPermissions.view ? 'success' : 'error'} label={t("View")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={basicSurveyPermissions.delete ? 'success' : 'error'} label={t("Delete")} size="small" variant="light" />
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">{t('Optional Survey')}</Typography>
                      {/* <Typography>{user?.role}</Typography> */}
                      <Grid container md={12} spacing={1}>
                        <Grid md={2.5} item>
                          <Chip color={optionalSurveyPermissions.add ? 'success' : 'error'} label={t("Add")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={optionalSurveyPermissions.edit ? 'success' : 'error'} label={t("Edit")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={optionalSurveyPermissions.view ? 'success' : 'error'} label={t("View")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={optionalSurveyPermissions.delete ? 'success' : 'error'} label={t("Delete")} size="small" variant="light" />
                        </Grid>
                      </Grid>
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
                      <Typography color="secondary">{t('Users')}</Typography>
                      {/* <Typography>{user?.email}</Typography> */}
                      <Grid container md={12} spacing={1}>
                        <Grid md={2.5} item>
                          <Chip color={userPermissions.add ? 'success' : 'error'} label={t("Add")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={userPermissions.edit ? 'success' : 'error'} label={t("Edit")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={userPermissions.view ? 'success' : 'error'} label={t("View")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={userPermissions.delete ? 'success' : 'error'} label={t("Delete")} size="small" variant="light" />
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">{t('Roles')}</Typography>
                      {/* <Typography>{user?.role}</Typography> */}
                      <Grid container md={12} spacing={1}>
                        <Grid md={2.5} item>
                          <Chip color={rolePermissions.add ? 'success' : 'error'} label={t("Add")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={rolePermissions.edit ? 'success' : 'error'} label={t("Edit")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={rolePermissions.view ? 'success' : 'error'} label={t("View")} size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={rolePermissions.delete ? 'success' : 'error'} label={t("Delete")} size="small" variant="light" />
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
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
