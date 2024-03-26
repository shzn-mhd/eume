import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Box, Modal, Stack } from '@mui/material';

// project-imports
// import FormUniversityAdd from './FormUniversityAdd';
// import FormOfferAdd from './FormOfferAdd';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';



import { useGetCustomer } from 'api/customer';
import OfferView from './OfferView';
import FormOfferAdd from './FormOfferAdd';

// import OfferView from './OfferView';
// import BulkUploadCSV from './BulkUploadCSV';

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

const OfferModal = ({ open, modalToggler, offer, viewType }) => {
  const { customersLoading: loading } = useGetCustomer();

  const closeModal = () => modalToggler(false);

  const offerFormAdd = useMemo(
    () => !loading && <FormOfferAdd 
                           offer={offer || null} 
                           closeModal={closeModal} />,
    // eslint-disable-next-line
    [offer, loading]
  );

  const viewOffer = useMemo(
    () => !loading && <OfferView offer={offer || null} closeModal={closeModal} />,
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
                viewType === 'view' ? viewOffer : offerFormAdd
              )}
            </SimpleBar>

          </MainCard>
        </Modal>
      )}
    </>
  );
};

OfferModal.propTypes = {
  open: PropTypes.bool,
  modalToggler: PropTypes.func,
  viewType: PropTypes.string,
  customer: PropTypes.object
};

export default OfferModal;
