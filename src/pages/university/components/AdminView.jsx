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

const AdminView = ({ admin, closeModal }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <DialogTitle>Admin Details</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3.5 }}>
        <List sx={{ py: 0 }}>
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">firstName</Typography>
                      <Typography>{admin?.firstName}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">lastName</Typography>
                      <Typography>{admin?.lastName}</Typography>
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
                      <Typography color="secondary">username</Typography>
                      <Typography>{admin?.username}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">role</Typography>
                      <Typography>{admin?.role}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">email</Typography>
                      <Typography>{admin?.email}</Typography>
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

AdminView.propTypes = {
  admin: PropTypes.object,
  closeModal: PropTypes.func
};

export default AdminView;
