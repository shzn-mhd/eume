import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
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
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { updateEmail, updatePassword } from 'firebase/auth';
import { db } from 'config/firebase';

const roles = ['Enable', 'Disable'];
const accessTypes = ['Basic Survey', 'Optional Survey', 'Users', 'Roles'];
const municipalityList = ['Cabanas', 'A Capela', 'Monfero', 'Pontedeume', 'As Pontes'];

export default function NewUserForm({ setEmpList, handleClickClose, role }) {
  const { t, i18n } = useTranslation();
  const scriptedRef = useScriptRef();

  return (
    <>
      <DialogContent>
        <Formik
          initialValues={{
            roleName: role?.roleName || '',
            roleStatus: role?.roleStatus || 'Enable',
            permissions: role?.permissions || {
              'Basic Survey': { view: false, add: false, edit: false, delete: false, viewCreatedByThem: false },
              'Optional Survey': { view: false, add: false, edit: false, delete: false, viewCreatedByThem: false },
              Cabanas: { view: false, add: false, edit: false, delete: false, viewCreatedByThem: false },
              Users: { view: false, add: false, edit: false, delete: false, viewCreatedByThem: false },
              Roles: { view: false, add: false, edit: false, delete: false, viewCreatedByThem: false }
            },
            municipality: role?.municipality || [],
            submit: null
          }}
          validationSchema={Yup.object().shape({
            roleName: Yup.string().required('Role Name is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              if (role) {
                // logic for edit existing role in firestore
                const roleDocRef = doc(db, 'roles', role.id);
                await updateDoc(roleDocRef, {
                  roleName: values.roleName,
                  roleStatus: values.roleStatus,
                  permissions: values.permissions,
                  municipality: values.municipality
                });
                setEmpList((prevEmpList) => prevEmpList.map((item) => (item.id === role.id ? { id: role.id, ...values } : item)));
              } else {
                console.log("role values", values);
                // logic for create new role in firestore
                const newRoleRef = await addDoc(collection(db, 'roles'), {
                  roleName: values.roleName,
                  roleStatus: values.roleStatus,
                  permissions: values.permissions,
                  municipality: values.municipality
                });
                // console.log('New role added: ', newRoleRef);
                // Update the empList in the parent component
                setEmpList((prevEmpList) => [{ id: newRoleRef.id, ...values }, ...prevEmpList]);
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
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="firstname-signup">{t('Role Name')}*</InputLabel>
                    <OutlinedInput
                      id="firstname-login"
                      type="roleName"
                      value={values.roleName}
                      name="roleName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="John"
                      fullWidth
                      error={Boolean(touched.roleName && errors.roleName)}
                    />
                  </Stack>
                  {touched.roleName && errors.roleName && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.roleName}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="role-signup">{t('Role Status')}*</InputLabel>
                    <FormControl fullWidth error={Boolean(touched.roleStatus && errors.roleStatus)}>
                      <Select
                        id="role-signup"
                        value={values.roleStatus}
                        name="roleStatus"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em>{t('Select Role Status')}</em>
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
                <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="role-signup">{t('Municipality')}</InputLabel>
                    {/* <FormControl fullWidth error={Boolean(touched.municipality && errors.municipality)}>
                      <Select
                        id="municipality-signup"
                        value={values.municipality}
                        name="municipality"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        displayEmpty
                      >
                        <MenuItem value="">
                          <em>{t('Select Municipality')}</em>
                        </MenuItem>
                        {municipalityList.map((municipality) => (
                          <MenuItem key={municipality} value={municipality}>
                            {municipality}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}
                    <FormControl fullWidth error={Boolean(touched.municipality && errors.municipality)}>
                      <Autocomplete
                        multiple
                        id="checkboxes-tags-demo"
                        options={municipalityList}
                        value={values.municipality}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option}
                        onChange={(event, newValue) => setFieldValue('municipality', newValue)}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox style={{ marginRight: 8 }} checked={selected} />
                            {option}
                          </li>
                        )}
                        renderInput={(params) => <TextField {...params} placeholder={t('Select Municipality')} />}
                        sx={{
                          // '& .MuiOutlinedInput-root': {
                          //   p: 1
                          // },
                          '& .MuiAutocomplete-tag': {
                            bgcolor: 'primary.lighter',
                            border: '1px solid',
                            borderColor: 'primary.light',
                            '& .MuiSvgIcon-root': {
                              color: 'primary.main',
                              '&:hover': {
                                color: 'primary.dark'
                              }
                            }
                          }
                        }}
                      />
                    </FormControl>
                    {touched.municipality && errors.municipality && (
                      <FormHelperText error id="helper-text-municipality-signup">
                        {errors.municipality}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>





             

<TableContainer component={Paper} sx={{ marginTop: 4 }}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell align="left">{t('Access')}</TableCell>
        <TableCell align="center">{t('View')}</TableCell>
        <TableCell align="center">{t('Add')}</TableCell>
        <TableCell align="center">{t('Edit')}</TableCell>
        <TableCell align="center">{t('Delete')}</TableCell>
        <TableCell align="center">{t('Import data')}</TableCell>
        <TableCell align="center">{t('Export data')}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {accessTypes.map((accessType) => (
        <TableRow key={accessType}>
          <TableCell component="th" scope="row">
            {t(accessType)}
          </TableCell>
          {['view', 'add', 'edit', 'delete', 'importData', 'exportData'].map((permissionType) => {
            // Conditionally render checkboxes
            if (
              ((accessType === 'Users' || accessType === 'Roles') && 
              (permissionType === 'importData' || permissionType === 'exportData')) ||
              ((accessType === 'Basic Survey' || accessType === 'Optional Survey') && 
              (permissionType === 'add' || permissionType === 'edit'))
            ) {
              return <TableCell key={permissionType} align="center"></TableCell>;
            }
            return (
              <TableCell key={permissionType} align="center">
                <Checkbox
                  checked={values.permissions[accessType][permissionType]}
                  onChange={(e) => setFieldValue(`permissions.${accessType}.${permissionType}`, e.target.checked)}
                />
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>








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
                        {role ? t('Edit Role') : t('Create Role')}
                      </Button>
                    </AnimateButton>
                  </DialogActions>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
}
