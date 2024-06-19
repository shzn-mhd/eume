import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { useEffect, useState } from 'react';
import AnimateButton from 'components/@extended/AnimateButton';
import IconButton from 'components/@extended/IconButton';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { doc, updateDoc } from 'firebase/firestore';
import { updateEmail, updatePassword } from 'firebase/auth';
import { db } from 'config/firebase';

const roles = ['Admin', 'User'];

export default function NewUserForm({ setEmpList, handleClickClose, user }) {
  const { t, i18n } = useTranslation();
  const { firebaseRegister, resetPassword } = useAuth();
  const scriptedRef = useScriptRef();

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const getUser = async (auth, userId) => {
    const user = auth.currentUser;
    if (user && user.uid === userId) {
      return user;
    } else {
      throw new Error('User not found or user is not authenticated');
    }
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <DialogContent>
        <Formik
          initialValues={{
            firstname: user?.firstName || '',
            lastname: user?.lastName || '',
            email: user?.email || '',
            company: user?.company || '',
            password: '',
            role: user?.role || '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            firstname: Yup.string().max(255).required('First Name is required'),
            lastname: Yup.string().max(255).required('Last Name is required'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            password: user ? Yup.string().max(255) : Yup.string().max(255).required('Password is required'),
            role: Yup.string().required('Role is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              //   await firebaseRegister(values.email, values.password, values.firstname, values.lastname).then(
              //     () => {
              //       // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
              //       // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
              //       // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
              //       // github issue: https://github.com/formium/formik/issues/2430
              //     },
              //     (err) => {
              //       setStatus({ success: false });
              //       setErrors({ submit: err.message });
              //       setSubmitting(false);
              //     }
              //   );
              if (user) {
                const userDoc = doc(db, 'users', user.id);
                console.log('userDoc', userDoc);
                // Collect the fields to update
                const updateData = {
                  // email: values.email,
                  firstName: values.firstname,
                  lastName: values.lastname,
                  role: values.role
                };

                await updateDoc(userDoc, updateData);
                // Update the user's email in Firebase Authentication
                // const userupdate = await getUser(auth, user.id);
                // if (userupdate.email !== values.email) {
                //   await updateEmail(userupdate, values.email);
                // }

                // Update the user's password in Firebase Authentication if it has been changed
                if (values.password) {
                  const authUser = getUser(auth, user.id);
                  await updatePassword(authUser, values.password);
                }

                // update the user list state
                setEmpList((prevList) => prevList.map((u) => (u.id === user.id ? { ...u, ...updateData } : u)));
              } else {
                const userCredential = await firebaseRegister(
                  values.email,
                  values.password,
                  values.firstname,
                  values.lastname,
                  values.role
                );
                const newUser = {
                  id: userCredential.user.uid,
                  firstName: values.firstname,
                  lastName: values.lastname,
                  email: values.email,
                  role: values.role
                };
                setEmpList((prevList) => [newUser, ...prevList]);
              }

              setStatus({ success: true });
              setSubmitting(false);
              handleClickClose();
            } catch (err) {
              console.error(err);
              if (scriptedRef.current) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                    <OutlinedInput
                      id="firstname-login"
                      type="firstname"
                      value={values.firstname}
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="John"
                      fullWidth
                      error={Boolean(touched.firstname && errors.firstname)}
                    />
                  </Stack>
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.lastname && errors.lastname)}
                      id="lastname-signup"
                      type="lastname"
                      value={values.lastname}
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Doe"
                      inputProps={{}}
                    />
                  </Stack>
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Grid>
                {/* <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="company-signup">Company</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.company && errors.company)}
                    id="company-signup"
                    value={values.company}
                    name="company"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Demo Inc."
                    inputProps={{}}
                  />
                </Stack>
                {touched.company && errors.company && (
                  <FormHelperText error id="helper-text-company-signup">
                    {errors.company}
                  </FormHelperText>
                )}
              </Grid> */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.email && errors.email)}
                      id="email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="demo@company.com"
                      inputProps={{}}
                    />
                  </Stack>
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="role-signup">Role*</InputLabel>
                    <FormControl fullWidth error={Boolean(touched.role && errors.role)}>
                      <Select id="role-signup" value={values.role} name="role" onBlur={handleBlur} onChange={handleChange} displayEmpty>
                        <MenuItem value="">
                          <em>Select Role</em>
                        </MenuItem>
                        {roles.map((role) => (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.role && errors.role && (
                      <FormHelperText error id="helper-text-role-signup">
                        {errors.role}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="password-signup">Password</InputLabel>
                    <OutlinedInput
                      fullWidth
                      error={Boolean(touched.password && errors.password)}
                      id="password-signup"
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        changePassword(e.target.value);
                      }}
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
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-signup">
                      {errors.password}
                    </FormHelperText>
                  )}
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>

                {errors.submit && (
                  <Grid item xs={12}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <DialogActions>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        {user ? t('Edit User') : t('Create Account')}
                      </Button>
                    </AnimateButton>
                  </DialogActions>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </DialogContent>
      {/* <DialogActions>
        <Button
          color="error"
          // onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          // onClick={handleClose}
        >
          Subscribe
        </Button>
      </DialogActions> */}
    </>
  );
}
