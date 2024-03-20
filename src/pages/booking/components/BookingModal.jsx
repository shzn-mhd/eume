import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Box, Modal, Stack } from '@mui/material';

// project-imports

// import FormBookingAdd from './FormBookingAdd';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';


import { useGetCustomer } from 'api/customer';
import BookingView from './BookingView';
import FormBookingAdd from './FormBookingAdd';

// import BookingView from './BookingView';
// import BulkUploadCSV from './BulkUploadCSV';

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

const BookingModal = ({ open, modalToggler, booking, viewType }) => {
  const { customersLoading: loading } = useGetCustomer();

  const closeModal = () => modalToggler(false);

  const bookingFormAdd = useMemo(
    () => !loading && <FormBookingAdd 
                           booking={booking || null} 
                           closeModal={closeModal} />,
    // eslint-disable-next-line
    [booking, loading]
  );

  const viewBooking = useMemo(
    () => !loading && <BookingView booking={booking || null} closeModal={closeModal} />,
  );

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
              {loading ? (
                <Box sx={{ p: 5 }}>
                  <Stack direction="row" justifyContent="center">
                    <CircularWithPath />
                  </Stack>
                </Box>
              ) : (
                viewType === 'view' ? viewBooking :bookingFormAdd
              )}
            </SimpleBar>

          </MainCard>
        </Modal>
      )}
    </>
  );
};

BookingModal.propTypes = {
  open: PropTypes.bool,
  modalToggler: PropTypes.func,
  viewType: PropTypes.string,
  customer: PropTypes.object
};

export default BookingModal;
