import PropTypes from 'prop-types';

// material-ui
import { Box, Modal, Stack } from '@mui/material';

// project-imports
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import UserView from './UserView';

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

const UserModal = ({ open, modalToggler, user }) => {
  const closeModal = () => modalToggler(false);

  return (
    <>
      {open && (
        <Modal
          open={open}
          onClose={closeModal}
          aria-labelledby="modal-customer-add-label"
          aria-describedby="modal-customer-add-description"
          sx={{
            '& .MuiPaper-root:focus': {
              outline: 'none'
            }
          }}
        >
          <MainCard
            sx={{ width: `calc(100% - 48px)`, minWidth: 340, maxWidth: 880, height: 'auto', maxHeight: 'calc(100vh - 48px)' }}
            modal
            content={false}
          >
            <SimpleBar
              sx={{
                maxHeight: `calc(100vh - 48px)`,
                '& .simplebar-content': {
                  display: 'flex',
                  flexDirection: 'column'
                }
              }}
            >
              <UserView user={user || null} closeModal={closeModal} />,
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
};

UserModal.propTypes = {
  open: PropTypes.bool,
  modalToggler: PropTypes.func,
  viewType: PropTypes.string,
  customer: PropTypes.object
};

export default UserModal;
