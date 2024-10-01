// import PropTypes from 'prop-types';
// import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// // material-ui
// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   FormHelperText,
//   Grid,
//   Link,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Stack,
//   Typography
// } from '@mui/material';

// // third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';
// import { preload } from 'swr';

// // project import
// import useAuth from 'hooks/useAuth';
// import useScriptRef from 'hooks/useScriptRef';
// import IconButton from 'components/@extended/IconButton';
// import AnimateButton from 'components/@extended/AnimateButton';
// import { fetcher } from 'utils/axios';

// // assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// // ============================|| JWT - LOGIN ||============================ //

// const AuthLogin = ({ isDemo = false }) => {
//   const [checked, setChecked] = React.useState(false);

//   const { login } = useAuth();
//   const scriptedRef = useScriptRef();

//   const [showPassword, setShowPassword] = React.useState(false);
//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <>
//       <Formik
//         initialValues={{
//           email: 'info@codedthemes.com',
//           password: '123456',
//           submit: null
//         }}
//         validationSchema={Yup.object().shape({
//           email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//           password: Yup.string().max(255).required('Password is required')
//         })}
//         onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//           try {
//             await login(values.email, values.password);
//             if (scriptedRef.current) {
//               setStatus({ success: true });
//               setSubmitting(false);
//               preload('api/menu/dashboard', fetcher); // load menu on login success
//             }
//           } catch (err) {
//             console.error(err);
//             if (scriptedRef.current) {
//               setStatus({ success: false });
//               setErrors({ submit: err.message });
//               setSubmitting(false);
//             }
//           }
//         }}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="email-login">Email Address</InputLabel>
//                   <OutlinedInput
//                     id="email-login"
//                     type="email"
//                     value={values.email}
//                     name="email"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter email address"
//                     fullWidth
//                     error={Boolean(touched.email && errors.email)}
//                   />
//                 </Stack>
//                 {touched.email && errors.email && (
//                   <FormHelperText error id="standard-weight-helper-text-email-login">
//                     {errors.email}
//                   </FormHelperText>
//                 )}
//               </Grid>
//               <Grid item xs={12}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="password-login">Password</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.password && errors.password)}
//                     id="-password-login"
//                     type={showPassword ? 'text' : 'password'}
//                     value={values.password}
//                     name="password"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                           edge="end"
//                           color="secondary"
//                         >
//                           {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     placeholder="Enter password"
//                   />
//                 </Stack>
//                 {touched.password && errors.password && (
//                   <FormHelperText error id="standard-weight-helper-text-password-login">
//                     {errors.password}
//                   </FormHelperText>
//                 )}
//               </Grid>

//               <Grid item xs={12} sx={{ mt: -1 }}>
//                 <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={checked}
//                         onChange={(event) => setChecked(event.target.checked)}
//                         name="checked"
//                         color="primary"
//                         size="small"
//                       />
//                     }
//                     label={<Typography variant="h6">Keep me sign in</Typography>}
//                   />
//                   <Link variant="h6" component={RouterLink} to={isDemo ? '/auth/forgot-password' : '/forgot-password'} color="text.primary">
//                     Forgot Password?
//                   </Link>
//                 </Stack>
//               </Grid>
//               {errors.submit && (
//                 <Grid item xs={12}>
//                   <FormHelperText error>{errors.submit}</FormHelperText>
//                 </Grid>
//               )}
//               <Grid item xs={12}>
//                 <AnimateButton>
//                   <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
//                     Login
//                   </Button>
//                 </AnimateButton>
//               </Grid>
//             </Grid>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// };

// AuthLogin.propTypes = {
//   isDemo: PropTypes.bool
// };

// export default AuthLogin;



import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import FirebaseSocial from './FirebaseSocial';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { useFirebase } from 'contexts/FirebaseContextUpdated';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const { t, i18n } = useTranslation();
  const [checked, setChecked] = React.useState(false);
  const [capsWarning, setCapsWarning] = React.useState(false);

  const { isLoggedIn, firebaseEmailPasswordSignIn } = useAuth();
  const scriptedRef = useScriptRef();
  const { login } = useFirebase();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const loginRes = await login(values.email, values.password);
            console.log('Login response:', loginRes);
            if (loginRes.success) {
              if (scriptedRef.current) {
                console.log('Login success');
                setStatus({ success: true });
                setSubmitting(false);
              }
            } else {
              if (scriptedRef.current) {
                console.error('Login failed:', loginRes.message);
                setStatus({ success: false });
                setErrors({ submit: loginRes.message });
                setSubmitting(false);
              }
            }
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
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">{t('Email Address')}</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={t("Enter email address")}
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">{t('Password')}</InputLabel>
                  <OutlinedInput
                    fullWidth
                    color={capsWarning ? 'warning' : 'primary'}
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={(event) => {
                      setCapsWarning(false);
                      handleBlur(event);
                    }}
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
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
                    placeholder={t("Enter password")}
                  />
                  {capsWarning && (
                    <Typography variant="caption" sx={{ color: 'warning.main' }} id="warning-helper-text-password-login">
                      {t('Caps lock on!')}
                    </Typography>
                  )}
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    {t('Login')}
                  </Button>
                </AnimateButton>
              </Grid>
              {/* <Grid item xs={12}>
                <Divider>
                  <Typography variant="caption"> Login with</Typography>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <FirebaseSocial />
              </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
