import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogTitle, Grid, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';
import { getImageUrl, ImagePath } from 'utils/getImageUrl';

// assets
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import Avatar from 'components/@extended/Avatar';

const emails = ['username@gmail.com', 'user02@gmail.com'];

// ==============================|| DIALOG - SIMPLE ||============================== //

function SimpleDialog({ onClose, selectedValue, open }) {
  const theme = useTheme();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
      >
        <Grid item>
          <DialogTitle>Set backup account</DialogTitle>
        </Grid>
        <Grid item sx={{ mr: 1.5 }}>
          <IconButton color="secondary" onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Grid>
      </Grid>

      <List sx={{ p: 2.5 }}>
        {emails.map((email, index) => (
          <ListItemButton selected={selectedValue === email} onClick={() => handleListItemClick(email)} key={email} sx={{ p: 1.25 }}>
            <ListItemAvatar>
              <Avatar src={getImageUrl(`avatar-${index + 1}.png`, ImagePath.USERS)} />
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItemButton>
        ))}
        <ListItemButton autoFocus onClick={() => handleListItemClick('addAccount')} sx={{ p: 1.25 }}>
          <ListItemAvatar>
            <Avatar size="sm">
              <PlusOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add Account" />
        </ListItemButton>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </>
  );
}
