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

const Filter = ({ open, empList, handleDrawerOpen, ResetTable, selectedRole, setSelectedRole}) => {
  const theme = useTheme();
  const acc = ["Admin", "User"];
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
          maxHeight: '370px'
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
                    {t("Filtering Options")}
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
                  {t("Total Users")}
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

          <Box sx={{ p: 1, alignItems:'center',justifyContent:"center", maxHeight:'500px',overflowY:'auto'}}>
            <Stack direction="column" spacing={3} justifyContent="center" sx={{ p: 1 }}>
              <FormControl style={{ display: 'flex' }}>
                <Typography variant="h5">{t("User Role")}</Typography> 
                <Stack direction="row" justifyContent="center" >
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
            </Stack>
          </Box>
          <Divider />
          <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between" padding={2}>
            <Tooltip title="Reset Filter">
              <Button size="small" sx={{ minWidth: '130px', minHeight: '41.13px' }} color="error" variant="contained" onClick={ResetTable}>
                {t("Reset Filter")}
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
                {t("Filter")}
              </Button>
            </Tooltip>
          </Stack>
        </SimpleBar>
      )}
    </Drawer>
  );
};

export default Filter;
