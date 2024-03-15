import PropTypes from 'prop-types';
import { useState, forwardRef, useCallback } from 'react';

//material
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Typography, CardActions, IconButton, Collapse, Paper } from '@mui/material';

// third-party
import { enqueueSnackbar, useSnackbar, SnackbarContent } from 'notistack';

// project import
import MainCard from 'components/MainCard';

//assets
import { CheckCircleFilled, CloseOutlined, DownOutlined } from '@ant-design/icons';

const SnackbarBox = styled(SnackbarContent)(() => ({
  '@media (min-width:600px)': {
    minWidth: '344px !important'
  }
}));

const CustomNotistack = forwardRef(({ id, message }, ref) => {
  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((prevState) => !prevState);
  }, []);

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarBox ref={ref}>
      <Card sx={{ bgcolor: 'warning.light', width: '100%' }}>
        <CardActions sx={{ padding: '8px 8px 8px 16px', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2">{message}</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton
              aria-label="Show more"
              sx={{ p: 1, transition: 'all .2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              onClick={handleExpandClick}
            >
              <DownOutlined />
            </IconButton>
            <IconButton sx={{ p: 1, transition: 'all .2s' }} onClick={handleDismiss}>
              <CloseOutlined />
            </IconButton>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Paper sx={{ padding: 2, borderTopLeftRadius: 0, borderTopRightRadius: 0, bgcolor: 'warning.lighter' }}>
            <Typography gutterBottom>PDF ready</Typography>
            <Button
              size="small"
              startIcon={<CheckCircleFilled style={{ fontSize: 16, marginTop: -2 }} />}
              sx={{ '&:hover': { bgcolor: 'transparent' } }}
            >
              Download now
            </Button>
          </Paper>
        </Collapse>
      </Card>
    </SnackbarBox>
  );
});

CustomNotistack.propTypes = {
  id: PropTypes.number,
  message: PropTypes.string
};

// ==============================|| NOTISTACK - CUSTOM STYLE ||============================== //

export default function CustomComponent() {
  const NotistackCustomCodeString = `<Button
  variant="outlined"
  fullWidth
  sx={{ marginBlockStart: 2 }}
  onClick={() => {
   enqueueSnackbar("You're report is ready", {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      },
      content: (key, message) => <CustomNotistack id={key} message={message} />
    });
  }}
>
  Show snackbar
</Button>`;

  return (
    <MainCard title="Custom Component" codeString={NotistackCustomCodeString}>
      <Button
        variant="outlined"
        fullWidth
        sx={{ marginBlockStart: 2 }}
        onClick={() => {
          enqueueSnackbar("You're report is ready", {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right'
            },
            content: (key, message) => <CustomNotistack id={key} message={message} />
          });
        }}
      >
        Show snackbar
      </Button>
    </MainCard>
  );
}
