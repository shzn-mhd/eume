import { forwardRef, useState } from 'react';

// material-ui
import {
  Avatar,
  AppBar,
  Button,
  Dialog,
  Divider,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Slide,
  Toolbar,
  Typography
} from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';

// assets
import { CloseOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ==============================|| DIALOG - FULL SCREEN ||============================== //

export default function FullScreenDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative', boxShadow: 'none' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseOutlined />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Set Backup Account
            </Typography>
            <Button color="primary" variant="contained" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{ p: 3 }}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar src={avatar1} />
            </ListItemAvatar>
            <ListItemText primary="Phone ringtone" secondary="Default" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemAvatar>
              <Avatar src={avatar2} />
            </ListItemAvatar>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItemButton>
        </List>
      </Dialog>
    </>
  );
}
