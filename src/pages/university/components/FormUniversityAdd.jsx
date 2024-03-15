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
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

// project imports
import AlertUniversityDelete from './AlertUniversityDelete';
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
import { CameraOutlined, CloseOutlined, DeleteFilled } from '@ant-design/icons';
import { dispatch } from 'store';
import { createUniversity, getUniversities, updateUniversity } from 'store/reducers/university';
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

// constant
const getInitialValues = (university) => {
  const newCustomer = {
    universityName: '',
    countryCode: ''
  };

  if (university) {
    return _.merge({}, newCustomer, university);
  }

  return newCustomer;
};


// ==============================|| CUSTOMER ADD / EDIT - FORM ||============================== //

const FormUniversityAdd = ({ university, closeModal }) => { 
  console.log("uni delete", university);
  const theme = useTheme();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(
    getImageUrl(`avatar-${university &&
       university !== null && 
       university?.avatar ? university.avatar : 1}.png`,
        ImagePath.USERS)
  );

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const UniversitySchema = Yup.object().shape({
    universityName: Yup.string().max(255).required('University Name is required'),
    countryCode: Yup.string().max(10).required('Country Code is required')
  });

  const defaultValues = useMemo(
    () => ({
      universityName: university? university.universityName : '',
      countryCode: university? university.countryCode : ''
    }), 
    [university]
  );

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    closeModal();
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: UniversitySchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("values uni new", values);
      try {
        let newUniversity = values;

        if (university) {
          dispatch(updateUniversity(university._id, newUniversity)).then(() => {
            openSnackbar({
              open: true,
              message: 'University update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            dispatch(getUniversities());
            closeModal();
          });
        } else {
          dispatch(createUniversity(values)).then(() => {
            openSnackbar({
              open: true,
              message: 'University added successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            dispatch(getUniversities());
            closeModal();
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    dispatch(getUniversities());
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
            <DialogTitle>{university ? 'Edit University' : 'New University'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 5.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="university-name">University Name</InputLabel>
                        <TextField
                          fullWidth
                          id="university-name"
                          placeholder="Enter University Name"
                          {...getFieldProps('universityName')}
                          error={Boolean(touched.universityName && errors.universityName)}
                          helperText={touched.universityName && errors.universityName}
                        />
                      </Stack>
                    </Grid>
                    {/* <Grid item xs={12} sm={3}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="customer-country-code">Country Code</InputLabel>
                        <TextField
                          fullWidth
                          id="customer-country-code"
                          placeholder="Enter Country Code"
                          {...getFieldProps('countryCode')}
                          error={Boolean(touched.countryCode && errors.countryCode)}
                          helperText={touched.countryCode && errors.countryCode}
                        />
                      </Stack>
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="customer-country-code">Country Code</InputLabel>
                      <Autocomplete
                        id="customer-country-code"
                        options={countries}
                        getOptionLabel={(option) => option.phone}
                        value={countries.find(country => country.phone === formik.values.countryCode) || null}
                        onChange={(event, newValue) => {
                          console.log("new value", newValue);
                          // getFieldProps('countryCode').onChange(newValue ? newValue.phone : '');
                          setFieldValue('countryCode',newValue?.phone || '');
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            id="customer-country-code"
                            placeholder="Enter Country Code"
                            error={Boolean(touched.countryCode && errors.countryCode)}
                            helperText={touched.countryCode && errors.countryCode}
                            fullWidth
                          />
                        )}

                        renderOption={(props, option) => {
                          const { code, label, phone } = option;
                          return (
                            <li {...props} key={label}>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Icon icon={`circle-flags:${code.toLowerCase()}`} width={28} style={{marginRight:10}} />
                                {label} ({code}) {phone}
                              </Box>
                            </li>
                          );
                        }}
                      />
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
                  {university && (
                    <Tooltip title="Delete University" placement="top">
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
                      {university ? 'Edit' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {university &&
       <AlertUniversityDelete 
            id={university._id}
            title={university.universityName} 
            open={openAlert}
            handleClose={handleAlertClose} 
        />}
    </>
  );
};

FormUniversityAdd.propTypes = {
  university: PropTypes.object,
  closeModal: PropTypes.func
};

export default FormUniversityAdd;
