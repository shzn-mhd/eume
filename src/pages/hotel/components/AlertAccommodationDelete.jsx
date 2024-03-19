import PropTypes from 'prop-types';

// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

import { deleteCustomer } from 'api/customer';
import { openSnackbar } from 'api/snackbar';

// assets
import { DeleteFilled } from '@ant-design/icons';
import { dispatch } from 'store';
// import { deleteUniversity, getUniversities } from 'store/reducers/university';
import { deleteAccommodation, getAccommodations } from 'store/reducers/accommodation';

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertAccommodationDelete({ id, title, open, handleClose }) {
  console.log();("del>>>", title);
  console.log();("del id>>>", id);
  const deletehandler = async () => {
    dispatch(deleteAccommodation(id)).then(() => {
      openSnackbar({
        open: true,
        message: 'Accommodation deleted successfully',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
      dispatch(getAccommodations());
      handleClose();
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      TransitionComponent={PopupTransition}
      maxWidth="xs"
      aria-labelledby="column-delete-title"
      aria-describedby="column-delete-description"
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems="center" spacing={3.5}>
          <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <DeleteFilled />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Are you sure you want to delete?
            </Typography>
            <Typography align="center">
              By deleting
              <Typography variant="subtitle1" component="span">
                {' '}
                &quot;{title}&quot;{' '}
              </Typography>
              Admins, all attributes assigned to that accommodation will also be deleted.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={handleClose} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button fullWidth color="error" variant="contained" onClick={deletehandler} autoFocus>
              Delete
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

AlertAccommodationDelete.propTypes = {
  id: PropTypes.any,
  title: PropTypes.any,
  open: PropTypes.bool,
  handleClose: PropTypes.func
};
