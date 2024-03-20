import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

import { parseISO } from 'date-fns';


// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel, 
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
  RadioGroup,
  Radio,
  Autocomplete,
  Chip,
  InputAdornment,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports

import AlertBookingDelete from './AlertBookingDelete';

import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import CircularWithPath from 'components/@extended/progress/CircularWithPath';

import { openSnackbar } from 'api/snackbar';
import { insertCustomer, updateCustomer } from 'api/customer';
import { ThemeMode } from 'config';
import { Gender } from 'data/react-table';
import { getImageUrl, ImagePath } from 'utils/getImageUrl';

// assets
import { CameraOutlined, CloseOutlined, DeleteFilled, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { dispatch } from 'store';

import { createSystemBooking,  getSystemBookings,  updateSystemBooking } from 'store/reducers/booking';
import { useDispatch } from 'store';
import countries from 'data/countries';
import { Icon } from '@iconify/react';


const skills = [
  'Adobe XD',
  'After Effect',
  'Angular',
  'Animation',
  'ASP.Net',
  'Bootstrap',
  'C#',
  'CC',
  'Corel Draw',
  'CSS',
  'DIV',
  'Dreamweaver',
  'Figma',
  'Graphics',
  'HTML',
  'Illustrator',
  'J2Ee',
  'Java',
  'Javascript',
  'JQuery',
  'Logo Design',
  'Material UI',
  'Motion',
  'MVC',
  'MySQL',
  'NodeJS',
  'npm',
  'Photoshop',
  'PHP',
  'React',
  'Redux',
  'Reduxjs & tooltit',
  'SASS',
  'SCSS',
  'SQL Server',
  'SVG',
  'UI/UX',
  'User Interface Designing',
  'Wordpress'
];




// ==============================|| CUSTOMER ADD / EDIT - FORM ||============================== //

const FormBookingAdd = ({ booking, closeModal }) => { 
  console.log("booking delete", booking);
  const theme = useTheme();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(
    getImageUrl(`avatar-${booking &&
       booking !== null && 
       booking?.avatar ? booking.avatar : 1}.png`,
        ImagePath.USERS)
  );

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const BookingSchema = Yup.object().shape({
    bookingID: Yup.string().max(255).required('Booking ID is required'),
    hotelID: Yup.string().max(255).required('Hotel ID is required'),
    name: Yup.string().max(50).required('User Name is required'),
    total: Yup.number().required('Total is required'),
    rating: Yup.number().required('Rating is required'),
    action: Yup.string([]).max(255).required('Selecting a choice is required'),
    bookingDate: Yup.date().required('Booking Date is required'),
    adminApproval: Yup.boolean().required('Admin Approval is required')
  });

  const defaultValues = useMemo(
    () => ({

      bookingID: booking? booking.bookingID: '',
      hotelID: booking? booking.hotelID: '',
      name: booking? booking.name: '',
      total: booking? booking.total: '',
      rating: booking? booking.rating: '',
      action: booking? booking.action: 'Hotel',
      bookingDate: booking? booking.bookingDate: '',
      adminApproval: booking? booking.adminApproval: true
    }), 
    [booking]
  );

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    closeModal();
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: BookingSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("values uni new", values);
      try {
        let newBooking = values;

        if (booking) {
          dispatch(updateSystemBooking(booking._id, newBooking)).then(() => {
            openSnackbar({
              open: true,
              message: 'System Booking update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            dispatch(getSystemBookings());
            closeModal();
          });
        } else {
          dispatch(createSystemBooking(values)).then(() => {
            openSnackbar({
              open: true,
              message: 'System Booking added successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            dispatch(getSystemBookings());
            closeModal();
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    dispatch(getSystemBookings());
  }, [dispatch]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  if (loading)
    return (
      <Box sx={{ p: 5 }}>
        <Stack direction="row" justifyContent="center">
          <CircularWithPath />
        </Stack>
      </Box>
    );

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{booking ? 'Edit Booking' : 'New Booking'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 5.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="bookingID">Booking ID</InputLabel>
                        <TextField
                          fullWidth
                          id="bookingID"
                          placeholder="Enter Booking ID"
                          {...getFieldProps('bookingID')}
                          error={Boolean(touched.bookingID && errors.bookingID)}
                          helperText={touched.bookingID && errors.bookingID}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="hotelID">Hotel ID</InputLabel>
                        <TextField
                          fullWidth
                          id="hotelID"
                          placeholder="Enter Hotel ID"
                          {...getFieldProps('hotelID')}
                          error={Boolean(touched.hotelID && errors.hotelID)}
                          helperText={touched.hotelID && errors.hotelID}
                        />
                      </Stack>
                    </Grid>
                    
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="name"> User Name </InputLabel>
                        <TextField
                          fullWidth
                          id="name"
                          placeholder="Enter User Name"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="total"> Total </InputLabel>
                        <TextField
                          fullWidth
                          id="total"
                          placeholder="Enter Total"
                          {...getFieldProps('total')}
                          error={Boolean(touched.total && errors.total)}
                          helperText={touched.total && errors.total}
                        />
                      </Stack>
                    </Grid>

                    
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="rating">Rating</InputLabel>
                        <TextField
                          fullWidth
                          id="rating"
                          placeholder="Enter Rating"
                          {...getFieldProps('rating')}
                          error={Boolean(touched.rating && errors.rating)}
                          helperText={touched.rating && errors.rating}
                        />
                      </Stack>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="action"> Action </InputLabel>
                        {/* <TextField
                          fullWidth
                          id="action"
                          placeholder="Pick Your Choice"
                          {...getFieldProps('action')}
                          error={Boolean(touched.action && errors.action)}
                          helperText={touched.action && errors.action}
                        /> */
                        }

                         <Select 
                          labelId='action'
                          id='action'
                          placeholder='Select Action'
                          {...getFieldProps('action')}
                          onChange={(event) => setFieldValue('action', event.target.value)}
                        >
                          <MenuItem value={'Hotel'}>Hotel</MenuItem>
                          <MenuItem value={'Flight'}>Flight</MenuItem>
                          <MenuItem value={'Flat'}>Flat</MenuItem>
                          <MenuItem value={'Villa'}>Villa</MenuItem>
                          <MenuItem value={'Taxi'}>Taxi</MenuItem>

                        </Select>

                      </Stack>
                    </Grid>
                         
                           
                    
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="bookingDate">Booking Date</InputLabel>
                        {/* <TextField
                          fullWidth
                          id="bookingDate"
                          placeholder="Enter Booking Date"
                          {...getFieldProps('bookingDate')}
                          error={Boolean(touched.bookingDate && errors.bookingDate)}
                          helperText={touched.bookingDate && errors.bookingDate}
                        /> */}


                            
                          {//THIS IS THE DATE PICKER. 
                          
                          /* <FormControl fullWidth>
                          <DesktopDatePicker
                          inputFormat="dd/MM/yyyy"
                          format="dd/MM/yyyy"
                          
                          value={formik.values.bookingDate}
                          onChange={(newValue) => {
                            setFieldValue('bookingDate', newValue);
                          }}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                          ////minDate={new Date()}
                          error={Boolean(touched.bookingDate && errors.bookingDate)}
                          helperText={touched.bookingDate && errors.bookingDate}
                        />
                        
                      </FormControl> */}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="adminApproval"> Admin Approval </InputLabel>
                        {/* <TextField
                          fullWidth
                          id="adminApproval"
                          placeholder="Enter Admin Approval"
                          {...getFieldProps('adminApproval')}
                          error={Boolean(touched.adminApproval && errors.adminApproval)}
                          helperText={touched.adminApproval && errors.adminApproval}
                        /> */}

<Select 
                          labelId='Admin Approval'
                          id='adminApproval'
                          placeholder='Select Approval'
                          {...getFieldProps('adminApproval')}
                          onChange={(event) => setFieldValue('adminApproval', event.target.value)}
                        >
                          <MenuItem value={'true'}>Yes</MenuItem>
                          <MenuItem value={'false'}>No</MenuItem>
                          

                        </Select>
                      </Stack>
                    </Grid>

                  </Grid>



                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {booking && (
                    <Tooltip title="Delete Booking" placement="top">
                      <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                        <DeleteFilled />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {booking ? 'Edit' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
        
      </FormikProvider>
      {booking &&
       <AlertBookingDelete 
            id={booking._id}
            title={booking.bookingID} 
            open={openAlert}
            handleClose={handleAlertClose} 
        />}
    </>
  );
};

FormBookingAdd.propTypes = {
  booking: PropTypes.object,
  closeModal: PropTypes.func
};

export default FormBookingAdd;
