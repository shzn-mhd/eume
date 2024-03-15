// material-ui
import { Button, Grid, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, Stack } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

/**
 * 'Select your favorite color'
 * yup.string Expected 0 arguments, but got 1 */
const validationSchema = yup.object({
  color: yup.string().required('Color selection is required')
});

// ==============================|| FORM VALIDATION - RADIO GROUP FORMIK ||============================== //

const RadioGroupForms = () => {
  const formik = useFormik({
    initialValues: {
      color: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('select form submit - ', values);
      openSnackbar({
        open: true,
        message: 'Radio - Submit Success',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      });
    }
  });

  return (
    <MainCard title="Radio">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item>
            <FormControl>
              <RadioGroup row aria-label="color" value={formik.values.color} onChange={formik.handleChange} name="color" id="color">
                <FormControlLabel value="primary" control={<Radio />} label="Primary" />
                <FormControlLabel value="error" control={<Radio color="error" />} label="Error" />
                <FormControlLabel value="secondary" control={<Radio color="secondary" />} label="Secondary" />
              </RadioGroup>
            </FormControl>
            {formik.errors.color && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {' '}
                {formik.errors.color}{' '}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
};

export default RadioGroupForms;
