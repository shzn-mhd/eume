import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputLabel, Stack } from '@mui/material';
import { useDropzone } from 'react-dropzone';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import SingleFileUpload from 'components/third-party/dropzone/SingleFile';
import { Formik } from 'formik'; 
import * as yup from 'yup';
import { createBulkUpload, getUniversities } from 'store/reducers/university'; 
import { dispatch } from 'store';
import { openSnackbar } from 'api/snackbar';
// import { useSnackbar } from 'notistack';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));


const BulkUploadCSV = ({ closeModal, setUniversityType }) => {
    const theme = useTheme();
    // const {openSnackbar} = openSnackbar();
  
  
    return (
      <>
        <DialogTitle>Bulk Upload</DialogTitle>
        <Divider />
        
        {/* <DialogContent sx={{ p: 5.5 }}> */}
  
        <Formik 
          initialValues={{files: null}}
          onSubmit={(values) => {
            //submit form
            console.log('dropzone bulk upload: ', values);
            dispatch(createBulkUpload(values.files[0]))
            .then(() => {
              openSnackbar({
                open: true,
                message: "Successfully uploaded CSV file!",
                variant: 'alert',
                alert: {
                  color: 'success'
                }
              });
              dispatch(getUniversities());
              closeModal();
            })
            .catch((error) => {
              console.error(error);
              openSnackbar({
                open: true,
                message: "Bulk upload CSV failed!",
                variant: 'error',
              });
            });
          }}
  
          validationSchema={yup.object().shape({
            files: yup.mixed().required('file is required')
          })}
        >
  
  
        {({ values, handleSubmit, setFieldValue, touched, errors}) =>(
          <form onSubmit={handleSubmit}>
        
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    {/* <InputLabel htmlFor="university-name">Upload File</InputLabel> */}
                    <SingleFileUpload setFieldValue={setFieldValue} file={values.files} error={touched.files && !!errors.files} />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
  
          
           
        {/* </DialogContent> */}
  
        <Divider />
        <DialogActions sx={{ p: 2.5 }}>
          <Grid container justifyContent="flex-end" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button color="error" 
                // onClick={closeModal}
                onClick={() => {
                  closeModal();
                  setUniversityType('');
                }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" 
                // disabled={isSubmitting}
                
                >
                  Upload
                </Button>
              </Stack>
            </Grid>
           
          </Grid>
         
        </DialogActions>
        </form>
          )}
           
        </Formik>
        
      </>
    );
  };
  
  BulkUploadCSV.PropTypes = {
    error: PropTypes.bool,
    file: PropTypes.array,
    setFieldValue: PropTypes.func,
    sx: PropTypes.object
  };
  
  export default BulkUploadCSV;
  