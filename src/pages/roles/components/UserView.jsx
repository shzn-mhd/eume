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

const UserView = ({ user, closeModal }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  const rolePermissions = user?.permissions?.['Roles'] || {};
  const basicSurveyPermissions = user?.permissions?.['Basic Survey'] || {};
  const optionalSurveyPermissions = user?.permissions?.['Optional Survey'] || {};
  const userPermissions = user?.permissions?.['Users'] || {};
  return (
    <>
      <DialogTitle>User Details</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3.5 }}>
        <List sx={{ py: 0 }}>
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Role Name</Typography>
                      <Typography>{user?.roleName}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Role Status</Typography>
                      <Typography>{user?.roleStatus}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          <Typography variant="h5" padding={2}>
            Role Permissions:{' '}
          </Typography>
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Basic Survey</Typography>
                      {/* <Typography>{user?.email}</Typography> */}
                      <Grid container md={12} spacing={1}>
                        <Grid md={2.5} item>
                          <Chip color={basicSurveyPermissions.add ? 'success' : 'error'} label="Add" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={basicSurveyPermissions.edit ? 'success' : 'error'} label="Edit" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={basicSurveyPermissions.view ? 'success' : 'error'} label="View" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={basicSurveyPermissions.delete ? 'success' : 'error'} label="Delete" size="small" variant="light" />
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Optional Survey</Typography>
                      {/* <Typography>{user?.role}</Typography> */}
                      <Grid container md={12} spacing={1}>
                        <Grid md={2.5} item>
                          <Chip color={optionalSurveyPermissions.add ? 'success' : 'error'} label="Add" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={optionalSurveyPermissions.edit ? 'success' : 'error'} label="Edit" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={optionalSurveyPermissions.view ? 'success' : 'error'} label="View" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={optionalSurveyPermissions.delete ? 'success' : 'error'} label="Delete" size="small" variant="light" />
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
                      <Typography color="secondary">Users</Typography>
                      {/* <Typography>{user?.email}</Typography> */}
                      <Grid container md={12} spacing={1}>
                        <Grid md={2.5} item>
                          <Chip color={userPermissions.add ? 'success' : 'error'} label="Add" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={userPermissions.edit ? 'success' : 'error'} label="Edit" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={userPermissions.view ? 'success' : 'error'} label="View" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={userPermissions.delete ? 'success' : 'error'} label="Delete" size="small" variant="light" />
                        </Grid>
                      </Grid>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Roles</Typography>
                      {/* <Typography>{user?.role}</Typography> */}
                      <Grid container md={12} spacing={1}>
                        <Grid md={2.5} item>
                          <Chip color={rolePermissions.add ? 'success' : 'error'} label="Add" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={rolePermissions.edit ? 'success' : 'error'} label="Edit" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={rolePermissions.view ? 'success' : 'error'} label="View" size="small" variant="light" />
                        </Grid>
                        <Grid md={2.5} item>
                          <Chip color={rolePermissions.delete ? 'success' : 'error'} label="Delete" size="small" variant="light" />
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
              Cancel
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
