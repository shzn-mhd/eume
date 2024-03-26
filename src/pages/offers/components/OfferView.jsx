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

const OfferView = ({ offer, closeModal }) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <DialogTitle>Offer Details</DialogTitle>
      <Divider />
      <DialogContent sx={{ p: 3.5 }}>
        <List sx={{ py: 0 }}>
          <ListItem divider={!matchDownMD}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Name</Typography>
                      <Typography>{offer?.name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Offer Code</Typography>
                      <Typography>{offer?.offerCode}</Typography>
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
                      <Typography color="secondary">Discount</Typography>
                      <Typography>{offer?.discount}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Time Period</Typography>
                      <Typography>{offer?.timePeriod}</Typography>
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
                      <Typography color="secondary">Start Date</Typography>
                      <Typography>{offer?.startDate}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Exp Date</Typography>
                      <Typography>{offer?.expDate}</Typography>
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
                      <Typography color="secondary">PromoCode</Typography>
                      <Typography>{offer?.promoCode}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={0.5}>
                      <Typography color="secondary">Admin Approval</Typography>
                      <Typography>{offer?.adminApproval}</Typography>
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
                      <Typography color="secondary">Note</Typography>
                      <Typography>{offer?.note}</Typography>
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

OfferView.propTypes = {
  offer: PropTypes.object,
  closeModal: PropTypes.func
};

export default OfferView;
