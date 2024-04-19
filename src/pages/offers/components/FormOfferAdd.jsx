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
import AlertOffersDelete from './AlertOfferDelete';
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
import { createOffer,  getOffers,  updateOffer} from 'store/reducers/offer';
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

const FormOfferAdd = ({ offer, closeModal }) => { 
  console.log("offer delete", offer);
  const theme = useTheme();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [avatar, setAvatar] = useState(
    getImageUrl(`avatar-${offer &&
      offer !== null && 
      offer?.avatar ? offer.avatar : 1}.png`,
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

  const OfferSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Name is required'),
    offerCode: Yup.string().max(50).required('Offer Code is required'),
    discount: Yup.number().required('Discount is required'),
    startDate: Yup.date().required('Start Date is required'),
    expDate: Yup.date().required('Expire Date is required'),
    timePeriod: Yup.string().max(50).required('Address is required'),
    note: Yup.string().max(255).required('Note is required'),
    promoCode: Yup.number().required('Discount is required'),
    adminApproval: Yup.boolean().required('Admin Approval is required')
  });

  const defaultValues = useMemo(
    () => ({

      name: offer? offer.name: '',
      offerCode: offer? offer.offerCode: '',
      discount: offer? offer.discount: '',
      startDate: offer? offer.startDate: '',
      expDate: offer? offer.expDate: '',
      timePeriod: offer? offer.timePeriod: '',
      note: offer? offer.note: '',
      promoCode: offer? offer.promoCode: '',
      adminApproval: offer? offer.adminApproval: '',
    }), 
    [offer]
  );

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    closeModal();
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: OfferSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {

    

      console.log("values uni new", values);
      try {
        let newOffer = values;

        if (offer) {
          dispatch(updateOffer(offer._id, newOffer)).then(() => {
            openSnackbar({
              open: true,
              message: 'Offer update successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            dispatch(getOffers());
            closeModal();
          });
        } else {
          dispatch(createOffer(values)).then(() => {
            openSnackbar({
              open: true,
              message: 'Offer added successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              }
            });
            setSubmitting(false);
            dispatch(getOffers());
            closeModal();
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

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
            <DialogTitle>{offer ? 'Edit Offer' : 'New Offer'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 5.5 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
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

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="offerCode">Offer Code</InputLabel>
                        <TextField
                          fullWidth
                          id="offerCode"
                          placeholder="Enter Offer Code"
                          {...getFieldProps('offerCode')}
                          error={Boolean(touched.offerCode && errors.offerCode)}
                          helperText={touched.offerCode && errors.offerCode}
                        />
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="discount">Discount</InputLabel>
                        <TextField
                          fullWidth
                          id="discount"
                          placeholder="Enter Discount"
                          {...getFieldProps('discount')}
                          error={Boolean(touched.discount && errors.discount)}
                          helperText={touched.discount && errors.discount}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="startDate">Start Date</InputLabel>
                        <TextField
                          fullWidth
                          id="startDate"
                          placeholder="Enter Start Date"
                          {...getFieldProps('startDate')}
                          error={Boolean(touched.startDate && errors.startDate)}
                          helperText={touched.startDate && errors.startDate}
                        />
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="expDate">Exp Date</InputLabel>
                        <TextField
                          fullWidth
                          id="expDate"
                          placeholder="Enter Exp Date"
                          {...getFieldProps('expDate')}
                          error={Boolean(touched.expDate && errors.expDate)}
                          helperText={touched.expDate && errors.expDate}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="timePeriod">Time Period</InputLabel>
                        <TextField
                          fullWidth
                          id="timePeriod"
                          placeholder="Enter Time Period"
                          {...getFieldProps('timePeriod')}
                          error={Boolean(touched.timePeriod && errors.timePeriod)}
                          helperText={touched.timePeriod && errors.timePeriod}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="note">Note</InputLabel>
                        <TextField
                          fullWidth
                          id="note"
                          placeholder="Enter Note"
                          {...getFieldProps('note')}
                          error={Boolean(touched.note && errors.note)}
                          helperText={touched.note && errors.note}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="promoCode">Promo Code</InputLabel>
                        <TextField
                          fullWidth
                          id="promoCode"
                          placeholder="Enter Promo Code"
                          {...getFieldProps('promoCode')}
                          error={Boolean(touched.promoCode && errors.promoCode)}
                          helperText={touched.promoCode && errors.promoCode}
                        />
                      </Stack>
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={1} sx={{pt:1}}>
                        <InputLabel htmlFor="adminApproval">Admin Approval</InputLabel>
                        <TextField
                          fullWidth
                          id="adminApproval"
                          placeholder="Enter Admin Approval"
                          {...getFieldProps('adminApproval')}
                          error={Boolean(touched.adminApproval && errors.adminApproval)}
                          helperText={touched.adminApproval && errors.adminApproval}
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
                  {offer && (
                    <Tooltip title="Delete Offer" placement="top">
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
                      {offer ? 'Edit' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
        
      </FormikProvider>
      {offer &&
       <AlertOffersDelete 
            id={offer._id}
            title={offer.Name} 
            open={openAlert}
            handleClose={handleAlertClose} 
        />}
    </>
  );
};
FormOfferAdd.propTypes = {
  offer: PropTypes.object,
  closeModal: PropTypes.func
};

export default FormOfferAdd;
