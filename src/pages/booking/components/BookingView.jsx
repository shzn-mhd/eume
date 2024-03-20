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

const BookingView = ({ booking, closeModal }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <DialogTitle>Booking Details</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3.5 }}>
        <List sx={{ py: 0 }}>
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">First Name</Typography>
                      <Typography>{booking?.firstName}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Last Name</Typography>
                      <Typography>{booking?.lastName}</Typography>
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
                      <Typography color="secondary">Username</Typography>
                      <Typography>{booking?.username}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Role</Typography>
                      <Typography>{booking?.role}</Typography>
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
                      <Typography color="secondary">Email</Typography>
                      <Typography>{booking?.email}</Typography>
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

BookingView.propTypes = {
  booking: PropTypes.object,
  closeModal: PropTypes.func
};

export default BookingView;
