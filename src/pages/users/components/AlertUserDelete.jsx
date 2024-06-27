import PropTypes from 'prop-types';

// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { DeleteFilled } from '@ant-design/icons';
// import { dispatch } from 'store';
// import { deleteUniversity, getUniversities } from 'store/reducers/university';
// import { deleteSystemAdmin, getSystemAdmins } from 'store/reducers/admin';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'config/firebase';
import { useTranslation } from 'react-i18next';

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertUserDelete({ open, handleClose, setEmpList, userId, userName }) {
  const { t, i18n } = useTranslation();
const deleteHandler = async () => {
    try {
      const userDoc = doc(db, 'users', userId);
      await deleteDoc(userDoc);

      // Update the empList in the parent component
      setEmpList((prevEmpList) => prevEmpList.filter((user) => user.id !== userId));

      handleClose();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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
              {t('Are you sure you want to delete?')}
            </Typography>
            <Typography align="center">
              {t('By deleting')}
              <Typography variant="subtitle1" component="span">
                {' '}
                &quot;{userName}&quot;{' '}
              </Typography>
              , {t('all attributes assigned to this user will also be deleted.')}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={handleClose} color="secondary" variant="outlined">
              {t('Cancel')}
            </Button>
            <Button fullWidth color="error" variant="contained" onClick={deleteHandler} autoFocus>
              {t('Delete')}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

AlertUserDelete.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    setEmpList: PropTypes.func.isRequired
//   id: PropTypes.any,
//   title: PropTypes.any,
};
