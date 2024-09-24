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

const AccommodationView = ({ accommodation, closeModal }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <DialogTitle>Hotel Details</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3.5 }}>
        <List sx={{ py: 0 }}>
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Type</Typography>
                      <Typography>{accommodation?.type}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Name</Typography>
                      <Typography>{accommodation?.name}</Typography>
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
                      <Typography color="secondary">Address</Typography>
                      <Typography>{accommodation?.address}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">City</Typography>
                      <Typography>{accommodation?.city}</Typography>
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
                      <Typography color="secondary">Country</Typography>
                      <Typography>{accommodation?.country}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Description</Typography>
                      <Typography>{accommodation?.description}</Typography>
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
                      <Typography color="secondary">Amenities</Typography>
                      <Typography>{accommodation?.amenities}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Contact Number</Typography>
                      <Typography>{accommodation?.contactNumber}</Typography>
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
                      <Typography color="secondary">Email</Typography>
                      <Typography>{accommodation?.email}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Owner</Typography>
                      <Typography>{accommodation?.owner}</Typography>
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
                      <Typography color="secondary">Rating</Typography>
                      <Typography>{accommodation?.rating}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Number of Rooms</Typography>
                      <Typography>{accommodation?.numberOfRooms}</Typography>
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
                      <Typography color="secondary">Website Link</Typography>
                      <Typography>{accommodation?.websiteLink}</Typography>
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

AccommodationView.propTypes = {
  accommodation: PropTypes.object,
  closeModal: PropTypes.func
};

export default AccommodationView;
