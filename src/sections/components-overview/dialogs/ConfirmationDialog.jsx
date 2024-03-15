import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup
} from '@mui/material';

const options = ['None', 'Atria', 'Callisto', 'Dione', 'Ganymede', 'Hangouts Call', 'Luna', 'Oberon', 'Phobos', 'Pyxis'];

// ==============================|| DIALOG - CONFIRMATION ||============================== //

function ConfirmationDialogRaw({ onClose, value: valueProp, open, ...other }) {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth={matchDownMD ? 'sm' : 'lg'}
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Phone Ringtone</DialogTitle>
      <DialogContent dividers>
        <RadioGroup row={!matchDownMD} ref={radioGroupRef} aria-label="ringtone" name="ringtone" value={value} onChange={handleChange}>
          {options.map((option) => (
            <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleOk} sx={{ mr: 0.5 }}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
};

export default function ConfirmationDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Hangouts Call');

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="div" role="group">
        <ListItemButton divider disabled>
          <ListItemText primary="Interruptions" />
        </ListItemButton>
        <ListItemButton
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="phone ringtone"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Phone Ringtone" secondary={value} />
        </ListItemButton>
        <ListItemButton divider disabled>
          <ListItemText primary="Default Notification Ringtone" secondary="Tethys" />
        </ListItemButton>
        <ConfirmationDialogRaw id="ringtone-menu" keepMounted open={open} onClose={handleClose} value={value} />
      </List>
    </Box>
  );
}
