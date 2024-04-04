import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
// import AlertUniversityDelete from './AlertUniversityDelete';
import AlertAccommodationDelete from './AlertAccommodationDelete';
// import //AlertUniversityDelete from './AlertUniversityDelete';
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
// import { createUniversity, getUniversities, updateUniversity } from 'store/reducers/university';
import { createAccommodation,  getAccommodations,  updateAccommodation} from 'store/reducers/accommodation';
import { useDispatch } from 'store';
import countries from 'data/countries';
import { Icon } from '@iconify/react';
import { event } from 'jquery';


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

const FormAccommodationAdd = ({ accommodation, closeModal }) => { 
  console.log("accommodation delete", accommodation);
  const theme = useTheme();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(
    getImageUrl(`avatar-${accommodation &&
      accommodation !== null && 
      accommodation?.avatar ? accommodation.avatar : 1}.png`,
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

  const AccommodationSchema = Yup.object().shape({
    type: Yup.string([]).max(25).required('Type is required'),
    name: Yup.string().max(255).required('Name is required'),
    address: Yup.string().max(255).required('Address is required'),
    city: Yup.string().max(50).required('City is required'),
    country: Yup.string().max(50).required('Country is required'),
    description: Yup.string().max(255).required('Description is required'),
    //amenities: Yup.string().max(255).required('Amenities is required'),
    amenities: Yup.array().of(Yup.string().max(50)).required('Amenities are required'),
    contactNumber: Yup.number().required('Contact Number is required'),
    email: Yup.string().email().required('Email is required'),
    websiteLink: Yup.string().max(255).required('Website Link is required'),
    rating: Yup.number().required('Rating is required'),
    numberOfRooms: Yup.number().required('Number of Rooms is required'),
    images: Yup.array().of(Yup.string().max(255)).required('Images are required'),
    //images: Yup.string().max(255).required('Images is required'),
    owner: Yup.string().max(50).required('Owner is required')
  });

  const defaultValues = useMemo(
    () => ({

      type: accommodation? accommodation.type: '',
      name: accommodation? accommodation.name: '',
      address: accommodation? accommodation.address: '',
      city: accommodation? accommodation.city: '',
      country: accommodation? accommodation.country: '',
      description: accommodation? accommodation.description: '',
      amenities: accommodation? accommodation.amenities: [],//give array type input
      contactNumber: accommodation? accommodation.contactNumber: '',
      email: accommodation? accommodation.email: '',
      websiteLink: accommodation? accommodation.websiteLink: '',
      rating: accommodation? accommodation.rating: '',
      numberOfRooms: accommodation? accommodation.numberOfRooms: '',
      images: accommodation? accommodation.images: [],//give array type input
      owner: accommodation? accommodation.owner: ''
    }), 
    [accommodation]
  );

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    closeModal();
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: AccommodationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {

    

      console.log("values uni new", values);
      try {
        let newAccommodation = values;

        if (accommodation) {
          dispatch(updateAccommodation(accommodation._id, newAccommodation)).then(() => {
            openSnackbar({
              open: true,
              message: 'Hotel update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            dispatch(getAccommodations());
            closeModal();
          });
        } else {
          dispatch(createAccommodation(values)).then(() => {
            openSnackbar({
              open: true,
              message: 'Hotel added successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            dispatch(getAccommodations());
            closeModal();
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    dispatch(getAccommodations());
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
            <DialogTitle>{accommodation ? 'Edit Hotel' : 'New Hotel'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 5.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="type">Select Type</InputLabel>
                        <Select 
                          labelId='type'
                          id='type'
                          placeholder='Select Type'
                          {...getFieldProps('type')}
                          onChange={(event) => setFieldValue('type', event.target.value)}
                        >
                          <MenuItem value={'Hotel'}>Hotel</MenuItem>
                          <MenuItem value={'Villa'}>Villa</MenuItem>
                          <MenuItem value={'Flat'}>Flat</MenuItem>
                        </Select>
                        {/* <TextField
                          fullWidth
                          id="type"
                          placeholder="Enter Type"
                          {...getFieldProps('type')}
                          error={Boolean(touched.type && errors.type)}
                          helperText={touched.type && errors.type}
                        /> */}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <TextField
                          fullWidth
                          id="name"
                          placeholder="Enter Name"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <TextField
                          fullWidth
                          id="address"
                          placeholder="Enter Address"
                          {...getFieldProps('address')}
                          error={Boolean(touched.address && errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="city">City</InputLabel>
                        <TextField
                          fullWidth
                          id="city"
                          placeholder="Enter City"
                          {...getFieldProps('city')}
                          error={Boolean(touched.city && errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="country">Country</InputLabel>
                        <TextField
                          fullWidth
                          id="country"
                          placeholder="Enter Country"
                          {...getFieldProps('country')}
                          error={Boolean(touched.country && errors.country)}
                          helperText={touched.country && errors.country}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <TextField
                          fullWidth
                          id="description"
                          placeholder="Enter Description"
                          {...getFieldProps('description')}
                          error={Boolean(touched.description && errors.description)}
                          helperText={touched.description && errors.description}
                        />
                      </Stack>
                    </Grid>
                  </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="amenities">Amenities</InputLabel>
                    <Autocomplete
                      multiple
                      id="amenities"
                      options={[]}
                      value={formik.values.amenities} // Set the value directly from formik
                      onChange={(event, newValue) => {
                        formik.setFieldValue('amenities', newValue); // Update formik field value
                      }}
                      freeSolo
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Enter Amenities"
                        />
                      )}
                      error={Boolean(formik.touched.amenities && formik.errors.amenities)}
                      helperText={formik.touched.amenities && formik.errors.amenities}
                    />
                  </Stack>
                </Grid>


                  {/*<Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="amenities">Amenities</InputLabel>
                        <TextField
                          fullWidth
                          id="amenities"
                          placeholder="Enter Amenities (comma-separated)"
                          {...getFieldProps('amenities')}
                          error={Boolean(touched.amenities && errors.amenities)}
                          helperText={touched.amenities && errors.amenities}
                        />
                      </Stack>
                    </Grid>*/}

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="contactNumber">Contact Number</InputLabel>
                        <TextField
                          fullWidth
                          id="contactNumber"
                          placeholder="Enter Contact Number"
                          {...getFieldProps('contactNumber')}
                          error={Boolean(touched.contactNumber && errors.contactNumber)}
                          helperText={touched.contactNumber && errors.contactNumber}
                        />
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <TextField
                          fullWidth
                          id="email"
                          placeholder="Enter Email"
                          {...getFieldProps('email')}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="websiteLink">Website Link</InputLabel>
                        <TextField
                          fullWidth
                          id="websiteLink"
                          placeholder="Enter Website Link"
                          {...getFieldProps('websiteLink')}
                          error={Boolean(touched.websiteLink && errors.websiteLink)}
                          helperText={touched.websiteLink && errors.websiteLink}
                        />
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="rating">Rating</InputLabel>
                        <Select 
                          labelId='rating'
                          id='rating'
                          placeholder='Select Rating'
                          {...getFieldProps('rating')}
                          onChange={(event) => setFieldValue('rating', event.target.value)}
                        >
                          <MenuItem value={'1 Star'}>1 Star </MenuItem>
                          <MenuItem value={'2 Star'}>2 Star </MenuItem>
                          <MenuItem value={'3 Star'}>3 Star </MenuItem>
                          <MenuItem value={'4 Star'}>4 Star </MenuItem>
                          <MenuItem value={'5 Star'}>5 Star </MenuItem>

                        </Select>
                        {/* <TextField
                          fullWidth
                          id="rating"
                          placeholder="Enter Rating"
                          {...getFieldProps('rating')}
                          error={Boolean(touched.rating && errors.rating)}
                          helperText={touched.rating && errors.rating}
                        /> */}
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="numberOfRooms">Number of Rooms</InputLabel>
                        <TextField
                          fullWidth
                          id="numberOfRooms"
                          placeholder="Enter Number of Rooms"
                          {...getFieldProps('numberOfRooms')}
                          error={Boolean(touched.numberOfRooms && errors.numberOfRooms)}
                          helperText={touched.numberOfRooms && errors.numberOfRooms}
                        />
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="images">Images</InputLabel>
                        <TextField
                          fullWidth
                          id="images"
                          placeholder="Enter Images"
                          {...getFieldProps('images')}
                          error={Boolean(touched.images && errors.images)}
                          helperText={touched.images && errors.images}
                        />
                      </Stack>
                    </Grid>

                  {/*<Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="images">Images</InputLabel>
                        <TextField
                          fullWidth
                          id="images"
                          placeholder="Enter Images"
                          {...getFieldProps('images')}
                          error={Boolean(touched.images && errors.images)}
                          helperText={touched.images && errors.images}
                        />
                      </Stack>
                    </Grid>*/}

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="owner">Owner</InputLabel>
                        <TextField
                          fullWidth
                          id="owner"
                          placeholder="Enter Owner"
                          {...getFieldProps('owner')}
                          error={Boolean(touched.owner && errors.owner)}
                          helperText={touched.owner && errors.owner}
                        />
                      </Stack>
                    </Grid>
                  </Grid>

                  {/*<Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <TextField
                          fullWidth
                          id="username"
                          placeholder="Enter Username"
                          {...getFieldProps('username')}
                          error={Boolean(touched.username && errors.username)}
                          helperText={touched.username && errors.username}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        {/* <TextField
                          fullWidth
                          id="password"
                          placeholder="Enter password"
                          {...getFieldProps('password')}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                        />
                        
                        <OutlinedInput
                          fullWidth
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          // value={values.password}
                          name="password"
                          {...getFieldProps('password')}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                          // onBlur={handleBlur}
                          // onChange={(e) => {
                          //   handleChange(e);
                          //   changePassword(e.target.value);
                          // }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                color="secondary"
                              >
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="******"
                          inputProps={{}}
                      />
                        

                      </Stack>
                    </Grid>
                    
                  </Grid>*/}





                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {accommodation && (
                    <Tooltip title="Delete Hotel" placement="top">
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
                      {accommodation ? 'Edit' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
        
      </FormikProvider>
      {accommodation &&
       <AlertAccommodationDelete 
            id={accommodation._id}
            title={accommodation.Name} 
            open={openAlert}
            handleClose={handleAlertClose} 
        />}
    </>
  );
};
FormAccommodationAdd.propTypes = {
  accommodation: PropTypes.object,
  closeModal: PropTypes.func
};

export default FormAccommodationAdd;
