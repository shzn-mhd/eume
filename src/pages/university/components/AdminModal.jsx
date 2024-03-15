import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Box, Modal, Stack } from '@mui/material';

// project-imports
// import FormUniversityAdd from './FormUniversityAdd';
import FormAdminAdd from './FormAdminAdd';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

import { useGetCustomer } from 'api/customer';
// import BulkUploadCSV from './BulkUploadCSV';

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

const AdminModal = ({ open, modalToggler, admin, adminType, setAdminType }) => {
  const { customersLoading: loading } = useGetCustomer();

  const closeModal = () => modalToggler(false);

  const adminyForm = useMemo(
    () => !loading && <FormAdminAdd 
                           admin={admin || null} 
                           closeModal={closeModal} />,
    // eslint-disable-next-line
    [admin, loading]
  );

  // const universityBulkUpload = useMemo(
  //   () => !loading && <BulkUploadCSV closeModal={closeModal} setUniversityType={setUniversityType}/>
  // );

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
            {/* <SimpleBar
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
                universityType === 'file' ? universityBulkUpload : universityForm
              )}
            </SimpleBar> */}
          </MainCard>
        </Modal>
      )}
    </>
  );
};

AdminModal.propTypes = {
  open: PropTypes.bool,
  modalToggler: PropTypes.func,
  adminType: PropTypes.string,
  customer: PropTypes.object
};

export default AdminModal;
