import { CloseOutlined } from '@ant-design/icons';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import MainCard from 'components/MainCard';
import SimpleBar from 'components/third-party/SimpleBar';
import { useTranslation } from 'react-i18next';

const Filter = ({
  open,
  empList,
  handleDrawerOpen,
  ResetTable,
  selectedRole,
  setSelectedRole,
  basicSurveyView,
  setBasicSurveyView,
  basicSurveyAdd,
  setBasicSurveyAdd,
  basicSurveyEdit,
  setBasicSurveyEdit,
  basicSurveyDelete,
  setBasicSurveyDelete,
  optionalSurveyView,
  setoptionalSurveyView,
  optionalSurveyAdd,
  setoptionalSurveyAdd,
  optionalSurveyEdit,
  setoptionalSurveyEdit,
  optionalSurveyDelete,
  setoptionalSurveyDelete,
  userView,
  setuserView,
  userAdd,
  setuserAdd,
  userEdit,
  setuserEdit,
  userDelete,
  setuserDelete,
  rolesView,
  setrolesView,
  rolesAdd,
  setrolesAdd,
  rolesEdit,
  setrolesEdit,
  rolesDelete,
  setrolesDelete
}) => {
  const theme = useTheme();
  const acc = ['Enable', 'Disable'];
  const permissions = [
    { value: true, lable: 'Enable' },
    { value: false, lable: 'Disable' }
  ];
  const { t, i18n } = useTranslation();

  return (
    <Drawer
      sx={{
        ml: open ? 3 : 0,
        flexShrink: 0,
        zIndex: 1200,
        overflowX: 'hidden',
        width: { xs: 320, md: 450 },
        '& .MuiDrawer-paper': {
          width: { xs: 320, md: 420 },
          border: 'none',
          borderRadius: '20px',
          margin: '30px',
          maxHeight: '820px'
        }
      }}
      variant="temporary"
      anchor="right"
      open={open}
      ModalProps={{ keepMounted: true }}
      onClose={() => {
        handleDrawerOpen();
      }}
    >
      {open && (
        <SimpleBar
          sx={{
            overflowX: 'hidden',
            height: '100vh'
          }}
        >
          <Box sx={{ p: 2 }}>
            <Grid container alignItems="center" spacing={0.5} justifyContent="space-between">
              <Grid item sx={{ width: '100%' }}>
                <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="space-between">
                  <Typography
                    variant="h4"
                    sx={{
                      display: 'inline-block',
                      width: 'calc(100% - 34px)',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      verticalAlign: 'middle'
                    }}
                  >
                    {t('Filtering Options')}
                  </Typography>
                  <Tooltip title="Close">
                    <IconButton color="secondary" onClick={handleDrawerOpen} size="small" sx={{ fontSize: '0.875rem' }}>
                      <CloseOutlined />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Stack padding={2}>
            <MainCard contentSX={{ p: 2.25 }}>
              <Stack spacing={0.5}>
                <Typography variant="h6" color="textSecondary">
                  {t('Total Roles')}
                </Typography>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography variant="h4" color="inherit">
                      {empList.length}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </MainCard>
          </Stack>

          <Box sx={{ p: 1, alignItems: 'center', justifyContent: 'center', maxHeight: '550px', overflowY: 'auto' }}>
            <Stack direction="column" spacing={3} justifyContent="center" sx={{ p: 1 }}>
              <FormControl style={{ display: 'flex' }}>
                <Typography variant="h5">{t('Role Status')}</Typography>
                <Stack direction="row">
                  {acc.map((accOption) => (
                    <Button
                      id="acc"
                      key={accOption}
                      getOptionLabel={(option) => option}
                      value={acc.find((option) => option === selectedRole) || null}
                      onChange={(event, newValue) => {
                        setSelectedRole(newValue ? newValue : null);
                      }}
                      //   variant="contained"
                      size="small"
                      onClick={() => setSelectedRole(accOption ? accOption : null)}
                      sx={{
                        marginRight: 1,
                        marginTop: 2,
                        borderRadius: 50,
                        backgroundColor: selectedRole === accOption ? 'black' : `${theme.palette.grey[300]}`,
                        color: selectedRole === accOption ? 'white' : 'black'
                      }}
                    >
                      {accOption}
                    </Button>
                  ))}
                </Stack>
              </FormControl>
              <Typography variant="h4">{t('Role Permissions')}</Typography>

              <Typography variant="h5">{t('Basic Survey')}</Typography>
              <Grid container style={{ marginTop: 3 }} md={12}>
                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('View')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="view-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === basicSurveyView) || null}
                          onChange={(event, newValue) => {
                            setBasicSurveyView(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setBasicSurveyView(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: basicSurveyView === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: basicSurveyView === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>

                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Add')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="add-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === basicSurveyAdd) || null}
                          onChange={(event, newValue) => {
                            setBasicSurveyAdd(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setBasicSurveyAdd(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: basicSurveyAdd === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: basicSurveyAdd === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container md={12}>
                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Edit')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="edit-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === basicSurveyEdit) || null}
                          onChange={(event, newValue) => {
                            setBasicSurveyEdit(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setBasicSurveyEdit(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: basicSurveyEdit === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: basicSurveyEdit === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>

                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Delete')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="view-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === basicSurveyDelete) || null}
                          onChange={(event, newValue) => {
                            setBasicSurveyDelete(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setBasicSurveyDelete(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: basicSurveyDelete === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: basicSurveyDelete === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>
              </Grid>

              <Divider />
              <Typography variant="h5">{t('Optional Survey')}</Typography>
              <Grid container style={{ marginTop: 3 }} md={12}>
                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('View')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="view-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === optionalSurveyView) || null}
                          onChange={(event, newValue) => {
                            setoptionalSurveyView(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setoptionalSurveyView(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: optionalSurveyView === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: optionalSurveyView === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>

                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Add')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="add-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === optionalSurveyAdd) || null}
                          onChange={(event, newValue) => {
                            setoptionalSurveyAdd(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setoptionalSurveyAdd(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: optionalSurveyAdd === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: optionalSurveyAdd === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container md={12}>
                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Edit')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="edit-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === optionalSurveyEdit) || null}
                          onChange={(event, newValue) => {
                            setoptionalSurveyEdit(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setoptionalSurveyEdit(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: optionalSurveyEdit === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: optionalSurveyEdit === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>

                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Delete')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="view-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === optionalSurveyDelete) || null}
                          onChange={(event, newValue) => {
                            setoptionalSurveyDelete(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setoptionalSurveyDelete(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: optionalSurveyDelete === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: optionalSurveyDelete === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>
              </Grid>

              <Divider />

              <Typography variant="h5">{t('Users')}</Typography>
              <Grid container style={{ marginTop: 3 }} md={12}>
                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('View')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="view-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === userView) || null}
                          onChange={(event, newValue) => {
                            setuserView(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setuserView(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: userView === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: userView === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>

                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Add')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="add-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === userAdd) || null}
                          onChange={(event, newValue) => {
                            setuserAdd(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setuserAdd(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: userAdd === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: userAdd === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container md={12}>
                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Edit')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="edit-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === userEdit) || null}
                          onChange={(event, newValue) => {
                            setuserEdit(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setuserEdit(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: userEdit === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: userEdit === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>

                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Delete')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="view-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === userDelete) || null}
                          onChange={(event, newValue) => {
                            setuserDelete(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setuserDelete(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: userDelete === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: userDelete === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>
              </Grid>

              <Divider />

              <Typography variant="h5">{t('User Roles')}</Typography>
              <Grid container style={{ marginTop: 3 }} md={12}>
                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('View')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="view-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === rolesView) || null}
                          onChange={(event, newValue) => {
                            setrolesView(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setrolesView(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: rolesView === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: rolesView === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>

                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Add')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="add-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === rolesAdd) || null}
                          onChange={(event, newValue) => {
                            setrolesAdd(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setrolesAdd(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: rolesAdd === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: rolesAdd === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container md={12}>
                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Edit')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="edit-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === rolesEdit) || null}
                          onChange={(event, newValue) => {
                            setrolesEdit(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setrolesEdit(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: rolesEdit === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: rolesEdit === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>

                <Grid md={6}>
                  <FormControl style={{ display: 'flex' }}>
                    <Typography variant="h5">{t('Delete')}</Typography>
                    <Stack direction="row">
                      {permissions.map((permission) => (
                        <Button
                          id="view-acc"
                          key={permission.lable}
                          getOptionLabel={(option) => option.lable}
                          value={permissions.find((option) => option.value === rolesDelete) || null}
                          onChange={(event, newValue) => {
                            setrolesDelete(newValue ? newValue.value : null);
                          }}
                          size="small"
                          onClick={() => setrolesDelete(permission.value)}
                          sx={{
                            marginRight: 1,
                            // marginTop: 2,
                            borderRadius: 50,
                            backgroundColor: rolesDelete === permission.value ? 'black' : `${theme.palette.grey[300]}`,
                            color: rolesDelete === permission.value ? 'white' : 'black'
                          }}
                        >
                          {permission.lable}
                        </Button>
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>
              </Grid>
            </Stack>
          </Box>
          <Divider />
          <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between" padding={2}>
            <Tooltip title="Reset Filter">
              <Button size="small" sx={{ minWidth: '130px', minHeight: '41.13px' }} color="error" variant="contained" onClick={ResetTable}>
                {t('Reset Filter')}
              </Button>
            </Tooltip>
            <Tooltip title="Filter">
              <Button
                size="small"
                sx={{ minWidth: '130px', minHeight: '41.13px' }}
                color="primary"
                variant="contained"
                onClick={handleDrawerOpen}
              >
                {t('Filter')}
              </Button>
            </Tooltip>
          </Stack>
        </SimpleBar>
      )}
    </Drawer>
  );
};

export default Filter;
