import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Box, Modal, Stack } from '@mui/material';

// project-imports
import FormCustomerAdd from './FormCustomerAdd';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

import { useGetCustomer } from 'api/customer';

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

const CustomerModal = ({ open, modalToggler, customer }) => {
  const { customersLoading: loading } = useGetCustomer();

  const closeModal = () => modalToggler(false);

  const customerForm = useMemo(
    () => !loading && <FormCustomerAdd customer={customer || null} closeModal={closeModal} />,
    // eslint-disable-next-line
    [customer, loading]
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
                customerForm
              )}
            </SimpleBar>
          </MainCard>
        </Modal>
      )}
    </>
  );
};

CustomerModal.propTypes = {
  open: PropTypes.bool,
  modalToggler: PropTypes.func,
  customer: PropTypes.object
};

export default CustomerModal;
