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
// import AlertUniversityDelete from './AlertUniversityDelete';
import AlertAdminDelete from './AlertAdminDelete';
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
// import { createUniversity, getUniversities, updateUniversity } from 'store/reducers/university';
import { createAdmin, getAdmins, updateAdmin } from 'store/reducers/admin';
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
const getInitialValues = (admin) => {
  const newCustomer = {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    userName: '',
    password: '',
    commissionRate: ''
  };

  if (admin) {
    return _.merge({}, newCustomer, admin);
  }

  return newCustomer;
};


// ==============================|| CUSTOMER ADD / EDIT - FORM ||============================== //

const FormAdminAdd = ({ admin, closeModal }) => { 
  console.log("admin delete", admin);
  const theme = useTheme();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(
    getImageUrl(`avatar-${admin &&
       admin !== null && 
       admin?.avatar ? admin.avatar : 1}.png`,
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

  const AdminSchema = Yup.object().shape({
    firstName: Yup.string().max(255).required('First Name is required'),
    lastName: Yup.string().max(255).required('Last Name is required'),
    role: Yup.string().max(25).required('Role is required'),
    email: Yup.string().email().required('Email is required'),
    username: Yup.string().max(25).required('Username is required'),
    password: Yup.string().max(255).required('Password is required'),
    commissionRate: Yup.number().required('Commission Rate is required')
  });

  const defaultValues = useMemo(
    () => ({

      firstName: admin? admin.firstName: '',
      lastName: admin? admin.lastName: '',
      role: admin? admin.role: 'ADMIN',
      email: admin? admin.email: '',
      username: admin? admin.username: '',
      password: admin? admin.password: '',
      commissionRate: admin? admin.commissionRate: ''
    }), 
    [admin]
  );

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    closeModal();
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: AdminSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("values uni new", values);
      try {
        let newAdmin = values;

        if (admin) {
          dispatch(updateAdmin(admin._id, newAdmin)).then(() => {
            openSnackbar({
              open: true,
              message: 'System Admin update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            dispatch(getAdmins());
            closeModal();
          });
        } else {
          dispatch(createAdmin(values)).then(() => {
            openSnackbar({
              open: true,
              message: 'System Admin added successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            dispatch(getAdmins());
            closeModal();
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    dispatch(getAdmins());
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
            <DialogTitle>{admin ? 'Edit Admin' : 'New Admin'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 5.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <TextField
                          fullWidth
                          id="firstName"
                          placeholder="Enter First Name"
                          {...getFieldProps('firstName')}
                          error={Boolean(touched.firstName && errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <TextField
                          fullWidth
                          id="lastName"
                          placeholder="Enter Last Name"
                          {...getFieldProps('lastName')}
                          error={Boolean(touched.lastName && errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Stack>
                    </Grid>
                    
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="role">Role</InputLabel>
                        <TextField
                          fullWidth
                          id="role"
                          placeholder="Enter Role"
                          {...getFieldProps('role')}
                          error={Boolean(touched.role && errors.role)}
                          helperText={touched.role && errors.role}
                        />
                      </Stack>
                    </Grid>
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
                    
                  </Grid>

                  <Grid container spacing={3}>
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
                        <TextField
                          fullWidth
                          id="password"
                          placeholder="Enter password"
                          {...getFieldProps('password')}
                          error={Boolean(touched.password && errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </Stack>
                    </Grid>
                    
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="commissionRate">Commission Rate</InputLabel>
                        <TextField
                          fullWidth
                          id="commissionRate"
                          placeholder="Enter Commission Rate"
                          {...getFieldProps('commissionRate')}
                          error={Boolean(touched.commissionRate && errors.commissionRate)}
                          helperText={touched.commissionRate && errors.commissionRate}
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
                  {admin && (
                    <Tooltip title="Delete Admin" placement="top">
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
                      {admin ? 'Edit' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {admin &&
       <AlertAdminDelete 
            id={admin._id}
            title={admin.firstName} 
            open={openAlert}
            handleClose={handleAlertClose} 
        />}
    </>
  );
};

FormAdminAdd.propTypes = {
  admin: PropTypes.object,
  closeModal: PropTypes.func
};

export default FormAdminAdd;
