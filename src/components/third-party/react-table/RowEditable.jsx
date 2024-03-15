import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, MenuItem, Select, Slider, Stack, TextField } from '@mui/material';

// third-party
import * as yup from 'yup';
import { Formik, Form } from 'formik';

// project-imports
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';

// assets
import { ThemeMode } from 'config';

// ==============================|| EDITABLE ROW ||============================== //

const RowEditable = ({ getValue: initialValue, row, column: { id, columnDef }, table }) => {
  const theme = useTheme();
  const [value, setValue] = useState(initialValue);
  const tableMeta = table.options.meta;

  const onChange = (e) => {
    setValue(e.target?.value);
  };

  const onBlur = () => {
    tableMeta.updateData(row.index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const ShowStatus = (value) => {
    switch (value) {
      case 'Complicated':
        return <Chip color="error" label="Complicated" size="small" variant="light" />;
      case 'Relationship':
        return <Chip color="success" label="Relationship" size="small" variant="light" />;
      case 'Single':
      default:
        return <Chip color="info" label="Single" size="small" variant="light" />;
    }
  };

  let element;
  let userInfoSchema;
  switch (id) {
    case 'email':
      userInfoSchema = yup.object().shape({
        userInfo: yup.string().email('Enter valid email ').required('Email is a required field')
      });
      break;
    case 'age':
      userInfoSchema = yup.object().shape({
        userInfo: yup
          .number()
          .typeError('Age must be number')
          .required('Age is required')
          .min(18, 'You must be at least 18 years')
          .max(65, 'You must be at most 65 years')
      });
      break;
    case 'visits':
      userInfoSchema = yup.object().shape({
        userInfo: yup.number().typeError('Visits must be number').required('Required')
      });
      break;
    default:
      userInfoSchema = yup.object().shape({
        userInfo: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is Required')
      });
      break;
  }

  const isEditable = tableMeta?.selectedRow[row.id];

  switch (columnDef.dataType) {
    case 'text':
      element = (
        <>
          {isEditable ? (
            <>
              <Formik
                initialValues={{
                  userInfo: value
                }}
                enableReinitialize
                validationSchema={userInfoSchema}
                onSubmit={() => {}}
              >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                  <Form>
                    <TextField
                      value={values.userInfo}
                      id={`${row.index}-${id}`}
                      name="userInfo"
                      onChange={(e) => {
                        handleChange(e);
                        onChange(e);
                      }}
                      onBlur={handleBlur}
                      error={touched.userInfo && Boolean(errors.userInfo)}
                      helperText={touched.userInfo && errors.userInfo && errors.userInfo}
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          py: 0.75,
                          px: 1,
                          backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                        }
                      }}
                    />
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            value
          )}
        </>
      );
      break;
    case 'select':
      element = (
        <>
          {isEditable ? (
            <Select
              labelId="editable-select-label"
              sx={{
                '& .MuiOutlinedInput-input': {
                  py: 0.75,
                  px: 1,
                  backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'inherit' : 'common.white'
                }
              }}
              id="editable-select"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              <MenuItem value="Complicated">
                <Chip color="error" label="Complicated" size="small" variant="light" />
              </MenuItem>
              <MenuItem value="Relationship">
                <Chip color="success" label="Relationship" size="small" variant="light" />
              </MenuItem>
              <MenuItem value="Single">
                <Chip color="info" label="Single" size="small" variant="light" />
              </MenuItem>
            </Select>
          ) : (
            ShowStatus(value)
          )}
        </>
      );
      break;
    case 'progress':
      element = (
        <>
          {isEditable ? (
            <>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ pl: 1, minWidth: 120 }}>
                <Slider
                  value={value}
                  min={0}
                  max={100}
                  step={1}
                  onBlur={onBlur}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                />
              </Stack>
            </>
          ) : (
            <div>
              <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
            </div>
          )}
        </>
      );
      break;
    default:
      element = <span></span>;
      break;
  }

  return element;
};

export default RowEditable;
