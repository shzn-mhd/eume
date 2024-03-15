// material-ui
import { List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import AntAvatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';

// assets
import { MoreOutlined } from '@ant-design/icons';
import avatar4 from 'assets/images/users/avatar-4.png';
import avatar5 from 'assets/images/users/avatar-5.png';

// ==============================|| LIST - USER ||============================== //

const UserList = () => {
  const userListCodeString = `<List sx={{ p: 0 }}>
  <ListItem
    divider
    secondaryAction={
      <IconButton edge="end" aria-label="delete">
        <MoreOutlined />
      </IconButton>
    }
  >
    <ListItemAvatar>
    <AntAvatar alt="Avatar" src="/src/assets/images/users/avatar-4.png" />
    </ListItemAvatar>
    <ListItemText primary="Jone Doe" secondary="Developer" />
  </ListItem>
  <ListItem
    secondaryAction={
      <IconButton edge="end" aria-label="delete">
        <MoreOutlined />
      </IconButton>
    }
  >
    <ListItemAvatar>
    <AntAvatar alt="Avatar" src="/src/assets/images/users/avatar-5.png" />
    </ListItemAvatar>
    <ListItemText primary="Aidal Danny" secondary="Project Leader" />
  </ListItem>
</List>`;

  return (
    <MainCard content={false} codeString={userListCodeString}>
      <List sx={{ p: 0 }}>
        <ListItem
          divider
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <MoreOutlined />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <AntAvatar alt="Avatar" src={avatar4} />
          </ListItemAvatar>
          <ListItemText primary="Jone Doe" secondary="Developer" />
        </ListItem>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete">
              <MoreOutlined />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <AntAvatar alt="Avatar" src={avatar5} />
          </ListItemAvatar>
          <ListItemText primary="Aidal Danny" secondary="Project Leader" />
        </ListItem>
      </List>
    </MainCard>
  );
};

export default UserList;
